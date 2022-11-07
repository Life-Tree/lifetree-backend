import { Specie } from "../../../domain/specie";

export interface ISpecieRepository {
    findSpecies(): Promise<Specie[]>;
    findSpecieById(id: string): Promise<Specie>;
}