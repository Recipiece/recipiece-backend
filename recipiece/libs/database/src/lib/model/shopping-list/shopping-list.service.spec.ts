import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma';
import { ShoppingListService } from './shopping-list.service';

describe('ShoppingListService', () => {
  let service: ShoppingListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingListService, PrismaService],
    }).compile();

    service = module.get<ShoppingListService>(ShoppingListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
