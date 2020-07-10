import { Module } from '@nestjs/common';
import { ArbolesController } from './arboles/arboles.controller';
import { ArbolesModule } from 'src/models/arboles/arboles.module';
import { ArbolesService } from 'src/models/arboles/arboles.service';
import { StorageServiceFactoryService } from 'src/models/storage-Service/storageServiceFactory.service';
import { VisionServiceFactoryService } from 'src/models/vision-Service/visionServiceFactory.service';
import { PersistenciaService } from 'src/models/persistencia/persistencia.service';
import { CrudFactory } from 'src/models/persistencia/crud.factory';

@Module({
  imports: [ArbolesModule],
  controllers: [ArbolesController],
  providers: [ArbolesService, StorageServiceFactoryService, VisionServiceFactoryService, PersistenciaService, CrudFactory]
})
export class ControllerModule {}
