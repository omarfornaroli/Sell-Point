import { schemaSchema } from "./schema-schema";
import { userSchema } from "./user-schema";

export const baseSchemaJson = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "schema": {
      ...schemaSchema
    },
    "user": {
      ...userSchema
    },
  }
}