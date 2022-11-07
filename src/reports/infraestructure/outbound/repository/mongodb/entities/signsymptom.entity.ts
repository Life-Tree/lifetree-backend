import { ObjectId } from "mongodb";

export class SignSymptomEntity {
    public _id?: ObjectId;
    public name: string;
    public affectedTreeParts: number[];
    public description: string;

}