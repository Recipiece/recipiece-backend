import { Test, TestingModule } from '@nestjs/testing';
import { CookbooksController } from './cookbooks.controller';

describe('CoobookController', () => {
  let controller: CookbooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CookbooksController],
    }).compile();

    controller = module.get<CookbooksController>(CookbooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create', () => {

  })

  describe('Update', () => {

  })

  describe('Delete', () => {

  })

  describe('List', () => {

  })

  describe('List Recipes', () => {

  })
});
