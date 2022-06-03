import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma';
import { ForgotPasswordService } from './forgot-password.service';

describe('ForgotPasswordService', () => {
  let service: ForgotPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForgotPasswordService, PrismaService],
    }).compile();

    service = module.get<ForgotPasswordService>(ForgotPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
