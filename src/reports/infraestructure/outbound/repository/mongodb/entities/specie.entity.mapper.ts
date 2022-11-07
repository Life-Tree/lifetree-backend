import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { Specie } from "src/reports/core/domain/specie";
import { SpecieEntity } from "./specie.entity";

@Injectable()
export class SpecieEntityMapper{
    public entityToDomain(entity: SpecieEntity): Specie {
        const domain = new Specie()
        domain.setId(entity._id.toHexString());
        domain.setCommonName(entity.commonName);
        domain.setConservationStatus(entity.conservationStatus);
        domain.setFamily(entity.family);
        domain.setFrecuentLocation(entity.frecuentLocation);
        domain.setGenre(entity.genre);
        domain.setMorphologicalClassification(entity.morphologicalClassification);
        domain.setName(entity.commonName);
        domain.setOrigin(entity.origin);
        domain.setScientificName(entity.scientificName);
        return domain;
    }

    public entitysToDomains(entities: SpecieEntity[]): Specie[] {
        const species: Specie[] = [];
        for (const entity of entities) {
            const specie = this.entityToDomain(entity);
            species.push(specie);
        }
        return species;
    }

    public domainToEntity(domain: Specie): SpecieEntity {
        const entity: SpecieEntity = new SpecieEntity()
        if(domain.getId() !== null && domain.getId() !== undefined && domain.getId() !== ''){
            entity._id = new ObjectId(domain.getId());
        }
        entity.commonName = domain.getCommonName();
        entity.conservationStatus=  domain.getConservationStatus();
        entity.family= domain.getFamily();
        entity.frecuentLocation = domain.getFrecuentLocation();
        entity.genre = domain.getGenre();
        entity.morphologicalClassification = domain.getMorphologicalClassification();
        entity.origin = domain.getOrigin();
        entity.scientificName = domain.getScientificName();
        return entity;
    }
}