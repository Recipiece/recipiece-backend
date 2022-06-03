import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma';
import { UserPermissionsService } from './user-permissions.service';

describe('UserPermissionsService', () => {
  let service: UserPermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPermissionsService, PrismaService],
    }).compile();

    service = module.get<UserPermissionsService>(UserPermissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
