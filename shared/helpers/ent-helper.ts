import { generateId } from "../constants";
import { Ent } from "../contracts";


export class EntHelper {
    static createEnt<T extends Ent>(ent: Partial<T>) {
        return {
            ...new Ent,
            ...ent,
            _id: ent._id ?? generateId(),
            _c: ent._c
        }
    }
}
