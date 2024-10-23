import { model, Schema } from 'mongoose';

const schemaType = 'ProductCategory';
const productCategoriesSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    name: String,
    description: String,
    enterprise: { type: Schema.Types.ObjectId, ref: 'Enterprise' }
}, {
    timestamps: true
});
export const ProductCategoryModel = model(schemaType, productCategoriesSchema);