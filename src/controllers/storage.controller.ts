import { Controller, Post, Body } from '@nestjs/common';
import { StorageServiceFactoryService } from 'src/models/apis-services/Storage-Service/storageServiceFactory.service';
import { IStorageService } from 'src/models/apis-services/Storage-Service/storageService.interface';
import { SERVICE } from 'src/models/apis-services/service.enum';
import { VisionServiceFactoryService } from 'src/models/apis-services/Vision-Service/visionServiceFactory.service';
import { IVisionService } from 'src/models/apis-services/Vision-Service/visionService.interface';

@Controller('storage')
export class StorageController {

    constructor(
        private storageService:StorageServiceFactoryService,
        private visionService:VisionServiceFactoryService
        ){
    }
    @Post('storage')
    async uploadFile(@Body() image: { data:string }):Promise<string> {
        const goolgeStotrage:IStorageService = await this.storageService.getSorageService(SERVICE.GOOGLE)
        return goolgeStotrage.uploadFile(image.data)
    }

    @Post('vision')
    async isTree(@Body() image: { data:string }):Promise<boolean> {
        const googleVision:IVisionService = await this.visionService.getVisionService(SERVICE.GOOGLE)
        return googleVision.isTree(image.data)
    }
}
 