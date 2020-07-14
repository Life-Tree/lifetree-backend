export interface IStorageService {
    uploadFile(imgData: string): Promise<string>;
}
