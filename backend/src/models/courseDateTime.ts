import { model, Schema } from 'mongoose';

const schemaType = 'CourseDateTime';
const CourseDateTimeSchema = new Schema({
    schemaType: { type: String, default: schemaType },
    day: { type: Schema.Types.ObjectId, ref: 'DateTime' },
    startTime: Date,
    endTime: Date,
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    enterprise: { type: Schema.Types.ObjectId, ref: 'Enterprise' }
}, {
    timestamps: true
});
export const CourseDateTimeModel = model(schemaType, CourseDateTimeSchema);