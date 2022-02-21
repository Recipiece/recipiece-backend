import { Test, TestingModule } from '@nestjs/testing';
import { CommonIngredientNameService } from './common-ingredient-name.service';

describe('CommonIngredientNameService', () => {
  let service: CommonIngredientNameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonIngredientNameService],
    }).compile();

    service = module.get<CommonIngredientNameService>(CommonIngredientNameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
