import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CookbookService } from './cookbook.service';

describe('CookbookService', () => {
  let service: CookbookService;
  let prisma: PrismaService;

  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CookbookService, PrismaService],
    }).compile();

    service = module.get<CookbookService>(CookbookService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    user = await prisma.user.create({
      data: {
        email: 'test@user.com',
        preferences: {},
      },
    });
  });

  afterEach(async () => {
    await prisma.cookbook.deleteMany();
    await prisma.user.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get', () => {
    it('should be able to get a cookbook by id', async () => {
      const cookbook = await prisma.cookbook.create({
        data: {
          name: 'test cookbook',
          description: 'a test cookbook',
          owner_id: user.id,
        },
      });

      const fetchedBook = await service.getById(cookbook.id);

      expect(fetchedBook).toBeTruthy();
      expect(fetchedBook.name).toEqual(cookbook.name);
      expect(fetchedBook.description).toEqual(cookbook.description);
    });
  });

  describe('Create', () => {
    it('should be able to create a cookbook', async () => {
      const expectedBody = {
        name: 'test cookbook',
        description: 'a really cool cookbook',
      };

      const cookbook = await service.create(user.id, expectedBody);

      expect(cookbook).toBeTruthy();
      expect(cookbook.description).toEqual(expectedBody.description);
      expect(cookbook.name).toEqual(expectedBody.name);
    });
  });

  describe('Update', () => {
    it('should be able to update a cookbook', async () => {
      const cookbook = await prisma.cookbook.create({
        data: {
          name: 'test cookbook',
          description: 'a test cookbook',
          owner_id: user.id,
        },
      });

      const updatedCookbook = await service.update(cookbook.id, {
        name: 'an updated name',
        description: 'an updated description',
      });
    });
  });

  describe('List For User', () => {});

  describe('List Recipes', () => {
    
  });
});
