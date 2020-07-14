import { Module } from '@nestjs/common';
import { PedagogiaService } from './pedagogia.service';
import { PersistenciaModule } from '../persistencia/persistencia.module';
import { PersistenciaService } from '../persistencia/persistencia.service';
import { CrudFactory } from '../persistencia/crud.factory';

@Module({
  imports: [PersistenciaModule],
  providers: [PedagogiaService, PersistenciaService, CrudFactory],
  exports: [PedagogiaService]
})
export class PedagogiaModule {}
