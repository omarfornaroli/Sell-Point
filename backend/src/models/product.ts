import { model, Decimal128, Schema } from 'mongoose';

const schemaType = 'Product';
const productSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    name: String,
    barCode: String,
    description: String,
    category: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },
    price: Decimal128,
    quantity: Number,
    taxes: Decimal128,
    enterprise: { type: Schema.Types.ObjectId, ref: 'Enterprise' }
}, {
    timestamps: true
});
export const ProductModel = model(schemaType, productSchema);