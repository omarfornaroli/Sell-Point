import { model, Schema } from 'mongoose';

const schemaType = 'User';
const userSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    image: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    phone: { type: String },
    gender: { type: String },
    email: { type: String },
    documentId: { type: Number, unique: true },
    password: { type: String },
    token: { type: String },
    enterprise: { type: Schema.Types.ObjectId, ref: 'Enterprise' },
    userLevel: { type: Schema.Types.ObjectId, ref: 'UserLevel' }
}, {
    timestamps: true
});
export const UserModel = model(schemaType, userSchema);