import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule, Measure, PrismaService } from '@recipiece/database';
import { ConverterApiService } from './converter-api.service';

describe('ConverterApiService', () => {
  let service: ConverterApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConverterApiService, PrismaService],
      imports: [DatabaseModule],
    }).compile();

    service = module.get<ConverterApiService>(ConverterApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Same Category Conversion', () => {
    it('should convert same unit categories', () => {
      const m1: Measure = {
        abbrs: ['gg', 'ggs'],
        name_s: 'goog',
        name_p: 'googs',
        category: 'v',
        factor: 15.3315,
        id: 1,
        prefer_fractions: false,
      };

      const m2: Measure = {
        abbrs: ['h', 'hp'],
        name_s: 'hoopla',
        name_p: 'hooplas',
        category: 'v',
        factor: 0.9981,
        id: 2,
        prefer_fractions: false,
      };

      const originalAmountGoogs = 17.223;
      const actualAmountHooplas = service.convertSameUnitCategories(originalAmountGoogs, m1, m2);

      const expectedAmountHooplas = originalAmountGoogs * (m2.factor / m1.factor);

      expect(actualAmountHooplas).toBeCloseTo(expectedAmountHooplas, 2);
    });
  })
});
