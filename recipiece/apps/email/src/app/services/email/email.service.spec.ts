import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';

describe('EmailController', () => {
  let controller: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService],
    }).compile();

    controller = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
