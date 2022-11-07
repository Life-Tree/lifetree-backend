export interface IVision {
    isTree(imageB64: string): Promise<boolean>;
}