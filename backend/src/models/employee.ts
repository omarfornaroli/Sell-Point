import { model, Schema } from 'mongoose';

const schemaType = 'Employee';
const employeeSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    firstName: String,
    lastName: String,
    address: String,
    phone: String,
    documentId: { type: Number, unique: true },
    enterprise: { type: Schema.Types.ObjectId, ref: 'Enterprise' }
}, {
    timestamps: true
});
export const EmployeeModel = model(schemaType, employeeSchema);