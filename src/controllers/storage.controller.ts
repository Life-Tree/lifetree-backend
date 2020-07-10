import { Controller, Post, Body } from '@nestjs/common';
import { StorageServiceFactoryService } from 'src/models/storage-Service/storageServiceFactory.service';
import { IStorageService } from 'src/models/storage-Service/interfaces/storageService.interface';
import { VisionServiceFactoryService } from 'src/models/vision-Service/visionServiceFactory.service';
import { IVisionService } from 'src/models/vision-Service/interfaces/visionService.interface';
import { STORAGE_SERVICE } from 'src/models/storage-Service/constantes/serviceStorage.enum';
import { VISION_SERVICE } from 'src/models/vision-Service/constantes/serviceVision.enum';

@Controller('storage')
export class StorageController {

    constructor(
        private storageService:StorageServiceFactoryService,
        private visionService:VisionServiceFactoryService
        ){
    }
    @Post('storage')
    async uploadFile(@Body() image: { data:string }):Promise<string> {
        const goolgeStotrage:IStorageService = this.storageService.getSorageService(STORAGE_SERVICE.GOOGLE_STORAGE)
        return goolgeStotrage.uploadFile(image.data)
    }

    @Post('vision')
    async isTree(@Body() image: { data:string }):Promise<boolean> {
        const googleVision:IVisionService = this.visionService.getVisionService(VISION_SERVICE.GOOGLE_VISION)
        return googleVision.isTree(image.data)
    }
}
 