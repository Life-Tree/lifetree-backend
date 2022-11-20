import { Report } from "../../../domain/report";

export interface IReportRepository {
    findReportById(id: string): Promise<Report>;
    findReports(): Promise<Report[]>;
    saveReport(report: Report): Promise<Report>;
    updateReport(report: Report): Promise<Report>;
}