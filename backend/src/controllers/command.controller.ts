import { Command, CommandType } from "../../../shared/contracts/command-contracts";
import { SocketController } from "./socket.controller";
import { DALController } from "./dal.controller";

export class CommandController {
    static async handleCommand(cmd: Command) {
        switch (cmd.type) {
            case CommandType.Save:
                break;
            case CommandType.Delete:
                break;
            case CommandType.Update:
                break;
            case CommandType.Query:
                CommandController.handleQuery(cmd);
                break;
            default:
                throw new Error('Command type not found');
        }
    }

    static async handleQuery(cmd: Command) {
        switch (cmd.type) {
            case CommandType.Query:
                this.handleQueryCommand();
                break;
            default:
                throw new Error('Command type not found');
        }
    }

    private static async handleQueryCommand() {
        const ents = await DALController.getAllEnts();
        SocketController.socketServer.emit('ents', ents);
    }
}