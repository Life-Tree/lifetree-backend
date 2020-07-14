import { IStorageService } from "../interfaces/storageService.interface";
export declare class GoogleStorage implements IStorageService {
    uploadFile(imgData: string): Promise<string>;
}
