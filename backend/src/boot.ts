import { Server, IncomingMessage, ServerResponse } from "http";
import mongoose from "mongoose";
import { DALController } from "./controllers/dal";
import { SchemaConstants, IdConstants } from "../../shared/constants";
import { UserEnt } from "../../shared/contracts";
import { EntHelper } from "../../shared/helpers";




export class BootHelper {
    static async init(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
        await BootHelper.connectDB(server);
        await BootHelper.initDB();
    }

    static async connectDB(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
        mongoose.connect(process.env.MONGODB_URL as string).then((mongodb) => {
            if (mongodb) {
                console.log('MongoDB conectado');
                BootHelper.initServer(server);
            }
        })
    }

    static initServer(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
        server.listen(process.env.PORT, () => {
            console.log(`Express puerto ${process.env.PORT}`);
        });
    }

    static async initDB() {
        await BootHelper.createAdminUser();
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
        DALController.insert(SchemaConstants.User, EntHelper.createEnt<UserEnt>(userEnt))
    }
}