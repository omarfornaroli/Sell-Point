import { ID_PREFIX } from "../constants";
import { InstanceSchemaType } from "../contracts";


export class SchemaHelper {
    static getSchemaAlias_FromId(schemaID: InstanceSchemaType) {
        return schemaID.split(':').at(-1);
    }
    static getSchemaId_FromAlias(schemaAlias: InstanceSchemaType) {
        return `${ID_PREFIX}:${schemaAlias}`;
    }
}