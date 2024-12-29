import { Ent } from "./ent-contracts";

export class LoginEnt {
    email!: string;
    password!: string;
    rememberme: boolean = false;
    sessionTime?: number;
}