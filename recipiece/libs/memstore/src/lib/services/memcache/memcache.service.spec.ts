import { Test, TestingModule } from '@nestjs/testing';
import { MemcacheService } from './memcache.service';

describe('MemcacheService', () => {
  let service: MemcacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemcacheService],
    }).compile();

    service = module.get<MemcacheService>(MemcacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
