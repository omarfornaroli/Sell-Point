import {
    createRxDatabase,
    addRxPlugin,
    RxDatabase,
    RxCollection,
    RxDocument
} from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import { schemasSP } from '../../../../shared/schemas/schemas';
import { entSchemaData } from '../../../../shared/schemas/ent-schema';
import { SchemaHelper } from '@shared/helpers';

// import * as idb from 'pouchdb-adapter-idb';

// addRxPlugin(idb);

export interface Todo {
    id?: string;
    title: string;
    description?: string;
}

export interface TodoDocument extends RxDocument<Todo> { }

export interface TodoCollection extends RxCollection<TodoDocument> { }

export interface MyDatabaseCollections {
    todos: TodoCollection;
}

export type MyDatabase = RxDatabase<MyDatabaseCollections>;

let dbPromise: Promise<MyDatabase> | null = null;

function getSchemas() {
    let schemas = {}
    schemasSP.map((schema) => {
        const schemaAlias = SchemaHelper.getSchemaAlias_FromId(schema._id);
        schemas = {
            ...schemas,
            [schemaAlias]: {
                schema: { ...schema, primaryKey: '_id', properties: { ...schema.properties, ...entSchemaData.properties } },
            }
        }
    })
    return schemas;

}




export const getDatabase = async (): Promise<MyDatabase> => {
    if (!dbPromise) {
        dbPromise = createRxDatabase<MyDatabaseCollections>({
            name: 'todoDatabase',
            storage: getRxStorageDexie(),
        }).then(async (db: RxDatabase<MyDatabaseCollections, any, any>) => {
            await db.addCollections(
                getSchemas()
            );
            return db;
        });
    }
    return dbPromise;
};
