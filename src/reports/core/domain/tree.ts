import { HealthStatus } from "./healthstatus";
import { ImageSet } from "./imageset";
import { Location } from "./location";
import { Specie } from "./specie";



export class Tree {
    private id: string;
    private height: number;
    private dch: number; // diameter at chest height (cm)
    private cupDiameter: number; // cup diameter (m)
    private numForks: number; // number of forks
    private imageSet: ImageSet;
    private location: Location;
    private healthStatus: HealthStatus;
    private specie: Specie;

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }
    
    public getHeight(): number {
        return this.height;
    }

    public setHeight(height: number): void {
        this.height = height;
    }

    public getDch(): number {
        return this.dch;
    }

    public setDch(dch: number): void {
        this.dch = dch;
    }

    public getCupDiameter(): number {
        return this.cupDiameter;
    }

    public setCupDiameter(cupDiameter: number): void {
        this.cupDiameter = cupDiameter;
    }

    public getNumForks(): number {
        return this.numForks;
    }

    public setNumForks(numForks: number): void {
        this.numForks = numForks;
    }

    public getImageSet(): ImageSet {
        return this.imageSet;
    }

    public setImageSet(imageSet: ImageSet): void {
        this.imageSet = imageSet;
    }

    public getLocation(): Location {
        return this.location;
    }

    public setLocation(location: Location): void {
        this.location = location;
    }

    public getHealthStatus(): HealthStatus {
        return this.healthStatus;
    }

    public setHealthStatus(healthStatus: HealthStatus): void {
        this.healthStatus = healthStatus;
    }

    public getSpecie(): Specie {
        return this.specie;
    }

    public setSpecie(specie: Specie): void {
        this.specie = specie;
    }

}