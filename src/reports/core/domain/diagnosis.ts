import { Condition } from "./condition";


export class Diagnosis {
    private conditions: Condition[];
    private preliminary: boolean;

    constructor(conditions: Condition[], isPreliminary: boolean) {
        this.conditions=conditions;
        this.preliminary=isPreliminary;
    }

    public getConditions(): Condition[] {
        return this.conditions;
    }

    public setConditions(conditions: Condition[]): void {
        this.conditions = conditions;
    }

    public isPreliminary(): boolean {
        return this.preliminary;
    }

    public setIsPreliminary(preliminary: boolean): void {
        this.preliminary = preliminary;
    }

}