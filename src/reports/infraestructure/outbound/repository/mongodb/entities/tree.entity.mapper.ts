import { Inject, Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { Condition } from "src/reports/core/domain/condition";
import { Diagnosis } from "src/reports/core/domain/diagnosis";
import { HealthStatus } from "src/reports/core/domain/healthstatus";
import { ReportedSignSymptom } from "src/reports/core/domain/reportedSignSymptom";
import { SignSymptom } from "src/reports/core/domain/signsymptom";
import { Specie } from "src/reports/core/domain/specie";
import { Tree } from "src/reports/core/domain/tree";
import { IConditionRepository } from "src/reports/core/ports/outbounding/repository/condition.repository";
import { ISignSymptomRepository } from "src/reports/core/ports/outbounding/repository/signsymptom.repository";
import { ISpecieRepository } from "src/reports/core/ports/outbounding/repository/species.repotitory";
import { DiagnosisEntity } from "./diagnosis.entity";
import { ReportedSignSymptomsEntity } from "./reportedsignsymp.entity";
import { HealthStatusEntity, TreeEntity } from "./tree.entity";

@Injectable()
export class TreeEntityMapper{
    constructor (
        @Inject('SpeciesRepository')
        private specieRepo: ISpecieRepository,
        @Inject('SignSymptomRepository')
        private signSymptomRepo: ISignSymptomRepository,
        @Inject('ConditionsRepository')
        private conditionRepo: IConditionRepository){}
    public async entityToDomain(entity: TreeEntity): Promise<Tree>{
        const domain = new Tree();
        domain.setId(entity._id.toHexString());
        domain.setCupDiameter(entity.cupDiameter);
        domain.setDch(entity.dch);
        domain.setHeight(entity.height);
        domain.setImageSet(entity.imageSet);
        domain.setLocation(entity.location);
        domain.setNumForks(entity.numForks);
        const reportedSignSymptoms: ReportedSignSymptom[] = [];
        for (const reportedSignSympEntity of entity.healthStatus.reportedSignSymptoms) {
            const signSymptom: SignSymptom = await this.signSymptomRepo.findSignSymptomById(reportedSignSympEntity.signSymptom.toHexString())
            const reportedSignSymptom: ReportedSignSymptom = new ReportedSignSymptom(reportedSignSympEntity.imageSet,signSymptom)
            reportedSignSymptoms.push(reportedSignSymptom);
        }
        const conditions: Condition[] = [];
        for (const conditionId of entity.healthStatus.diagnosis.conditionsIds) {
            const condition: Condition = await this.conditionRepo.findConditionById(conditionId.toHexString());
            conditions.push(condition);
        }
        const diagnosis: Diagnosis = new Diagnosis(conditions,entity.healthStatus.diagnosis.preliminary);
        const healthStatus: HealthStatus = new HealthStatus(entity.healthStatus.status,reportedSignSymptoms,diagnosis);
        domain.setHealthStatus(healthStatus);
        const specie: Specie = await this.specieRepo.findSpecieById(entity.specie.toHexString())
        domain.setSpecie(specie);
        return domain;
    }

    public async entitysToDomains(entities: TreeEntity[]): Promise<Tree[]> {
        const domains: Tree[] = [];
        for (const entity of entities) {
            const domain = await this.entityToDomain(entity);
            domains.push(domain);
        }
        return domains;
    }

    public domainToEntity(domain: Tree): TreeEntity {
        const entity: TreeEntity = new TreeEntity()
        if(domain.getId() !== null && domain.getId() !== undefined && domain.getId() !== ''){
            entity._id = new ObjectId(domain.getId());
        }
        entity.cupDiameter = domain.getCupDiameter();
        entity.dch = domain.getDch();
        entity.height = domain.getHeight();
        entity.imageSet = domain.getImageSet();
        entity.location = domain.getLocation();
        entity.numForks = domain.getNumForks();
        entity.specie = new ObjectId(domain.getSpecie().getId());
        const conditionIds: ObjectId[] = [];
        for (const condition of domain.getHealthStatus().getDiagnosis().getConditions()) {
            conditionIds.push(new ObjectId(condition.getId()));   
        }        
        const diagnosisEntity: DiagnosisEntity = new DiagnosisEntity();
        diagnosisEntity.conditionsIds = conditionIds;
        diagnosisEntity.preliminary = domain.getHealthStatus().getDiagnosis().isPreliminary();

        const reportedSignSymptomEntities: ReportedSignSymptomsEntity[] = [];
        for (const reportedSignSymptom of domain.getHealthStatus().getReportedSignSymptoms()) {
            const reportedSignSymptomEntity: ReportedSignSymptomsEntity = new ReportedSignSymptomsEntity();
            reportedSignSymptomEntity.imageSet = reportedSignSymptom.getImageSet();
            reportedSignSymptomEntity.signSymptom = new ObjectId(reportedSignSymptom.getSignSymptom().getId());
            reportedSignSymptomEntities.push(reportedSignSymptomEntity);
        }

        const healthStatusEntity: HealthStatusEntity = new HealthStatusEntity();
        healthStatusEntity.status = domain.getHealthStatus().getStatus();
        healthStatusEntity.diagnosis = diagnosisEntity;
        healthStatusEntity.reportedSignSymptoms = reportedSignSymptomEntities;
        entity.healthStatus = healthStatusEntity;
        return entity;
    }
}