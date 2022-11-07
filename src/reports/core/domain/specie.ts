import { ConservationStatusEnum, FrecuentLocationEnum, MorfologicalClasificationEnum, OriginEnum } from "../enums/enums";

export class Specie {
    private id: string;
    private name: string;
    private family: string;
    private scientificName: string;
    private commonName: string;
    private genre: string;
    private conservationStatus: ConservationStatusEnum;
    private morphologicalClassification: MorfologicalClasificationEnum;
    private origin: OriginEnum;
    private frecuentLocation: FrecuentLocationEnum;

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getCommonName(): string {
        return this.commonName;
    }

    public setCommonName(commonName: string): void {
        this.commonName = commonName;
    }

    public getGenre(): string {
        return this.genre;
    }

    public setGenre(genre: string): void {
        this.genre = genre;
    }

    public getConservationStatus(): ConservationStatusEnum {
        return this.conservationStatus;
    }

    public setConservationStatus(conservationStatus: ConservationStatusEnum): void {
        this.conservationStatus = conservationStatus;
    }

    public getMorphologicalClassification(): MorfologicalClasificationEnum {
        return this.morphologicalClassification;
    }

    public setMorphologicalClassification(morphologicalClassification: MorfologicalClasificationEnum): void {
        this.morphologicalClassification = morphologicalClassification;
    }

    public getOrigin(): OriginEnum {
        return this.origin;
    }

    public setOrigin(origin: OriginEnum): void {
        this.origin = origin;
    }

    public getFrecuentLocation(): FrecuentLocationEnum {
        return this.frecuentLocation;
    }

    public setFrecuentLocation(frecuentLocation: FrecuentLocationEnum): void {
        this.frecuentLocation = frecuentLocation;
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