import { model, Schema } from 'mongoose';

const schemaType = 'Client';
const clientSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    image: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    phone: { type: String },
    gender: { type: String },
    email: { type: String },
    documentId: { type: Number },
    enterprise: { type: Schema.Types.ObjectId, ref: 'Enterprise' }
}, {
    timestamps: true
});
export const ClientModel = model(schemaType, clientSchema);