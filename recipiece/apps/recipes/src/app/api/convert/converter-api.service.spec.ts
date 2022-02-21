import { Test, TestingModule } from '@nestjs/testing';
import { ConverterApiService } from './converter-api.service';

describe('ConverterApiService', () => {
  let service: ConverterApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConverterApiService],
    }).compile();

    service = module.get<ConverterApiService>(ConverterApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
