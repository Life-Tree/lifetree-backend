import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PersistenciaModule } from '../persistencia/persistencia.module';
import { PersistenciaService } from '../persistencia/persistencia.service';
import { CrudFactory } from '../persistencia/crud.factory';

@Module({
  imports: [PersistenciaModule],
  providers: [UsersService, PersistenciaService, CrudFactory],
  exports: [UsersService]
})
export class UsersModule {}
