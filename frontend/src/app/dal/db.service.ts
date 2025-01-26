import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { getDatabase, Todo, TodoDocument, MyDatabase } from './db-config';
import { Ent } from '@shared/contracts';
import { SchemaHelper } from '@shared/helpers';
import { RxDocument } from 'rxdb';
@Injectable({
    providedIn: 'root',
})
export class DalService {
    private db: MyDatabase;

    async initDB() {
        this.db = await getDatabase();
    }

    async insert(ent: Ent): Promise<Ent> {
        return await this.db.collections[ent._schema].insert(ent);
    }

    async insertMany(ents: Ent[]): Promise<Ent[]> {
        const schemaAlias = SchemaHelper.getSchemaAlias_FromId(ents[0]._schema);
        return await this.db.collections[schemaAlias].bulkInsert(ents);
    }

    async findBySchema(schema: string): Promise<Ent[]> {
        const schemaAlias = SchemaHelper.getSchemaAlias_FromId(schema);
        const docs = await this.db.collections[schemaAlias].find().exec();
        return docs.map(doc => doc.toJSON())
    }

    async findById(schema: string, id: string): Promise<Ent> {
        const schemaAlias = SchemaHelper.getSchemaAlias_FromId(schema);
        return await this.db.collections[schemaAlias].findOne(id).exec();
    }

    async findAllEnts(): Promise<Ent[]> {
        const collections = this.db.collections;
        const promises = Object.values(collections).map(async collection => {
            return (await collection.find().exec()).map((doc: RxDocument) => doc.toJSON()) as Ent[];
        });
        return (await Promise.all(promises)).flat();
    }

    listenDbChanges$() {
        return this.db.$.pipe(map((change) => {
            console.log('Change detected:', change);
        }));
    }
}
