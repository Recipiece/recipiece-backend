import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule, ForgotPasswordService, PrismaService, SessionService, UserService } from '@recipiece/database';
import { MemstoreModule, PubsubService } from '@recipiece/memstore';
import { PasswordController } from './password.controller';

describe('PasswordController', () => {
  let controller: PasswordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordController],
      imports: [DatabaseModule, MemstoreModule],
      providers: [ForgotPasswordService, SessionService, UserService, PubsubService, PrismaService],
    }).compile();

    controller = module.get<PasswordController>(PasswordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
