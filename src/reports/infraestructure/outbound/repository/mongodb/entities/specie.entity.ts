import { ObjectId } from "mongodb";

export class SpecieEntity {
    public _id?: ObjectId
    public family: string;
    public scientificName: string;
    public commonName: string;
    public genre: string;
    public conservationStatus: number;
    public morphologicalClassification: number;
    public origin: number;
    public frecuentLocation: number;
}