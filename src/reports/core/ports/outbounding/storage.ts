export interface IStorage {
    saveImage(imageB64: string): Promise<string>;
}