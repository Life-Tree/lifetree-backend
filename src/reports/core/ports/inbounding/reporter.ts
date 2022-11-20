import { Report } from "../../domain/report";

export interface IReporter {
    report(report: Report, userInfo: any): Promise<Report>;
}