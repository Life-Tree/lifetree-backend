export interface IStorage {
    saveFile(base64: string): Promise<string>;
}