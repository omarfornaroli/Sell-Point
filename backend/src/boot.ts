import { Server, IncomingMessage, ServerResponse } from "http";
import { DALController } from "./controllers/dal.controller";
import { SchemaConstants, IdConstants } from "../../shared/constants";
import { EntSchema, UserEnt } from "../../shared/contracts";
import { EntHelper } from "../../shared/helpers";
import { ChangeStreamDocument, MongoClient } from "mongodb";
import { schemasSP } from "../../shared/schemas";
import { SocketController } from "./controllers/socket.controller";

export class BootHelper {
    static async init(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
        await BootHelper.initDB();
        BootHelper.initServer(server);
        BootHelper.initSocketIO(server);
        BootHelper.listenDBChanges();
    }

    static initSocketIO(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
        SocketController.init(server);
    }

    static async connectDB() {
        const client = new MongoClient(process.env.SP_MONGODB_URL as string);
        const connection = await client.connect();
        DALController.dbInstance = connection.db('Cluster0');
        console.log('MongoDB conectado');
    }

    static initServer(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
        server.listen(process.env.SP_PORT, () => {
            console.log(`Express puerto ${process.env.SP_PORT}`);
        });
    }

    static async initDB() {
        await BootHelper.connectDB();
        await BootHelper.upsertSchemas();
        await BootHelper.createAdminUser();
    }

    static async upsertSchemas() {
        try {
            const schemas = await DALController.getMany(SchemaConstants.Schema);
            if (schemas.length === 0) {
                return BootHelper.initSchemas();
            }
        } catch (error) {
            return BootHelper.initSchemas();
        }
    }

    private static initSchemas() {
        schemasSP.map(async (s) => await DALController.insert(SchemaConstants.Schema, EntHelper.createEnt<EntSchema>(SchemaConstants.Schema, s)));
        console.log('Schemas upserted');
    }

    static async createAdminUser() {
        const adminUser = await DALController.getById(SchemaConstants.User, IdConstants.adminUser);
        console.log('Admin user already exists');
        if (adminUser) return;

        console.log('Creating admin user');
        const userEnt = {
            _id: IdConstants.adminUser,
            _schema: SchemaConstants.User,
            name: 'Admin',
            email: 'admin@admin.com',
            password: '30febb226794a2bd191cb961d3c8a355',
        } as Partial<UserEnt>
        DALController.insert(SchemaConstants.User, EntHelper.createEnt<UserEnt>(SchemaConstants.User, userEnt))
    }

    static listenDBChanges() {
        try {
            DALController.dbInstance.watch([], { fullDocument: 'updateLookup' }).on('change', async (change: ChangeStreamDocument<any> | any) => {
                if (change.ns) {
                    SocketController.socketServer.emit('db change', change);
                }
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }
}