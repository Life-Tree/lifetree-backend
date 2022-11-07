import { Injectable } from "@nestjs/common";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Diagnosis } from "src/reports/core/domain/diagnosis";
import { ConditionDto, ConditionDtoMapper } from "./condition.dto";

export class DiagnosisDto {
    @ValidateNested({ each: true })
    @Type(() => ConditionDto)
    public conditions: ConditionDto[];
    public preliminary: boolean;
}

@Injectable()
export class DiagnosisDtoMapper{

    constructor(private conditionDtoMapper: ConditionDtoMapper){}
    dtoToDomain(dto: DiagnosisDto): Diagnosis {
        return new Diagnosis(dto.conditions ? this.conditionDtoMapper.dtosToDomains(dto.conditions): [],dto.preliminary);
    }

    dtosToDomains(dtos: DiagnosisDto[]): Diagnosis[]{
        const domains: Diagnosis[] = [];
        dtos.forEach(dto => {
            domains.push(this.dtoToDomain(dto));
        });
        return domains;
    }
}