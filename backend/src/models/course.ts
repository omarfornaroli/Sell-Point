import { model, Schema } from 'mongoose';

const schemaType = 'Course';
const coursesSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    name: String,
    description: String,
    image: String,
    teacher: { type: Schema.Types.ObjectId, ref: 'Employee' },
    students: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
    enterprise: { type: Schema.Types.ObjectId, ref: 'Enterprise' }
}, {
    timestamps: true
});
export const CourseModel = model(schemaType, coursesSchema);