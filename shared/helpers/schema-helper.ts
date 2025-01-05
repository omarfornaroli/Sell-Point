import { ID_PREFIX } from "../constants";
import { _IdType } from "../contracts";


export class SchemaHelper {
    static getSchemaAlias_FromId(schemaID: _IdType) {
        return schemaID.split(':').at(-1);
    }
    static getSchemaId_FromAlias(schemaAlias: _IdType) {
        return `${ID_PREFIX}:${schemaAlias}`;
    }
}