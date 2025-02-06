import { SchemaConstants } from "../constants";

export const uiFormSchemaData = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "_id": SchemaConstants.UIFormSchemaID,
    "_schema": "urn:pistacho:schema:schema",
    "type": "object",
    "properties": {
        "type": 'array',
        "items": {
            "type": 'object',
            "properties": {
                "type": 'string',
                "title": 'string',
                "description": 'string',
                "format": 'string',
                "enum": 'array',
                "default": 'string',
                "required": 'boolean'
            },
        }
    },
}