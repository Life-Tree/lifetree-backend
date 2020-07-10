import { Module } from '@nestjs/common';
import { ArbolesService } from './arboles.service';

@Module({
  providers: [ArbolesService]
})
export class ArbolesModule {}
