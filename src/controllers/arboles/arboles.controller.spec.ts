import { Test, TestingModule } from '@nestjs/testing';
import { ArbolesController } from './arboles.controller';

describe('Arboles Controller', () => {
  let controller: ArbolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArbolesController],
    }).compile();

    controller = module.get<ArbolesController>(ArbolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
