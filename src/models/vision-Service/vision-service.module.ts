import { Module } from '@nestjs/common';
import { VisionServiceFactoryService } from './visionServiceFactory.service';

@Module({
    providers:[
        VisionServiceFactoryService
    ],
    exports :[
        VisionServiceFactoryService
    ]
})
export class VisionServiceModule {}
