import { Test, TestingModule } from '@nestjs/testing';
import { PedagogiaService } from './pedagogia.service';

describe('PedagogiaService', () => {
  let service: PedagogiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedagogiaService],
    }).compile();

    service = module.get<PedagogiaService>(PedagogiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
