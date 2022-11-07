import { Condition } from "../../domain/condition";
import { Report } from "../../domain/report";
import { SignSymptom } from "../../domain/signsymptom";
import { Specie } from "../../domain/specie";
import { TreePart } from "../../enums/enums";

export interface IReportFinder {
    getReportById(id: string): Promise<Report>;
    listReports(): Promise<Report[]>;
    getAllSpecies(): Promise<Specie[]>;
    getAllConditions(): Promise<Condition[]>;
    getSignSymptomsByTreeParts(treeParts: TreePart[]): Promise<SignSymptom[]>;
}