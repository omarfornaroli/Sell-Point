import { model, Schema } from 'mongoose';

const schemaType = 'City';
const citySchema = new Schema({
    schemaType: { type: String, default: schemaType },
    ciudad: { type: String },
    municipio: { type: String },
    departamento: { type: String },
    provincia: { type: String },
    latitud: { type: Number },
    longitud: { type: Number }
}, {
    timestamps: true
});
export const CityModel = model(schemaType, citySchema);