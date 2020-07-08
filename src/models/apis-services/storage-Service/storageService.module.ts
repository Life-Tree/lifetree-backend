import { Module } from '@nestjs/common';
import { StorageServiceFactoryService } from './storageServiceFactory.service';

@Module({
    providers:[
        StorageServiceFactoryService,
    ],
    exports :[
        StorageServiceFactoryService,
    ]
})
export class StorageServiceModule {}
