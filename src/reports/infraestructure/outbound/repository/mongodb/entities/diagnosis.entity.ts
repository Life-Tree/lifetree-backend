import { ObjectId } from "mongodb";

export class DiagnosisEntity {
    public conditionsIds: ObjectId[];
    public preliminary: boolean;

}