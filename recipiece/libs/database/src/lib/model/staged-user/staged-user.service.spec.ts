import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { StagedUserService } from './staged-user.service';
import { StagedUser } from './staged-user.schema';

describe('StagedUserService', () => {
  let service: StagedUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StagedUserService,
        {
          provide: getModelToken(StagedUser.name),
          useValue: jest.mock('./StagedUser'),
        },
      ],
    }).compile();

    service = module.get<StagedUserService>(StagedUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
