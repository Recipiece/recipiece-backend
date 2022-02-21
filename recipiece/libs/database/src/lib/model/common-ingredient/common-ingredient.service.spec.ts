import { Test, TestingModule } from '@nestjs/testing';
import { CommonIngredientService } from './common-ingredient.service';

describe('CommonIngredientService', () => {
  let service: CommonIngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonIngredientService],
    }).compile();

    service = module.get<CommonIngredientService>(CommonIngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
