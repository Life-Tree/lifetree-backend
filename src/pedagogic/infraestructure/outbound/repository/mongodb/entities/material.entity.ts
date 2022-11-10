import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { File } from "src/pedagogic/core/domain/file";
import { Material } from "src/pedagogic/core/domain/material";
import { Segment } from "src/pedagogic/core/domain/segment";
import { FileEntity } from "./file.entity";
import { SegmentEntity } from "./segment.entity";

export class MaterialEntity {
    public _id: ObjectId
    public segments: SegmentEntity[];
    public title: string;
}

@Injectable()
export class MaterialEntityMapper{
    public async entityToDomain(entity: MaterialEntity): Promise<Material>{
        const domain = new Material();
        domain.setTitle(entity.title);
        domain.setId(entity._id.toHexString());
        const segments: Segment[] = [];
        for (const segmentEntity of entity.segments) {
            const segment: Segment = new Segment();
            segment.setCode(segmentEntity.code);
            segment.setConsecutive(segmentEntity.consecutive);
            segment.setDescription(segmentEntity.description);
            segment.setName(segmentEntity.name);
            segment.setText(segmentEntity.text);
            const file: File = new File()
            file.setBase64(segmentEntity.file?.base64 ? segmentEntity.file?.base64 : '');
            file.setType(segmentEntity.file?.type ? segmentEntity.file?.type : 0);
            file.setUrl(segmentEntity.file?.url ? segmentEntity.file?.url : '');
            segment.setFile(file);
            segments.push(segment);
        }
        domain.setSegments(segments);
        return domain;
    }

    public async entitysToDomains(entities: MaterialEntity[]): Promise<Material[]> {
        const domains: Material[] = [];
        for (const entity of entities) {
            const domain = await this.entityToDomain(entity);
            domains.push(domain);
        }
        return domains;
    }

    public domainToEntity(domain: Material): MaterialEntity {
        const entity: MaterialEntity = new MaterialEntity()
        if(domain.getId() !== null && domain.getId() !== undefined && domain.getId() !== ''){
            entity._id = new ObjectId(domain.getId());
        }
        entity.title = domain.getTitle();
        const segmentsEntities: SegmentEntity[] = [];
        for (const segment of domain.getSegments()) {
            const segmentEntity: SegmentEntity = new SegmentEntity();
            segmentEntity.code = segment.getCode();
            segmentEntity.consecutive = segment.getConsecutive();
            segmentEntity.description = segment.getDescription();
            segmentEntity.name = segment.getName();
            segmentEntity.text = segment.getText();
            const fileEntity: FileEntity = new FileEntity()
            fileEntity.base64 = segment.getFile()?.getBase64() ? segment.getFile()?.getBase64() : '';
            fileEntity.type =segment.getFile()?.getType() ? segment.getFile().getType() : 0;
            fileEntity.url = segment.getFile()?.getUrl() ? segment.getFile()?.getUrl() : '';
            segmentEntity.file = fileEntity;
            segmentsEntities.push(segmentEntity);
        }
        entity.segments = segmentsEntities;
        return entity;
    }
}