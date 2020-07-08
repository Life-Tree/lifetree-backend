import { Module } from '@nestjs/common';
import { StorageServiceFactoryService } from './storageServiceFactory.service';
import { VisionServiceFactoryService } from './visionServiceFactory.service';

@Module({
    providers:[
        StorageServiceFactoryService,
        VisionServiceFactoryService
    ],
    exports :[
        StorageServiceFactoryService,
        VisionServiceFactoryService
    ]
})
export class ApiServiceModule {}
