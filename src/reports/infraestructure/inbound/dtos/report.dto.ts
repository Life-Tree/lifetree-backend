import { Injectable } from "@nestjs/common";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Report } from "src/reports/core/domain/report";
import { Tree } from "src/reports/core/domain/tree";
import { TreeDto, TreeDtoMapper } from "./tree.dto";

export class ReportDto {
    public id: string;
    public code: string;
    public reportedBy: string;

    @ValidateNested()
    @Type(() => TreeDto)
    public reportedTree: TreeDto;
}

@Injectable()
export class ReportDtoMapper {
    constructor(
        private treeDtoMapper: TreeDtoMapper){}

    public dtoToDomain(dto: ReportDto): Report{
        const tree: Tree = dto.reportedTree ? this.treeDtoMapper.dtoToDomain(dto.reportedTree) : null; 
        const report = new Report(dto.code,dto.reportedBy,tree);
        report.setId(dto.id);
        return report;
    }

    public dtosToDomains(dtos: ReportDto[]): Report[]{
        const domains: Report[] = [];
        dtos.forEach(dto => {
            domains.push(this.dtoToDomain(dto));
        });
        return domains;
    }
}