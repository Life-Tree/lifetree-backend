import { ObjectId } from "mongodb";

export class ConditionEntity {
    public _id?: ObjectId;
    public commonName: string;
    public scientificName: string;
    public family: string;
    public causativeAgent: string;
    public description: string;
    public signSymptoms: ObjectId[];

}