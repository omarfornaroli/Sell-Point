import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { getDatabase, Todo, TodoDocument, MyDatabase } from './db-config';
import { Ent } from '@shared/contracts';
import { SchemaHelper } from '@shared/helpers';
@Injectable({
    providedIn: 'root',
})
export class DalService {
    private db: MyDatabase;

    async initDB() {
        this.db = await getDatabase();
    }

    async insert(ent: Ent): Promise<Ent> {
        return await this.db[ent._schema].insert(ent);
    }

    async insertMany(ents: Ent[]): Promise<Ent[]> {
        const schema = SchemaHelper.getSchemaAlias_FromId(ents[0]._schema);
        return await this.db[schema].bulkInsert(ents);
    }

    async findBySchema(schema: string): Promise<Ent[]> {
        const docs = await (this.db[schema]).find().exec();
        return docs.map(doc => doc.toJSON())
    }

    async findById(schema: string, id: string): Promise<Ent> {
        return await this.db[schema].findOne(id).exec();
    }

    //   updateTodo(
    //     id: string,
    //     updateData: Partial<Todo>
    //   ): Observable<TodoDocument> {
    //     return from(
    //       this.db.todos
    //         .findOne(id)
    //         .exec()
    //         .then((doc) => doc.update({ $set: updateData }))
    //     );
    //   }

    //   deleteTodo(id: string): Observable<void> {
    //     return from(
    //       this.db.todos
    //         .findOne(id)
    //         .exec()
    //         .then((doc) => doc.remove())
    //     );
    //   }
}
