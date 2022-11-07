import { Inject, Injectable } from "@nestjs/common";
import { Condition } from "../core/domain/condition";
import { Report } from "../core/domain/report";
import { SignSymptom } from "../core/domain/signsymptom";
import { Specie } from "../core/domain/specie";
import { TreePart } from "../core/enums/enums";
import { IReportFinder } from "../core/ports/inbounding/reportFinder";
import { IConditionRepository } from "../core/ports/outbounding/repository/condition.repository";
import { IReportRepository } from "../core/ports/outbounding/repository/report.repository";
import { ISignSymptomRepository } from "../core/ports/outbounding/repository/signsymptom.repository";
import { ISpecieRepository } from "../core/ports/outbounding/repository/species.repotitory";

@Injectable()
export class ReportFinderImpl implements IReportFinder{

    constructor(
        @Inject('ReportRepository')
        private reportRepository: IReportRepository,
        @Inject('SpeciesRepository')
        private specieRepository: ISpecieRepository,
        @Inject('ConditionsRepository')
        private conditionRepository: IConditionRepository,
        @Inject('SignSymptomRepository')
        private signSymptomRepository: ISignSymptomRepository){}

    async getAllSpecies(): Promise<Specie[]> {
        return this.specieRepository.findSpecies();
    }
    async getAllConditions(): Promise<Condition[]> {
        return this.conditionRepository.findConditions();
    }

    async getReportById(id: string): Promise<Report> {
        return this.reportRepository.findReportById(id);
    }
    async listReports(): Promise<Report[]> {
        return this.reportRepository.findReports();
    }
    
    async getSignSymptomsByTreeParts(treeParts: TreePart[]): Promise<SignSymptom[]>{
        if(!treeParts || treeParts.length == 0) return [];
        const allSignSymptoms: SignSymptom[] = await this.signSymptomRepository.findSignSymptoms();
        const signSymptomsMatched: SignSymptom[] = allSignSymptoms.filter(signSymptom => {
            const intersection = treeParts.filter(treePart => signSymptom.getAffectedTreeParts().includes(treePart))
            if(intersection && intersection.length > 0){
                return true;
            }
            return false;
        });
        if(signSymptomsMatched && signSymptomsMatched.length > 0){
            return signSymptomsMatched;
        }
        return [];
    }
}