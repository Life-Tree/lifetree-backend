import { Injectable } from "@nestjs/common";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Diagnosis } from "src/reports/core/domain/diagnosis";
import { HealthStatus } from "src/reports/core/domain/healthstatus";
import { ImageSet } from "src/reports/core/domain/imageset";
import { ReportedSignSymptom } from "src/reports/core/domain/reportedSignSymptom";
import { SignSymptom } from "src/reports/core/domain/signsymptom";
import { HealthStatusEnum } from "src/reports/core/enums/enums";
import { DiagnosisDto, DiagnosisDtoMapper } from "./diagnosis.dto";
import { ReportedSignSymptomDto, ReportedSignSymptomDtoMapper } from "./reportedsignsymptom.dto";

export class HealthStatusDto {
    public status: HealthStatusEnum;

    @ValidateNested({ each: true })
    @Type(() => ReportedSignSymptomDto)
    public reportedSignSymptoms: ReportedSignSymptomDto[];

    @ValidateNested()
    @Type(() => DiagnosisDto)
    public diagnosis: DiagnosisDto;
}

@Injectable()
export class HealthStatusDtoMapper {

    constructor(
        private reportedSignSymptomsMapper: ReportedSignSymptomDtoMapper,
        private diagnosisDtoMapper: DiagnosisDtoMapper){}

    public dtoToDomain(dto: HealthStatusDto): HealthStatus{
        const reportedSignSymptoms: ReportedSignSymptom[] = dto.reportedSignSymptoms ? this.reportedSignSymptomsMapper.dtosToDomains(dto.reportedSignSymptoms) :  [];
        const diagnosis: Diagnosis = dto.diagnosis ? this.diagnosisDtoMapper.dtoToDomain(dto.diagnosis) : null;
        const healthStatus: HealthStatus = new HealthStatus(dto.status, reportedSignSymptoms, diagnosis);
        return healthStatus; 
    }

    public dtosToDomains(dtos: HealthStatusDto[]): HealthStatus[]{
        const domains: HealthStatus[] = [];
        dtos.forEach(dto => {
            domains.push(this.dtoToDomain(dto));
        });
        return domains;
    }
}