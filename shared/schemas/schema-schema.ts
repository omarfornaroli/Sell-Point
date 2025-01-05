import { SchemaConstants } from "../constants";
import { EntSchema } from "../contracts";

export const schemaSchema: any = {
    "_id": SchemaConstants.Schema,
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Schema",
    "type": "object",
    "properties": {
        "type": 'object',
        "properties": {
            "type": "object",
            "patternProperties": {
                "^[a-zA-Z_$][a-zA-Z_$0-9]*$": {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "enum": [
                                "string",
                                "number",
                                "boolean",
                                "array",
                                "object",
                                "null"
                            ]
                        },
                        "items": {
                            "$ref": "#/definitions/schema"
                        },
                        "properties": {
                            "$ref": "#/definitions/properties"
                        },
                        "required": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "type"
                    ],
                    "additionalProperties": false
                }
            },
            "additionalProperties": false
        },
        "required": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "uniqueItems": true
        }
    },
    "propertiesOptions": {
        "schemaAlias": "schema"
    },
    "required": [
        "type",
        "properties"
    ],
    "definitions": {
        "schema": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "string",
                        "number",
                        "boolean",
                        "array",
                        "object",
                        "null"
                    ]
                },
                "properties": {
                    "$ref": "#/definitions/properties"
                },
                "items": {
                    "$ref": "#/definitions/schema"
                }
            },
            "additionalProperties": false
        },
        "properties": {
            "type": "object",
            "patternProperties": {
                "^[a-zA-Z_$][a-zA-Z_$0-9]*$": {
                    "$ref": "#/definitions/schema"
                }
            },
            "additionalProperties": false
        }
    },
    "additionalProperties": false
}