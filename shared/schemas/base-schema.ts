import { schemaJson } from "./schema-schema";
import { userJson } from "./user-schema";

export const baseSchemaJson = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "schema": {
      ...schemaJson
    },
    "user": {
      ...userJson
    },
  }
}