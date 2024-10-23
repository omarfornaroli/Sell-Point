import { model, Schema } from 'mongoose';

const schemaType = 'Device';
const deviceSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    mark: String,
    model: String,
    serial: String,
    type: { type: Schema.Types.ObjectId, ref: 'DeviceType' },
    hasSO: Boolean,
    operativeSystem: String,
    comments: String,
    enterprise: String
}, {
    timestamps: true
});
export const DeviceModel = model(schemaType, deviceSchema);