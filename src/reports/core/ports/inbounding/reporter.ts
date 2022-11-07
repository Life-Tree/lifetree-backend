import { Report } from "../../domain/report";

export interface IReporter {
    report(report: Report): Promise<Report>;
}