import { Injectable } from "@nestjs/common";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Material } from "src/pedagogic/core/domain/material";
import { Segment } from "src/pedagogic/core/domain/segment";
import { SegmentDto } from "./segment.dto";

export class MaterialDto{
    public id: string;
    @ValidateNested({ each: true })
    @Type(() => SegmentDto)
    public segments: SegmentDto[];
    public title: string;
}

@Injectable()
export class MaterialDtoMapper{
    dtoToDomain(dto: MaterialDto): Material {
        const domain: Material = new Material();
        domain.setId(dto.id);
        domain.setTitle(dto.title);
        const segments: Segment[] = [];
        for (const segmentDto of dto.segments) {
            const segment: Segment = new Segment();
            segment.setCode(segmentDto.code);
            segment.setConsecutive(segmentDto.consecutive);
            segment.setDescription(segmentDto.description);
            segment.setName(segmentDto.name);
            segment.setText(segmentDto.text);
            segment.setFile(segmentDto.file);
            segments.push(segment);
        }
        domain.setSegments(segments);
        return domain;
    }

    dtosToDomains(dtos: MaterialDto[]): Material[]{
        const domains: Material[] = [];
        dtos.forEach(dto => {
            domains.push(this.dtoToDomain(dto));
        });
        return domains;
    }
}