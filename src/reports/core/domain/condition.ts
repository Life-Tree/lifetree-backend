import { SignSymptom } from "./signsymptom";

export class Condition {
    private id?: string;
    private commonName: string;
    private scientificName: string;
    private family: string;
    private causativeAgent: string;
    private description: string;
    private signSymptoms: SignSymptom[];

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getScientificName(): string {
        return this.scientificName;
    }

    public setScientificName(scientificName: string): void {
        this.scientificName = scientificName;
    }

    public getFamily(): string {
        return this.family;
    }

    public setFamily(family: string): void {
        this.family = family;
    }

    public getCausativeAgent(): string {
        return this.causativeAgent;
    }

    public setCausativeAgent(causativeAgent: string): void {
        this.causativeAgent = causativeAgent;
    }

    public getCommonName(): string {
        return this.commonName;
    }

    public setCommonName(commonName: string): void {
        this.commonName = commonName;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getSignSymptoms(): SignSymptom[] {
        return this.signSymptoms;
    }

    public setSignSymptoms(signSymptoms: SignSymptom[]): void {
        this.signSymptoms = signSymptoms;
    }

    public addSignSymptom(signSymptom: SignSymptom): void {
        this.signSymptoms.push(signSymptom);
    }

}