import { Test, TestingModule } from '@nestjs/testing';
import { ArbolesService } from './arboles.service';

describe('ArbolesService', () => {
  let service: ArbolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArbolesService],
    }).compile();

    service = module.get<ArbolesService>(ArbolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
