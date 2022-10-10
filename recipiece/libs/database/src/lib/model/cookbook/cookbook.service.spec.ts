import { Test, TestingModule } from '@nestjs/testing';
import { Cookbook, Prisma, Recipe, User } from '@prisma/client';
import { DB_PAGE_SIZE } from '../../constants';
import { PrismaService } from '../../prisma/prisma.service';
import { CookbookService } from './cookbook.service';

describe('CookbookService', () => {
  let service: CookbookService;
  let prisma: PrismaService;

  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CookbookService, PrismaService],
    }).compile();

    service = module.get<CookbookService>(CookbookService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    user = await prisma.user.create({
      data: {
        email: 'test-cookbooks@user.com',
        preferences: {},
      },
    });
  });

  afterEach(async () => {
    await prisma.recipeCookbookMembership.deleteMany();
    await prisma.cookbook.deleteMany();
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get', () => {
    it('should be able to get a cookbook by id', async () => {
      const cookbook = await prisma.cookbook.create({
        data: {
          name: 'test cookbook',
          description: 'a test cookbook',
          owner_id: user.id,
        },
      });

      const fetchedBook = await service.getById(cookbook.id);

      expect(fetchedBook).toBeTruthy();
      expect(fetchedBook.name).toEqual(cookbook.name);
      expect(fetchedBook.description).toEqual(cookbook.description);
    });
  });

  describe('Create', () => {
    it('should be able to create a cookbook', async () => {
      const expectedBody = {
        name: 'test cookbook',
        description: 'a really cool cookbook',
      };

      const cookbook = await service.create(user.id, expectedBody);

      expect(cookbook).toBeTruthy();
      expect(cookbook.description).toEqual(expectedBody.description);
      expect(cookbook.name).toEqual(expectedBody.name);
    });

    it('should not set an explicit created_at', async () => {});

    it('should not set an explicit owner_id', async () => {});
  });

  describe('Update', () => {
    it('should be able to update a cookbook', async () => {
      const cookbook = await prisma.cookbook.create({
        data: {
          name: 'test cookbook',
          description: 'a test cookbook',
          owner_id: user.id,
        },
      });

      const updateBody = {
        name: 'an updated name',
        description: 'an updated description',
      };

      const updatedCookbook = await service.update(cookbook.id, updateBody);

      expect(updatedCookbook.name).toEqual(updateBody.name);
      expect(updatedCookbook.description).toEqual(updateBody.description);

      const dbCookbook = await prisma.cookbook.findUnique({ where: { id: cookbook.id } });
      expect(dbCookbook).toBeTruthy();
      expect(dbCookbook.name).toEqual(updateBody.name);
      expect(dbCookbook.description).toEqual(updateBody.description);
    });

    it('should not update owner_id', async () => {
      const cookbook = await prisma.cookbook.create({
        data: {
          name: 'test cookbook',
          description: 'a test cookbook',
          owner_id: user.id,
        },
      });

      const expectedOwnerId = cookbook.owner_id;

      const updatedCookbook = await service.update(cookbook.id, { owner_id: expectedOwnerId + 1 });
      expect(updatedCookbook.owner_id).toEqual(expectedOwnerId);

      const dbCookbook = await prisma.cookbook.findUnique({ where: { id: cookbook.id } });
      expect(dbCookbook).toBeTruthy();
      expect(dbCookbook.owner_id).toEqual(expectedOwnerId);
    });

    it('should not update created_at', async () => {
      const cookbook = await prisma.cookbook.create({
        data: {
          name: 'test cookbook',
          description: 'a test cookbook',
          owner_id: user.id,
        },
      });

      const expectedCreatedAt = cookbook.created_at;
      const badCreatedAt = new Date(expectedCreatedAt.getTime() + 30 * 60000);

      const updatedCookbook = await service.update(cookbook.id, { created_at: badCreatedAt });
      expect(updatedCookbook.created_at).toEqual(expectedCreatedAt);

      const dbCookbook = await prisma.cookbook.findUnique({ where: { id: cookbook.id } });
      expect(dbCookbook).toBeTruthy();
      expect(dbCookbook.created_at).toEqual(expectedCreatedAt);
    });
  });

  describe('List', () => {
    it('should list cookbooks', async () => {
      const cbData = new Array(50).fill(0).map((_, idx) => {
        return {
          owner_id: user.id,
          name: `Cookbook ${idx}`,
          description: `Test cookbook ${idx}`,
        };
      });

      await prisma.cookbook.createMany({ data: cbData });

      const dbCookbooks = await prisma.cookbook.findMany({ take: DB_PAGE_SIZE });
      expect(dbCookbooks.length).toEqual(cbData.length);

      const listedCookbooks = await service.list();

      expect(listedCookbooks.length).toEqual(cbData.length);
    });

    it('should list with a query', async () => {
      const cbData: Prisma.CookbookCreateManyInput[] = new Array(50).fill(0).map((_, idx) => {
        return {
          owner_id: user.id,
          name: `Cookbook ${idx}`,
          description: `Test cookbook ${idx}`,
        };
      });

      await prisma.cookbook.createMany({
        data: cbData,
      });

      const listedCookbooks = await service.list({
        name: {
          contains: '5',
        },
      });

      const expectedCookbooks = cbData.filter((cb) => cb.name.includes('5'));

      expect(listedCookbooks.length).toEqual(expectedCookbooks.length);
    });

    it('should page cookbooks', async () => {
      const cbData: Prisma.CookbookCreateManyInput[] = new Array(DB_PAGE_SIZE + 20).fill(0).map((_, idx) => {
        return {
          owner_id: user.id,
          name: `Cookbook ${idx}`,
          description: `Test cookbook ${idx}`,
        };
      });

      await prisma.cookbook.createMany({
        data: cbData,
      });

      const firstPage = await service.list();

      expect(firstPage.length).toEqual(DB_PAGE_SIZE);

      const secondPage = await service.list(null, firstPage[firstPage.length - 1].id);
      expect(secondPage.length).toEqual(20);
    });
  });

  describe('List Recipes', () => {
    afterEach(async () => {
      await prisma.recipe.deleteMany();
    });

    it('should list recipes for a coobook', async () => {
      // create cookbook and recipes
      const recipeData: Prisma.RecipeCreateManyInput[] = new Array(20).fill(0).map((_, idx) => {
        return {
          name: `Test recipe ${idx}`,
          owner_id: user.id,
          description: `Test recipe ${idx}`,
          private: false,
        };
      });

      const createdRecipes = await prisma.$transaction(recipeData.map((r) => prisma.recipe.create({ data: r })));

      const cookbook = await prisma.cookbook.create({
        data: {
          name: 'Test List Cookbook',
          description: 'List recipes cookbook',
          owner_id: user.id,
        },
      });

      // create attachments
      await prisma.$transaction(
        createdRecipes.map((r) => {
          return prisma.recipeCookbookMembership.create({
            data: {
              recipe_id: r.id,
              cookbook_id: cookbook.id,
            },
          });
        })
      );

      // get the recipes
      const bookRecipes = await service.listRecipes(cookbook.id);
      expect(bookRecipes.data.length).toEqual(createdRecipes.length);
    });

    fit('should populate sections, ingredients, and steps on fetched recipes', async () => {
      const recipe: Prisma.RecipeCreateInput = {
        name: 'test recipe',
        description: 'populate me, daddy',
        private: false,
        owner: {
          connect: {
            id: user.id,
          },
        },
        sections: {
          create: {
            name: 'test section',
            steps: {
              create: {
                content: 'a test step',
                time_ms: 1,
              },
            },
            ingredients: {
              create: {
                name: 'water',
                unit: 'cup',
                amount: '1/2',
              },
            },
          },
        },
      };

      const createdRecipe = await prisma.recipe.create({ data: recipe });

      const cookbook = await prisma.cookbook.create({
        data: {
          name: 'Test List Cookbook',
          description: 'List recipes cookbook',
          owner_id: user.id,
        },
      });

      await prisma.recipeCookbookMembership.create({
        data: {
          recipe_id: createdRecipe.id,
          cookbook_id: cookbook.id,
        },
      });

      const bookRecipes = await service.listRecipes(cookbook.id);

      expect(bookRecipes.data.length).toEqual(1);

      const bookRecipe = bookRecipes.data[0];
      expect(bookRecipe.sections.length).toEqual(1);

      const recipeSection = bookRecipe.sections[0];

      expect(recipeSection.ingredients.length).toEqual(1);
      expect(recipeSection.steps.length).toEqual(1);
    });

    it('should return no recipes for an empty cookbook', async () => {
      const cookbook = await prisma.cookbook.create({
        data: {
          name: 'Test List Cookbook',
          description: 'List recipes cookbook',
          owner_id: user.id,
        },
      });

      await prisma.recipe.create({
        data: {
          name: 'unattached',
          description: 'no touch',
          owner_id: user.id,
          private: false,
        },
      });

      const bookRecipes = await service.listRecipes(cookbook.id);
      expect(bookRecipes.data.length).toEqual(0);
    });

    it('should page recipes attached to a cookbook', async () => {
      const recipeData: Prisma.RecipeCreateManyInput[] = new Array(DB_PAGE_SIZE + 20).fill(0).map((_, idx) => {
        return {
          name: `Test recipe ${idx}`,
          owner_id: user.id,
          description: `Test recipe ${idx}`,
          private: false,
        };
      });

      const createdRecipes = await prisma.$transaction(recipeData.map((r) => prisma.recipe.create({ data: r })));

      const cookbook = await prisma.cookbook.create({
        data: {
          name: 'Test List Cookbook',
          description: 'List recipes cookbook',
          owner_id: user.id,
        },
      });

      await prisma.recipeCookbookMembership.createMany({
        data: createdRecipes.map((r) => {
          return {
            recipe_id: r.id,
            cookbook_id: cookbook.id,
          };
        }),
      });

      const firstPage = await service.listRecipes(cookbook.id);
      expect(firstPage.data.length).toEqual(DB_PAGE_SIZE);
      expect(firstPage.next).toBeTruthy();

      const secondPage = await service.listRecipes(cookbook.id, null, firstPage.next);
      expect(secondPage.data.length).toEqual(20);
    });

    it('should allow recipes in a cookbook to be queried', async () => {
      const recipeData: Prisma.RecipeCreateManyInput[] = new Array(50).fill(0).map((_, idx) => {
        return {
          name: `Test recipe ${idx}`,
          owner_id: user.id,
          description: `Test recipe ${idx}`,
          private: false,
        };
      });

      const createdRecipes = await prisma.$transaction(recipeData.map((r) => prisma.recipe.create({ data: r })));

      const cookbook = await prisma.cookbook.create({
        data: {
          name: 'Test List Cookbook',
          description: 'List recipes cookbook',
          owner_id: user.id,
        },
      });

      await prisma.recipeCookbookMembership.createMany({
        data: createdRecipes.map((r) => {
          return {
            recipe_id: r.id,
            cookbook_id: cookbook.id,
          };
        }),
      });

      const queried = await service.listRecipes(cookbook.id, {
        name: {
          contains: '5',
        },
      });

      const expectedResults = recipeData.filter((r) => r.name.includes('5'));

      expect(queried.data.length).toEqual(expectedResults.length);
    });
  });

  describe('Attach Recipes', () => {
    let recipe1: Recipe;
    let recipe2: Recipe;

    beforeEach(async () => {
      recipe1 = await prisma.recipe.create({
        data: {
          name: 'test recipe 1',
          owner_id: user.id,
          description: 'a first test recipe',
          private: false,
        },
      });

      recipe2 = await prisma.recipe.create({
        data: {
          name: 'test recipe 2',
          owner_id: user.id,
          description: 'a second test recipe',
          private: false,
        },
      });
    });

    it('should attach recipes', async () => {
      const cookbook = await prisma.cookbook.create({
        data: {
          name: 'test cookbook',
          description: 'a test cookbook',
          owner_id: user.id,
        },
      });

      await service.attachRecipes(cookbook.id, [recipe1.id, recipe2.id]);

      const attachments = await prisma.recipeCookbookMembership.findMany({
        where: {
          cookbook_id: cookbook.id,
        },
      });

      expect(attachments.length).toEqual(2);

      const attachedRecipeIds = attachments.map((a) => a.recipe_id);
      expect(attachedRecipeIds).toContain(recipe1.id);
      expect(attachedRecipeIds).toContain(recipe2.id);
    });

    it('should not attach duplicate recipes', async () => {
      const cookbook = await prisma.cookbook.create({
        data: {
          name: 'test cookbook',
          description: 'a test cookbook',
          owner_id: user.id,
        },
      });

      await service.attachRecipes(cookbook.id, [recipe1.id, recipe2.id]);

      let attachments = await prisma.recipeCookbookMembership.findMany({
        where: {
          cookbook_id: cookbook.id,
        },
      });

      expect(attachments.length).toEqual(2);

      try {
        await service.attachRecipes(cookbook.id, [recipe1.id]);
        fail();
      } catch {
        //
      }

      attachments = await prisma.recipeCookbookMembership.findMany({
        where: {
          cookbook_id: cookbook.id,
        },
      });

      expect(attachments.length).toEqual(2);
    });
  });

  describe('Detach Recipes', () => {
    it('should detach recipes', async () => {
      
    });

    it('should do nothing when detaching a recipe not on the cookbook', async () => {

    });
  });
});
