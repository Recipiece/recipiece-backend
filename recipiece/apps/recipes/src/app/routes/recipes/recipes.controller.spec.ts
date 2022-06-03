import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule, PrismaService, RecipeService } from '@recipiece/database';
import { RecipesController } from './recipes.controller';

describe('RecipesController', () => {
  let controller: RecipesController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipesController],
      imports: [DatabaseModule],
      providers: [RecipeService, PrismaService],
    }).compile();

    controller = module.get<RecipesController>(RecipesController);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create', () => {});

  describe('Update', () => {});

  describe('Delete', () => {});

  describe('List', () => {});
});
