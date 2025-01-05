import { SchemaConstants } from "../constants";

export const productSchemaData = {
    "_id": SchemaConstants.Product,
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "ProductGroup": {
            "type": "string"
        },
        "SKU": {
            "type": "integer"
        },
        "Barcode": {
            "type": "string",
            "pattern": "^[0-9]+$"
        },
        "MeasurementUnit": {
            "type": "string"
        },
        "Cost": {
            "type": "number"
        },
        "Markup": {
            "type": "number"
        },
        "Price": {
            "type": "number"
        },
        "Tax": {
            "type": ["number", "null"]
        },
        "IsTaxInclusivePrice": {
            "type": "integer",
            "enum": [0, 1]
        },
        "IsPriceChangeAllowed": {
            "type": "integer",
            "enum": [0, 1]
        },
        "IsUsingDefaultQuantity": {
            "type": "integer",
            "enum": [0, 1]
        },
        "IsService": {
            "type": "integer",
            "enum": [0, 1]
        },
        "IsEnabled": {
            "type": "integer",
            "enum": [0, 1]
        },
        "Description": {
            "type": ["string", "null"]
        },
        "Quantity": {
            "type": "integer"
        },
        "Supplier": {
            "type": ["string", "null"]
        },
        "ReorderPoint": {
            "type": ["integer", "null"]
        },
        "PreferredQuantity": {
            "type": ["integer", "null"]
        },
        "LowStockWarning": {
            "type": ["integer", "null"]
        },
        "WarningQuantity": {
            "type": ["integer", "null"]
        }
    },
    "required": [
        "Name",
        "ProductGroup",
        "SKU",
        "Barcode",
        "MeasurementUnit",
        "Cost",
        "Markup",
        "Price",
        "IsTaxInclusivePrice",
        "IsPriceChangeAllowed",
        "IsUsingDefaultQuantity",
        "IsService",
        "IsEnabled",
        "Quantity"
    ]
}