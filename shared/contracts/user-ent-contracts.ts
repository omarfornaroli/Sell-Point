import { Ent } from "./ent-contracts";

export class UserEnt extends Ent {
    firstName!: string;
    lastName!: string;
    documentId!: string;
    email!: string;
    password!: string;
}