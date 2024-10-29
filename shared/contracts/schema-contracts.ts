import { JSONSchema7Definition } from "json-schema";
import { Ent } from "./ent-contracts";

export class EntSchema extends Ent {
    properties!: {
        [key: string]: JSONSchema7Definition;
    };
    required?: string[];
}