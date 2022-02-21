import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListGateway } from './shopping-list.gateway';

describe('ShoppingListGateway', () => {
  let gateway: ShoppingListGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingListGateway],
    }).compile();

    gateway = module.get<ShoppingListGateway>(ShoppingListGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
