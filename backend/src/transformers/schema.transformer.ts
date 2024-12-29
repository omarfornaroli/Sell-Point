import { SchemaConstants } from "@shared/constants";
import { EntSchema } from "@shared/contracts";
import { EntHelper } from "@shared/helpers";

export class SchemaTransformer {
    static instance?: SchemaTransformer;
    constructor() { }

    static getInstance() {
        if (!this.instance) {
            this.instance = new SchemaTransformer();
        }
        return this.instance;
    }

    schemaToEntSchema(schema: Partial<EntSchema>) {
        return EntHelper.createEnt<EntSchema>(SchemaConstants.Schema,
            {
                _id: schema._id,
                properties: schema.properties,
                propertiesOptions: schema.propertiesOptions,
                required: schema.required,
            }
        )
    }
}