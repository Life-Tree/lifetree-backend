import { Injectable } from "@nestjs/common";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Condition } from "src/reports/core/domain/condition";
import { SignSymptom } from "src/reports/core/domain/signsymptom";
import { SignSymptomDto, SignSymptomDtoMapper } from "./sigsymtpom.dto";

export class ConditionDto {
    public id?: string;
    public commonName: string;
    public scientificName: string;
    public family: string;
    public causativeAgent: string;
    public description: string;

    @ValidateNested({ each: true })
    @Type(() => SignSymptomDto)
    public signSymptoms: SignSymptomDto[];
}

@Injectable()
export class ConditionDtoMapper{
    constructor(private signSymptomsMapper: SignSymptomDtoMapper){}
    dtoToDomain(dto: ConditionDto): Condition {
        const domain: Condition = new Condition();
        domain.setId(dto.id);
        domain.setCausativeAgent(dto.causativeAgent);
        domain.setDescription(dto.description);
        domain.setCommonName(dto.commonName);
        domain.setFamily(dto.family);
        domain.setScientificName(dto.scientificName);
        const signSymptoms: SignSymptom[] = dto.signSymptoms ? this.signSymptomsMapper.dtosToDomains(dto.signSymptoms) : [];
        domain.setSignSymptoms(signSymptoms);
        return domain;
    }

    dtosToDomains(dtos: ConditionDto[]): Condition[]{
        const domains: Condition[] = [];
        dtos.forEach(dto => {
            domains.push(this.dtoToDomain(dto));
        });
        return domains;
    }
}