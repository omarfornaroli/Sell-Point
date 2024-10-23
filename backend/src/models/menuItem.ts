import mongoose, { model, Schema } from 'mongoose';

const schemaType = 'MenuItem';
const MenuItemSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    enterprises: [{ type: mongoose.ObjectId, ref: 'Enterprise' }],
    name: { type: String },
    parentMenu: { type: mongoose.ObjectId, ref: 'MenuItem' } | undefined,
    url: { type: String },
    icon: { type: String },
    userLevel: { type: mongoose.ObjectId, ref: 'UserLevel' },
    submenu: [{ type: mongoose.ObjectId, ref: 'MenuItem' }],
    menuOrder: Number
}, {
    timestamps: true
});
export const MenuItemModel = model(schemaType, MenuItemSchema);