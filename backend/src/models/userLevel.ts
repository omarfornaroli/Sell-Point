import { model, Schema } from 'mongoose';

const schemaType = 'UserLevel';
const userLevelSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    name: { type: String },
    level: { type: String }
}, {
    timestamps: true
});
export const UserLevelModel = model(schemaType, userLevelSchema);