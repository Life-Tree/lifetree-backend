import { Material } from "../../domain/material";

export interface IMaterialService{
    getAll(): Promise<Material[]>;
    getMaterialById(id: string): Promise<Material>;
    getMaterialByTitle(title: string): Promise<Material>;
    saveMaterial(material: Material): Promise<Material>;
    updateMaterial(material: Material): Promise<Material>;
}