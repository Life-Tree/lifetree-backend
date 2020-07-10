import { Module } from '@nestjs/common';
import { PersistenciaService } from './persistencia.service';

@Module({
  providers: [PersistenciaService]
})
export class PersistenciaModule {}
