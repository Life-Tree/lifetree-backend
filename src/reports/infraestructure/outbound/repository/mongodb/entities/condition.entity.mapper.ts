import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { Condition } from "src/reports/core/domain/condition";
import { SignSymptom } from "src/reports/core/domain/signsymptom";
import { ISignSymptomRepository } from "src/reports/core/ports/outbounding/repository/signsymptom.repository";
import { ConditionEntity } from "./condition.entity";

@Injectable()
export class ConditionEntityMapper{
    constructor (
        @Inject('SignSymptomRepository')
        private signSymptomsRepo: ISignSymptomRepository){}
    public async entityToDomain(entity: ConditionEntity): Promise<Condition>{
        const domain = new Condition();
        domain.setId(entity._id.toHexString());
        domain.setDescription(entity.description);
        domain.setCommonName(entity.commonName);
        domain.setFamily(entity.family);
        domain.setCausativeAgent(entity.causativeAgent);
        domain.setScientificName(entity.scientificName);
        const signSymptoms: SignSymptom[] = [];
        for (const _id of entity.signSymptoms) {
            const signSymptom = await this.signSymptomsRepo.findSignSymptomById(_id.toHexString())
            signSymptoms.push(signSymptom);
        }
        domain.setSignSymptoms(signSymptoms);
        return domain;
    }

    public async entitysToDomains(entities: ConditionEntity[]): Promise<Condition[]> {
        const domains: Condition[] = [];
        for (const entity of entities) {
            const domain = await this.entityToDomain(entity);
            domains.push(domain);
        }
        return domains;
    }

    public domainToEntity(domain: Condition): ConditionEntity {
        const entity: ConditionEntity = new ConditionEntity()
        if(domain.getId() !== null && domain.getId() !== undefined && domain.getId() !== ''){
            entity._id = new ObjectId(domain.getId());
        }
        entity.description = domain.getDescription();
        entity.commonName = domain.getCommonName();
        entity.family = domain.getFamily();
        entity.causativeAgent = domain.getCausativeAgent();
        entity.scientificName = domain.getScientificName();
        const signSymptomsIds: ObjectId[] = [];
        domain.getSignSymptoms().forEach(signSymp => {
            signSymptomsIds.push(new ObjectId(signSymp.getId()))
        });
        entity.signSymptoms = signSymptomsIds;
        return entity;
    }
}