import { Diagnosis } from "../../domain/diagnosis";
import { ReportedSignSymptom } from "../../domain/reportedSignSymptom";

export interface IDiagnostician {
    diagnose(signSymptoms: ReportedSignSymptom[]): Promise<Diagnosis>;
}