import { model, Schema } from 'mongoose';

const schemaType = 'DateTime';
const DateTimeSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    name: String
}, {
    timestamps: true
});
export const DateTimeModel = model(schemaType, DateTimeSchema);