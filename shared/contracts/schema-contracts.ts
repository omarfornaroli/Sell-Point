import { JSONSchema7 } from "json-schema";
import { Ent } from "./ent-contracts";

export class EntSchema extends Ent {
    properties?: JSONSchema7;
    propertiesOptions?: EntPropertiesOptions;
    required?: string[];
}
export class EntPropertiesOptions extends Ent {
    properties!: {
        [key: string]: any;
    };
    schemaAlias?: string;
}