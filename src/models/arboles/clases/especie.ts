import { ObjectId } from "bson";
import { DEFAULT_SCIENT_NAME, DEFAULT_SPECIES, DEFAULT_SPECIES_ID } from "../consts/constantes";


export class Species {
    private _id: ObjectId;
    private name: string;
    private family: string;
    private scientificName: string;

    constructor(name: string, scientificName: string, family: string ){
        if (name != DEFAULT_SPECIES){
            this.name = name;
            this.scientificName = scientificName;
            this.family = family;
        }else{
            this._id = new ObjectId(DEFAULT_SPECIES_ID);
        }    
    }

    public get_Id(): ObjectId {
        return this._id;
    }

    public getName(): string{
        return this.name;
    }

    public getFamily(): string{
        return this.family;
    }

    public getScientificName(): string{
        return this.scientificName;
    }

    public set_Id(id: ObjectId): void {
        this._id = id;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setFamily(family: string): void {
        this.family = family;
    }

    public setScientificName(sName: string): void {
        this.scientificName = sName;
    }
    
}