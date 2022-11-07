import { SignSymptom } from "src/reports/core/domain/signsymptom";

export interface ISignSymptomRepository {
    findSignSymptoms(): Promise<SignSymptom[]>;
    findSignSymptomById(id: string): Promise<SignSymptom>;
}