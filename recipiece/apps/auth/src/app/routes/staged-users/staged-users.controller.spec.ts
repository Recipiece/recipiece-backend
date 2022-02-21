import { Test, TestingModule } from '@nestjs/testing';
import { StagedUsersController } from './staged-users.controller';

describe('StagedUsersController', () => {
  let controller: StagedUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StagedUsersController],
    }).compile();

    controller = module.get<StagedUsersController>(StagedUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
