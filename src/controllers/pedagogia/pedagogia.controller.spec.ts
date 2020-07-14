import { Test, TestingModule } from '@nestjs/testing';
import { PedagogiaController } from './pedagogia.controller';

describe('Pedagogia Controller', () => {
  let controller: PedagogiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedagogiaController],
    }).compile();

    controller = module.get<PedagogiaController>(PedagogiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
