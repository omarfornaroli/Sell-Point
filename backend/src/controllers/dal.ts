import mongoose, { Model, Models } from 'mongoose';
import { DAL, DALModelKeys } from '../contracts/models';
import { Ent, InstanceSchemaType } from '../../../shared/contracts/ent-contracts';
import { SchemaHelper } from '../../../shared/helpers/schema-helper';

export class DALController {
    static async insert<T extends Ent>(schemaId: InstanceSchemaType, ent: T) {
        const model = DALController.getModel(schemaId);
        return (await model.create(ent)) as T;
    };

    static async getMany<T extends Ent>(schemaId: InstanceSchemaType, filter?: mongoose.FilterQuery<T>) {
        if (!schemaId) throw new Error('model is required');
        const model = DALController.getModel(schemaId);
        const paths = Object.keys(model.schema.paths);
        return (await model.find(filter ?? {}).populate(paths ?? [])) as T[]
    };

    static async getById<T extends Ent>(schemaId: InstanceSchemaType, _id: string) {
        if (!_id) throw new Error('id is required');
        const model = DALController.getModel(schemaId);
        return (await model.findById(_id)) as T
    };

    static async update<T extends Ent>(ent: T) {
        if (!ent._id) throw new Error('id is required');
        const model = DALController.getModel(ent._schema);
        await model.updateOne({ _id: ent._id }, { $set: ent });
        return ent;
    };

    static async deleteById(schemaId: InstanceSchemaType, _id: string) {
        if (!_id) throw new Error('id is required');
        const model = DALController.getModel(schemaId);
        await model.deleteOne({ _id })
    };

    private static getModel(schemaId: InstanceSchemaType) {
        const schemaAlias = SchemaHelper.getSchemaAlias_FromId(schemaId);
        const model = DAL[`${schemaAlias}Model` as DALModelKeys] as Model<any>;
        return model;
    }
}