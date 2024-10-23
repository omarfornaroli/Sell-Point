import { model, Schema } from 'mongoose';
import { ProductModel } from './product';

const schemaType = 'CartItemSale';

const cartItemSaleSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    product: ProductModel.schema,
    quantity: { type: Number },
    enterprise: { type: Schema.Types.ObjectId, ref: 'Enterprise' }
}, {
    timestamps: true
});
export const CartItemSaleModel = model(schemaType, cartItemSaleSchema);