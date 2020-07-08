import { Injectable } from '@nestjs/common';
import { IStorageService } from "./storageService.interface";
import { GoogleStorage } from './goolgeStorage';
import { SERVICE } from '../service.enum';

@Injectable()
export class StorageServiceFactoryService {

    public getSorageService(serviceStorageType: string ): IStorageService {
        if (serviceStorageType == null) {
            return null;
        }
        if (serviceStorageType === SERVICE.GOOGLE) {
            return new GoogleStorage();

        }
        return null;
    }
}
