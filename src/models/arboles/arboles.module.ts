import { Module } from '@nestjs/common';
import { ArbolesService } from './arboles.service';
import { PersistenciaModule } from '../persistencia/persistencia.module';
import { PersistenciaService } from '../persistencia/persistencia.service';
import { CrudFactory } from '../persistencia/crud.factory';
import { StorageServiceModule } from '../storage-Service/storageService.module';
import { VisionServiceModule } from '../vision-Service/vision-service.module';
import { StorageServiceFactoryService } from '../storage-Service/storageServiceFactory.service';
import { VisionServiceFactoryService } from '../vision-Service/visionServiceFactory.service';

@Module({
  imports: [PersistenciaModule, StorageServiceModule, VisionServiceModule],
  providers: [ArbolesService, PersistenciaService, CrudFactory, StorageServiceFactoryService, VisionServiceFactoryService],
  exports: [ArbolesService]
})
export class ArbolesModule {}
