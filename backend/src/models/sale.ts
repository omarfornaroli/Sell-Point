import { model, Decimal128, Schema } from 'mongoose';
import { PaymentTypeModel } from './paymentType';
import { CartItemSaleModel } from './cartItemSale';

const schemaType = 'Sale';
const saleSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    cart: [CartItemSaleModel.schema],
    paymentType: PaymentTypeModel.schema,
    hasTax: Boolean,
    taxes: Decimal128,
    subTotal: Decimal128,
    total: Decimal128,
    enterprise: { type: Schema.Types.ObjectId, ref: 'Enterprise' }
}, {
    timestamps: true
});
export const SaleModel = model(schemaType, saleSchema);