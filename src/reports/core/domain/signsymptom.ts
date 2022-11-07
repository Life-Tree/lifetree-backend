import { TreePart } from "../enums/enums";

export class SignSymptom {
    private id: string;
    private name: string;
    private affectedTreeParts: TreePart[];
    private description: string;

    constructor(part:TreePart[], desc:string) {
        this.affectedTreeParts=part;
        this.description=desc;
    }
    
    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
    
    public getAffectedTreeParts(): number[] {
        return this.affectedTreeParts;
    }

    public setAffectedTreeParts(affectedTreeParts: TreePart[]): void {
        this.affectedTreeParts = affectedTreeParts;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

}