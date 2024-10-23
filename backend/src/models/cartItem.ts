import { model, Schema } from 'mongoose';

const schemaType = 'CartItem';
const cartItemSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number },
    enterprise: { type: Schema.Types.ObjectId, ref: 'Enterprise' }
}, {
    timestamps: true
});
export const CartItemModel = model(schemaType, cartItemSchema);