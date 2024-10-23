import { model, Schema } from 'mongoose';
import { PaymentTypeModel } from './paymentType';

const schemaType = 'Fee';
const feeSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    paymentType: PaymentTypeModel.schema,
    taxes: Schema.Types.Decimal128,
    subTotal: Schema.Types.Decimal128,
    total: Schema.Types.Decimal128,
    enterprise: { type: Schema.Types.ObjectId, ref: 'Enterprise' }
}, {
    timestamps: true
});
export const FeeModel = model(schemaType, feeSchema);