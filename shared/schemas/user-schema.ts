import { SchemaConstants } from "../constants";

export const userJson = {
    "_id": SchemaConstants.User,
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "User",
    "type": "object",
    "properties": {
        "allOf": [
            {
                "$ref": "#/definitions/schema",
                "name": {
                    "type": "string",
                    "minLength": 3,
                    "maxLength": 30,
                    "pattern": "^[a-zA-Z0-9_]+$"
                },
                "email": {
                    "type": "string",
                    "format": "email"
                },
                "birthday": {
                    "type": "string",
                    "format": "date"
                },
                "address": {
                    "type": "object",
                    "properties": {
                        "street": {
                            "type": "string"
                        },
                        "city": {
                            "type": "string"
                        },
                        "zipCode": {
                            "type": "string",
                            "pattern": "^[0-9]{5}$"
                        }
                    },
                    "required": [
                        "street",
                        "city"
                    ],
                    "additionalProperties": false
                },
                "tags": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "uniqueItems": true
                }
            }
        ],
    },
    "propertiesOptions": {
        "schemaAlias": "user"
    },
    "required": [
        "username",
        "email",
        "age"
    ],
    "additionalProperties": false
}