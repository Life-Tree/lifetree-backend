import { HealthStatusEnum } from "../enums/enums";
import { Diagnosis } from "./diagnosis";
import { ReportedSignSymptom } from "./reportedSignSymptom";

export class HealthStatus {
    private status: HealthStatusEnum;
    private reportedSignSymptoms: ReportedSignSymptom[];
    private diagnosis: Diagnosis;

    constructor(status: HealthStatusEnum, repSignSymptom: ReportedSignSymptom[], diagnosis: Diagnosis) {
        this.status=status;
        this.reportedSignSymptoms=repSignSymptom;
        this.diagnosis=diagnosis;
    }

    public getStatus(): number {
        return this.status;
    }

    public setStatus(status: HealthStatusEnum): void {
        this.status = status;
    }

    public getReportedSignSymptoms(): ReportedSignSymptom[] {
        return this.reportedSignSymptoms;
    }

    public setReportedSignSymptoms(reportedSignSymptoms: ReportedSignSymptom[]): void {
        this.reportedSignSymptoms = reportedSignSymptoms;
    }

    public getDiagnosis(): Diagnosis {
        return this.diagnosis;
    }

    public setDiagnosis(diagnosis: Diagnosis): void {
        this.diagnosis = diagnosis;
    }

}