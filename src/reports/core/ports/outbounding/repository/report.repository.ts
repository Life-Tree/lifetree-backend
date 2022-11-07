import { Condition } from "../../../domain/condition";
import { Report } from "../../../domain/report";
import { Specie } from "../../../domain/specie";

export interface IReportRepository {
    findReportById(id: string): Promise<Report>;
    findReports(): Promise<Report[]>;
    saveReport(report: Report): Promise<Report>;
    updateReport(report: Report): Promise<Report>;
}