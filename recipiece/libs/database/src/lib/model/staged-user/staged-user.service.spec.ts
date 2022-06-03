import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma';
import { StagedUserService } from './staged-user.service';

describe('StagedUserService', () => {
  let service: StagedUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StagedUserService, PrismaService],
    }).compile();

    service = module.get<StagedUserService>(StagedUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
