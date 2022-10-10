import { Test, TestingModule } from '@nestjs/testing';
import { RecipeProcessorService } from './recipe-processor.service';

describe('RecipeProcessorService', () => {
  let service: RecipeProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeProcessorService],
    }).compile();

    service = module.get<RecipeProcessorService>(RecipeProcessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
