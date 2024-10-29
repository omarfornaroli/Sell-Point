
export type DateTimeStamp = string;
type CompanyPrefixType = `urn:pistacho:`;

export type _IdType = `${CompanyPrefixType}id:${string}`;
export type InstanceSchemaType = `${CompanyPrefixType}schema:${string}`;
export class Ent {
    _id!: _IdType;
    _schema!: InstanceSchemaType;
    _c: DateTimeStamp = new Date().toISOString();
}