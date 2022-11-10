import { Inject } from "@nestjs/common";
import { Material } from "../core/domain/material";
import { Segment } from "../core/domain/segment";
import { IMaterialService } from "../core/ports/inbounding/material.service";
import { IMaterialRepository } from "../core/ports/outbounding/repository/material.repository";
import { IStorage } from "../core/ports/outbounding/storage";

export class MaterialServiceImpl implements IMaterialService{
    constructor(
        @Inject('MongoMaterialRepository')
        private materialRepo: IMaterialRepository,
        @Inject('CloudinaryStorage')
        private storageService: IStorage
    ){}

    public getAll(): Promise<Material[]> {
        return this.materialRepo.findAll();
    }
    public getMaterialById(id: string): Promise<Material> {
        return this.materialRepo.findById(id);
    }
    public getMaterialByTitle(title: string): Promise<Material> {
        return this.materialRepo.findByTitle(title);
    }
    public async saveMaterial(material: Material): Promise<Material> {
        const segments = await this.saveSegmentFiles(material.getSegments());
        material.setSegments(segments);
        return this.materialRepo.save(material);
    }
    public updateMaterial(material: Material): Promise<Material> {
        return this.materialRepo.update(material);
    }

    private async saveSegmentFiles(segments: Segment[]): Promise<Segment[]> {
        const result : Segment[] = [];
        for (const segment of segments) {
            if(segment.getFile().getBase64() !== ""){
                const url = await this.storageService.saveFile(segment.getFile().getBase64());
                segment.getFile().setUrl(url);
                segment.getFile().setBase64("");
            }            
            result.push(segment);
        }
        return result;
    }


}