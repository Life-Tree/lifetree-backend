import { Module } from '@nestjs/common';
import { PersistenciaService } from './persistencia.service';
import { CrudFactory } from './crud.factory';

@Module({
  providers: [PersistenciaService, CrudFactory],
  exports: [PersistenciaService]
})
export class PersistenciaModule {}
