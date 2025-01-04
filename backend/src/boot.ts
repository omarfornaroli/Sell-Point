import { Server, IncomingMessage, ServerResponse } from "http";
import mongoose from "mongoose";
import { DALController } from "./controllers/dal.controller";
import { SchemaConstants, IdConstants } from "../../shared/constants";
import { EntSchema, UserEnt } from "../../shared/contracts";
import { EntHelper } from "../../shared/helpers";
import { schemas } from "../../shared/schemas";
import { MongoClient } from "mongodb";

export class BootHelper {
    static async init(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
        await BootHelper.connectDB(server);
        BootHelper.initServer(server);

    }

    static async connectDB(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
        const client = new MongoClient(process.env.SP_MONGODB_URL as string);
        const connection = await client.connect();
        DALController.dbInstance = connection.db('Cluster0');
        console.log('MongoDB conectado');
        await BootHelper.initDB();
    }

    static initServer(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
        server.listen(process.env.SP_PORT, () => {
            console.log(`Express puerto ${process.env.SP_PORT}`);
        });
    }

    static async initDB() {
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
        schemas.map(async (s) => await DALController.insert(SchemaConstants.Schema, EntHelper.createEnt<EntSchema>(SchemaConstants.Schema, s)));
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
            email: 'admin@pistacho.com',
            password: 'af446ee9a14f194b95e8b014184c23ce',
        } as Partial<UserEnt>
        DALController.insert(SchemaConstants.User, EntHelper.createEnt<UserEnt>(SchemaConstants.User, userEnt))
    }
}