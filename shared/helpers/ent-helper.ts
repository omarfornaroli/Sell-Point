import { generateId } from "../constants";
import { Ent, InstanceSchemaType } from "../contracts";


export class EntHelper {
    static createEnt<T extends Ent>(schema: InstanceSchemaType, ent: Partial<T>) {
        return {
            ...new Ent,
            ...ent,
            _schema: ent._schema ?? schema,
            _id: ent._id ?? generateId(),
            _c: ent._c
        }
    }
}
