import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, User } from '@prisma/client';
import { DatabaseModule, PrismaService, SessionService, UserLoginService, UserService } from '@recipiece/database';
import { AuthRequest } from '@recipiece/middleware';
import { encryptPassword } from '../../api';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UserService;
  let userLoginService: UserLoginService;
  let prisma: PrismaService;

  async function setupUser(email: string, password: string): Promise<User> {
    const user = await userService.create({
      email: email,
    });

    const pwBundle = await encryptPassword(password);
    await userLoginService.create(user.id, {
      password_hash: pwBundle.password,
      nonce: pwBundle.nonce,
      salt: pwBundle.salt,
    });

    return user;
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [DatabaseModule],
      providers: [UserService, UserLoginService, SessionService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);

    userService = module.get(UserService);
    userLoginService = module.get(UserLoginService);
    prisma = module.get(PrismaService);
  });

  beforeEach(async () => {
    await prisma.$connect();
  })

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Login', () => {
    it('should allow a successful login', async () => {
      const username = 'test@asdf.qwer';
      const password = 'password';

      const user = await setupUser(username, password);

      const response = await controller.loginUser({
        name: username,
        password: password,
      });

      expect(response.token).toBeTruthy();
      expect(response.user).toBeTruthy();

      expect(response.user.email).toEqual(user.email);
      expect(response.user.id).toEqual(user.id);

      const sessions = await prisma.session.findMany({
        where: {
          owner_id: user.id,
        },
      });

      expect(sessions.length).toEqual(1);
    });

    it('should prevent a wrong password from logging in', async () => {
      const username = 'test@asdf.qwer';
      const password = 'password';

      const user = await setupUser(username, password);

      try {
        await controller.loginUser({
          name: username,
          password: 'password1',
        });
      } catch (e) {
        expect(e).toBeInstanceOf(ForbiddenException);
      }

      const sessions = await prisma.session.findMany({
        where: {
          owner_id: user.id,
        },
      });

      expect(sessions.length).toEqual(0);
    });

    it('should prevent an unknown email from logging in', async () => {
      const username = 'test@asdf.qwer';
      const password = 'password';

      const user = await setupUser(username, password);

      try {
        await controller.loginUser({
          name: 'unknown@asdf.qwer',
          password: password,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(ForbiddenException);
      }

      const sessions = await prisma.session.findMany({
        where: {
          owner_id: user.id,
        },
      });

      expect(sessions.length).toEqual(0);
    });
  });

  describe('Logout', () => {
    it('should delete the request session', async () => {
      const username = 'test@asdf.qwer';
      const password = 'password';

      const user = await setupUser(username, password);

      await controller.loginUser({
        name: username,
        password: password,
      });

      let sessions = await prisma.session.findMany({
        where: {
          owner_id: user.id,
        },
      });

      expect(sessions.length).toEqual(1);

      const session = sessions[0];

      await controller.logoutUser({
        session: {
          id: session.id,
        },
      } as AuthRequest);

      sessions = await prisma.session.findMany({
        where: {
          owner_id: user.id,
        },
      });

      expect(sessions.length).toEqual(0);
    });
  });
});
