import { Test, TestingModule } from '@nestjs/testing';
import { PersistenciaService } from './persistencia.service';

describe('PersistenciaService', () => {
  let service: PersistenciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersistenciaService],
    }).compile();

    service = module.get<PersistenciaService>(PersistenciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
