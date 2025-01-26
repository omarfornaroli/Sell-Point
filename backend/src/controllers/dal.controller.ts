import { Filter, MongoClient } from "mongodb";
import { Ent } from '../../../shared/contracts/ent-contracts';
import { MongoTransformer } from '../transformers/mongo.transformer';
import mongoose from "mongoose";
import { SchemaConstants } from "../../../shared/constants";
import { EntSchema } from "../../../shared/contracts";

export class DALController {
    static mongoTransformer: MongoTransformer = MongoTransformer.getInstance();
    static dbInstance: mongoose.mongo.Db;

    static async insert<T extends Ent>(schemaId: string, ent: T): Promise<T> {
        const model = await DALController.getModel(schemaId);
        return (await model.insertOne(ent as any)) as unknown as T;
    };

    static async getMany<T extends Ent>(schemaId: string, filter: Filter<mongoose.mongo.BSON.Document> = {}): Promise<T[]> {
        if (!schemaId) throw new Error('model is required');
        const model = await DALController.getModel(schemaId);
        const data = (await model.find(filter).toArray())
        return data as unknown as T[]
    };

    static async getById<T extends Ent>(schemaId: string, _id: any): Promise<T> {
        if (!_id) throw new Error('id is required');
        const model = await DALController.getModel(schemaId);
        return (await model.findOne({ _id })) as unknown as T
    };

    static async get<T extends Ent>(schemaId: string, params: any): Promise<T> {
        if (!params) throw new Error('filter params is required');
        const model = await DALController.getModel(schemaId);
        return (await model.findOne(params)) as unknown as T
    };

    static async getAllEnts<T extends Ent>(): Promise<T[]> {
        const collections = await DALController.dbInstance.collections();
        return (await Promise.all(collections.map(async collection => (await collection.find().toArray()) as unknown as T[]))).flat();
    };

    static async update<T extends Ent>(schemaId: string, ent: T): Promise<T> {
        if (!ent._id) throw new Error('id is required');
        const model = await DALController.getModel(schemaId);
        await model.updateOne({ _id: ent._id as any }, { $set: ent });
        return ent;
    };

    static async deleteById(schemaId: string, _id: any): Promise<void> {
        if (!_id) throw new Error('id is required');
        const model = await DALController.getModel(schemaId);
        await model.deleteOne({ _id })
    };

    private static async getModel(schemaId: string) {
        let model;
        if (schemaId !== SchemaConstants.Schema) {
            model = DALController.dbInstance.collection("schema")
            const schemaEnt = await model.findOne({ _id: schemaId as any }) as unknown as EntSchema
            if (!schemaEnt) throw new Error('schema not found');
            if (!schemaEnt.propertiesOptions?.schemaAlias) throw new Error('schemaAlias not found in schema id: ' + schemaId);
            model = DALController.dbInstance.collection(schemaEnt.propertiesOptions?.schemaAlias);
            return model;
        }
        model = DALController.dbInstance.collection("schema");
        return model;
    }
}