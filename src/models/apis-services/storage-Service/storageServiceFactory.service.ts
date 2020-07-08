import { Injectable } from '@nestjs/common';
import { IStorageService } from "./storageService.interface";
import { GoogleStorage } from './goolgeStorage';
import { STORAGE_SERVICE } from './serviceStorage.enum';

@Injectable()
export class StorageServiceFactoryService {

    public getSorageService(serviceStorageType: string ): IStorageService {
        if (serviceStorageType == null) {
            return null;
        }
        if (serviceStorageType === STORAGE_SERVICE.GOOGLE_STORAGE) {
            return new GoogleStorage();

        }
        return null;
    }
}
