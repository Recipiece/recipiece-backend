import { Test, TestingModule } from '@nestjs/testing';
import { ForgotPasswordTokenService } from './forgot-password-token.service';

describe('ForgotPasswordTokenService', () => {
  let service: ForgotPasswordTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForgotPasswordTokenService],
    }).compile();

    service = module.get<ForgotPasswordTokenService>(ForgotPasswordTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
