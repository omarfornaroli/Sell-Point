import { Ent } from "./ent-contracts";

export type DateTimeStamp = string;

export enum CommandType {
    Query = 'query',
    Save = 'save',
    Delete = 'delete',
    Update = 'update',
}
export class Command extends Ent {
    type: CommandType;
    ents?: Ent[];
}