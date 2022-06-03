import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma';
import { CommonIngredientService } from './common-ingredient.service';

describe('CommonIngredientService', () => {
  let service: CommonIngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonIngredientService, PrismaService],
    }).compile();

    service = module.get<CommonIngredientService>(CommonIngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
