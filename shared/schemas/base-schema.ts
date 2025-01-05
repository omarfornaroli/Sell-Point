import { schemaSchemaData } from "./schema-schema";
import { userSchemaData } from "./user-schema";

export const baseSchemaJson = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "schema": {
      ...schemaSchemaData
    },
    "user": {
      ...userSchemaData
    },
  }
}