import { Injectable } from "@nestjs/common";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { ImageSet } from "src/reports/core/domain/imageset";
import { ReportedSignSymptom } from "src/reports/core/domain/reportedSignSymptom";
import { SignSymptom } from "src/reports/core/domain/signsymptom";
import { ImageSetDto } from "./imageset.dto";
import { SignSymptomDto, SignSymptomDtoMapper } from "./sigsymtpom.dto";

export class ReportedSignSymptomDto {
    @ValidateNested()
    @Type(() => ImageSetDto)
    public imageSet: ImageSetDto;

    @ValidateNested()
    @Type(() => SignSymptomDto)
    public signSymptom: SignSymptomDto;
}

@Injectable()
export class ReportedSignSymptomDtoMapper {
    constructor(private signSymptomsMapper: SignSymptomDtoMapper){}
    
    dtoToDomain(dto: ReportedSignSymptomDto): ReportedSignSymptom {
        const imageSet: ImageSet = new ImageSet();
        imageSet.setImages(dto?.imageSet?.images ? dto?.imageSet?.images : []);
        const signSymptom: SignSymptom = dto.signSymptom ? this.signSymptomsMapper.dtoToDomain(dto.signSymptom) : null;
        const reportedSignSymptom: ReportedSignSymptom = new ReportedSignSymptom(imageSet, signSymptom)
        return reportedSignSymptom;
    }

    dtosToDomains(dtos: ReportedSignSymptomDto[]): ReportedSignSymptom[]{
        const domains: ReportedSignSymptom[] = [];
        dtos.forEach(dto => {
            domains.push(this.dtoToDomain(dto));
        });
        return domains;
    }
}