import { model, Decimal128, Schema } from 'mongoose';

const schemaType = 'Service';
const serviceSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: [true, 'y el cliente?'] },
    device: { type: Schema.Types.ObjectId, ref: 'Device', required: [true, 'y el dispositivo?'] },
    task: { type: String, required: [true, 'no se hizo nada?'] },
    employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: [true, 'nadie lo hizo?'] },
    status: { type: Schema.Types.ObjectId, ref: 'ServiceStatus' },
    price: Decimal128
}, {
    timestamps: true
});
export const ServiceModel = model(schemaType, serviceSchema);