import { model, Schema } from 'mongoose';

const schemaType = 'DeviceType';
const deviceTypeSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    name: { type: String, unique: true }
}, {
    timestamps: true
});
export const DeviceTypeModel = model(schemaType, deviceTypeSchema);