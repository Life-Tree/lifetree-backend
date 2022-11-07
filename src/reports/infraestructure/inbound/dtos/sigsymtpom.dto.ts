import { Injectable } from "@nestjs/common";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { SignSymptom } from "src/reports/core/domain/signsymptom";
import { TreePart } from "src/reports/core/enums/enums";

export class SignSymptomDto{
    public id: string;
    public name: string;
    public affectedTreeParts: TreePart[];
    public description: string;
}

@Injectable()
export class SignSymptomDtoMapper{
    dtoToDomain(dto: SignSymptomDto): SignSymptom {
        const signSymptom: SignSymptom = new SignSymptom(dto.affectedTreeParts, dto.description);
        signSymptom.setId(dto.id);
        signSymptom.setName(dto.name);
        return signSymptom;
    }

    dtosToDomains(dtos: SignSymptomDto[]): SignSymptom[]{
        const domains: SignSymptom[] = [];
        dtos.forEach(dto => {
            domains.push(this.dtoToDomain(dto));
        });
        return domains;
    }
}