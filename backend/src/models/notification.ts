import { model, Schema } from 'mongoose';

const schemaType = 'Notification';
const notificationSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    message: { type: String },
    enterprise: { type: Schema.Types.ObjectId, ref: 'Enterprise' },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});
export const NotificationModel = model(schemaType, notificationSchema);