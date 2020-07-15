import { Module } from '@nestjs/common';
import { ArbolesController } from './arboles/arboles.controller';
import { ArbolesModule } from 'src/models/arboles/arboles.module';
import { ArbolesService } from 'src/models/arboles/arboles.service';
import { StorageServiceFactoryService } from 'src/models/storage-Service/storageServiceFactory.service';
import { VisionServiceFactoryService } from 'src/models/vision-Service/visionServiceFactory.service';
import { PersistenciaService } from 'src/models/persistencia/persistencia.service';
import { CrudFactory } from 'src/models/persistencia/crud.factory';
import { PedagogiaController } from './pedagogia/pedagogia.controller';
import { PedagogiaModule } from 'src/models/pedagogia/pedagogia.module';
import { PedagogiaService } from 'src/models/pedagogia/pedagogia.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from 'src/models/users/users.module';
import { UsersService } from 'src/models/users/users.service';

@Module({
  imports: [ArbolesModule, PedagogiaModule, UsersModule],
  controllers: [ArbolesController, PedagogiaController, UsersController],
  providers: [ArbolesService, StorageServiceFactoryService, 
    VisionServiceFactoryService, PersistenciaService, CrudFactory, PedagogiaService, UsersService]
})
export class ControllerModule {}
