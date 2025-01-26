import { Server, IncomingMessage, ServerResponse } from "http";
import { Server as SocketIOServer } from 'socket.io';
import { CommandController } from "./command.controller";

export class SocketController {
    static socketServer;
    static usersConmected = 0;

    static init(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
        SocketController.socketServer = new SocketIOServer(server, { cors: { origin: '*' } });
        SocketController.listen();
    }

    static async listen() {
        SocketController.socketServer.on('connection', (socket) => {
            SocketController.usersConmected++;
            console.log('A user connected amount:' + SocketController.usersConmected);

            socket.on('cmd', (cmd) => {
                CommandController.handleCommand(cmd);
            });

            socket.on('disconnect', () => {
                SocketController.usersConmected--;
                console.log('User disconnected amount:' + SocketController.usersConmected);
            });
        });
    }
}