import { model, Schema } from 'mongoose';

const schemaType = 'Enterprise';
const enterpriseSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    name: String,
    fantasy: String,
    CUIT: String,
    address: String,
    phone: String,
    city: String,
    province: String,
    country: String,
    menu: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }]
}, {
    timestamps: true
});
export const EnterpriseModel = model(schemaType, enterpriseSchema);