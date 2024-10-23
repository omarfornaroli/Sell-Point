import { model, Schema } from 'mongoose';

const schemaType = 'ServiceStatus';
const serviceStatusSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    name: { type: String, unique: true }
}, {
    timestamps: true
});
export const ServiceStatusModel = model(schemaType, serviceStatusSchema);