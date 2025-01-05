import { SchemaConstants } from "../constants";

export const entSchemaData = {
    "_id": SchemaConstants.User,
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Ent",
    "type": "object",
    "properties": {
        "_id": {
            "type": "string",
            "description": "Unique identifier for the entity"
        },
        "_label": {
            "type": "string",
            "description": "Label for the entity"
        },
        "_schema": {
            "type": "string",
            "description": "Identifier for the schema associated with the entity"
        },
        "_c": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of creation, defaults to current date-time"
        }
    },
    "required": ["_id", "_label", "_schema"],
    "additionalProperties": false
}