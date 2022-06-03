import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DatabaseModule, PrismaService, UserLoginService, UserPermissionsService, UserService } from '@recipiece/database';
import { MemstoreModule, PubsubService } from '@recipiece/memstore';
import { StagedUsersController } from './staged-users.controller';

describe('StagedUsersController', () => {
  let controller: StagedUsersController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StagedUsersController],
      imports: [DatabaseModule, MemstoreModule],
      providers: [UserService, UserLoginService, UserPermissionsService, PubsubService, PrismaService],
    }).compile();

    controller = module.get<StagedUsersController>(StagedUsersController);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  beforeEach(async () => {
    await prisma.stagedUser.deleteMany();
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  describe('Stage', () => {
    it('should stage a user', async () => {
      const [email, password] = ['test@asdf.qwer', 'asdfqwer'];

      await controller.stageUser({ email, password });

      const staged = await prisma.stagedUser.findUnique({
        where: {
          email: email,
        },
      });

      expect(staged).toBeTruthy();
    });

    it('should not stage a user with an already staged email', async () => {
      const [email, password] = ['test@asdf.qwer', 'asdfqwer'];

      await controller.stageUser({ email, password });

      try {
        await controller.stageUser({ email, password: 'differentPassword' });
        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(ConflictException);
      }

      const staged = await prisma.stagedUser.findUnique({
        where: {
          email: email,
        },
      });

      expect(staged).toBeTruthy();
    });

    it('should not stage a user with an already registered email', async () => {
      const [email, password] = ['test@asdf.qwer', 'asdfqwer'];
      await prisma.user.create({
        data: {
          email: email,
          preferences: {},
        },
      });

      try {
        await controller.stageUser({ email, password });
        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(ConflictException);
      }

      const staged = await prisma.stagedUser.findUnique({
        where: {
          email: email,
        },
      });

      expect(staged).toBeFalsy();
    });
  });
});
