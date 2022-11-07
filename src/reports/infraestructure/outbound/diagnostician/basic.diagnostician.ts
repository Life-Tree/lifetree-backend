import { Inject, Injectable } from "@nestjs/common";
import { Condition } from "src/reports/core/domain/condition";
import { Diagnosis } from "src/reports/core/domain/diagnosis";
import { ReportedSignSymptom } from "src/reports/core/domain/reportedSignSymptom";
import { SignSymptom } from "src/reports/core/domain/signsymptom";
import { IReportFinder } from "src/reports/core/ports/inbounding/reportFinder";
import { IDiagnostician } from "src/reports/core/ports/outbounding/diagnostician";

@Injectable()
export class BasicDiagnostician implements IDiagnostician{

    constructor(
        @Inject('ReportFinderImpl')
        private reportFinder: IReportFinder){}
    async diagnose(signSymptoms: ReportedSignSymptom[]): Promise<Diagnosis> {
        const signSymptomsMap = this.reportedSignSymptomsToMap(signSymptoms);
        const allConditions = await this.reportFinder.getAllConditions();
        const conditionsMap: Map<number, Condition[]> = new Map();
        let maxMatchs = 0;
        for (const condition of allConditions) {
            let numMatchs = 0;
            for (const signSymptom of condition.getSignSymptoms()) {
                if(signSymptomsMap.has(signSymptom.getId())){
                    numMatchs++;
                }
            }
            if(numMatchs > 0){
                let conditionsToSet: Condition[] = [];
                if(conditionsMap.has(numMatchs)){
                    conditionsToSet = conditionsMap.get(numMatchs);
                }
                conditionsToSet.push(condition);
                conditionsMap.set(numMatchs, conditionsToSet);
                if(numMatchs > maxMatchs) maxMatchs = numMatchs;
            }            
        }
        return new Diagnosis(conditionsMap.get(maxMatchs), true);
    }

    private reportedSignSymptomsToMap(signSymptoms: ReportedSignSymptom[]): Map<string, SignSymptom>{
        const signSymptomsMap: Map<string, SignSymptom> = new Map();
        signSymptoms.forEach(signSymptom => {
            signSymptomsMap.set(signSymptom.getSignSymptom().getId(), signSymptom.getSignSymptom());
        });
        return signSymptomsMap;
    }
}