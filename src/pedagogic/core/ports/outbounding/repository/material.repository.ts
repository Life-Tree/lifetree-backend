import { Material } from "src/pedagogic/core/domain/material";

export interface IMaterialRepository {
    findAll(): Promise<Material[]>;
    findById(id: string): Promise<Material>;
    findByTitle(title: string): Promise<Material>;
    save(material: Material): Promise<Material>;
    update(material: Material): Promise<Material>;
}