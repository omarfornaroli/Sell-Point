import { SchemaConstants } from "../constants";

export const loginJson = {
    "_id": SchemaConstants.Login,
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "email": {
            "type": "string",
            "format": "email",
            "minLength": 5,
            "maxLength": 255,
            "description": "Email should contain both letters and numbers and be at least 6 characters long."
        },
        "password": {
            "type": "string",
            "minLength": 4,
            "description": "Password should be at least 4 characters long."
        },
        "rememberme": {
            "type": "boolean",
            "default": false,
            "description": "Remember me option"
        },
        "sessionTime": {
            "type": "integer",
            "defualt": 2592000, // 30 days
        }
    },
    "required": ["email", "password"]
}
