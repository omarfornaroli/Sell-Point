
export type DateTimeStamp = string;

export type _IdType = string;
export class Ent {
    _id!: _IdType;
    _label!: string;
    _schema!: _IdType;
    _c: DateTimeStamp = new Date().toISOString();
}