import { Ent } from "./ent-contracts";

export class Product extends Ent {
    productGroup!: string;
    sKU!: number;
    barcode!: string;
    measurementUnit!: string;
    cost!: number;
    markup!: number;
    price!: number;
    proveedor!: string;
    tax?: number;
    isTaxInclusivePrice!: number;
    isPriceChangeAllowed!: number;
    isUsingDefaultQuantity!: number;
    isService!: number;
    isEnabled!: number;
    description?: string;
    quantity!: number;
    supplier?: string;
    reorderPoint?: number;
    preferredQuantity?: number;
    lowStockWarning?: number;
    warningQuantity?: number;
}