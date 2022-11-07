import { Tree } from "src/reports/core/domain/tree";

export interface ITreeRepository {
    findTreeById(id: string): Promise<Tree>;
    findAllTrees(): Promise<Tree[]>
    saveTree(tree: Tree): Promise<Tree>;
}