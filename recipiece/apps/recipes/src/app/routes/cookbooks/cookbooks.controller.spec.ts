import { Test, TestingModule } from '@nestjs/testing';
import { CoobooksController } from './cookbooks.controller';

describe('CoobooksController', () => {
  let controller: CoobooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoobooksController],
    }).compile();

    controller = module.get<CoobooksController>(CoobooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
