export interface IVisionService {
    isTree(image: string): Promise<boolean>;
}
