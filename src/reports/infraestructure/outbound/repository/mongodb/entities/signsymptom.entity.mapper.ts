import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { SignSymptom } from "src/reports/core/domain/signsymptom";
import { TreePart } from "src/reports/core/enums/enums";
import { SignSymptomEntity } from "./signsymptom.entity";

@Injectable()
export class SignSymptomEntityMapper{
    public entityToDomain(entity: SignSymptomEntity): SignSymptom {
        const domain = new SignSymptom(<TreePart[]> entity.affectedTreeParts, entity.description);
        domain.setId(entity._id.toHexString());
        domain.setName(entity.name);
        return domain;
    }

    public entitysToDomains(entities: SignSymptomEntity[]): SignSymptom[] {
        const species: SignSymptom[] = [];
        for (const entity of entities) {
            const specie = this.entityToDomain(entity);
            species.push(specie);
        }
        return species;
    }

    public domainToEntity(domain: SignSymptom): SignSymptomEntity {
        const entity: SignSymptomEntity = new SignSymptomEntity()
        if(domain.getId() !== null && domain.getId() !== undefined && domain.getId() !== ''){
            entity._id = new ObjectId(domain.getId());
        }
        entity.affectedTreeParts = domain.getAffectedTreeParts();
        entity.description = domain.getDescription();
        entity.name = domain.getName();
        return entity;
    }
}