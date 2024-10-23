import {
    createRxDatabase,
    addRxPlugin,
    RxDatabase,
    RxCollection,
    RxDocument
} from 'rxdb';
import { getRxStoragePouch } from 'rxdb/plugins/pouchdb';
import * as idb from 'pouchdb-adapter-idb';

addRxPlugin(idb);

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

export const getDatabase = async (): Promise<MyDatabase> => {
    if (!dbPromise) {
        dbPromise = createRxDatabase<MyDatabaseCollections>({
            name: 'todoDatabase',
            storage: getRxStoragePouch('idb'),
        }).then(async (db) => {
            await db.addCollections({
                todos: {
                    schema: {
                        version: 0,
                        primaryKey: 'id',
                        type: 'object',
                        properties: {
                            id: {
                                type: 'string',
                                maxLength: 100,
                            },
                            title: {
                                type: 'string',
                            },
                            description: {
                                type: 'string',
                            },
                        },
                        required: ['title'],
                    },
                },
            });
            return db;
        });
    }
    return dbPromise;
};
