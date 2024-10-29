import mongoose from "mongoose";
import { JSONSchema7 } from "json-schema";

const convertJsonSchemaToMongooseSchema = (jsonSchema: JSONSchema7) => {
    const mongooseSchema = {} as mongoose.SchemaDefinition;

    Object.keys(jsonSchema?.properties ?? {}).forEach((key) => {
        if (!jsonSchema || !jsonSchema.properties) return;
        const property = jsonSchema.properties[key] as JSONSchema7;
        const mongooseField = { ...property } as mongoose.SchemaDefinition;

        // Mapear tipos de JSON Schema a tipos de Mongoose
        switch (property.type) {
            case 'string':
                mongooseField.type = String;
                break;
            case 'number':
                mongooseField.type = Number;
                break;
            case 'boolean':
                mongooseField.type = Boolean;
                break;
            case 'array':
                mongooseField.type = [convertJsonSchemaToMongooseSchema({ properties: (property as any).items })];
                break;
            case 'object':
                //TODO: this is not correct
                // mongooseField.type = convertJsonSchemaToMongooseSchema(property as JSONSchema7);
                break;
            case 'integer':
                mongooseField.type = Number;
                break;
            default:
                throw new Error(`Tipo de JSON Schema no soportado: ${property.type}`);
        }

        if (property.required) mongooseField['required'] = property.required;
        if (property.default) mongooseField['default'] = property.default as any;

        mongooseSchema[key] = mongooseField;
    });

    return new mongoose.Schema(mongooseSchema);
};
