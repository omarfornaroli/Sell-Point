import { model, Schema } from 'mongoose';

const schemaType = 'PaymentType';
const paymentTypeSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    name: String
}, {
    timestamps: true
});
export const PaymentTypeModel = model(schemaType, paymentTypeSchema);