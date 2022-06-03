import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma';
import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;
  let prisma: PrismaService;
  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeService, PrismaService],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
    prisma = module.get(PrismaService);
  });

  beforeEach(async () => {
    await prisma.recipe.deleteMany();
    await prisma.user.deleteMany();
  });

  beforeEach(async () => {
    user = await prisma.user.create({
      data: {
        email: 'test@asdf.qwer',
        preferences: {},
      },
    });
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  function getTestRecipe(): Recipiece.Recipe {
    return {
      name: 'test recipe',
      description: 'a recipe for testing',
      private: true,
      advanced_config: {},
      tags: [],
      sections: [
        {
          name: 'section 1',
          ingredients: [
            {
              name: 'flour',
              amount: '1/2',
              unit: 'cup',
            },
          ],
          steps: [
            {
              content: "step one content in section one. There's a lot to do here, clearly",
              time_ms: 20 * 60 * 1000,
            },
          ],
        },
        {
          name: 'section 2',
          ingredients: [
            {
              name: 'water',
              amount: '3.5775',
              unit: 'ounces',
            },
            {
              name: 'chicken',
              amount: '12',
              unit: 'lbs',
            },
          ],
          steps: [
            {
              content: 'boil that bad boy',
              time_ms: 1,
            },
          ],
        },
      ],
    };
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('should create a recipe', async () => {
      const recipeBody = getTestRecipe();
      const createdRecipe = await service.create(user.id, recipeBody);

      expect(createdRecipe.id).toBeTruthy();
      expect(createdRecipe.owner_id).toEqual(user.id);
      expect(createdRecipe.description).toEqual(recipeBody.description);
      expect(createdRecipe.name).toEqual(recipeBody.name);

      // @ts-ignore
      expect(createdRecipe.sections.length).toEqual(recipeBody.sections.length);

      createdRecipe.sections.forEach((createdSection, index) => {
        const expectedSection = recipeBody.sections[index];
        expect(createdSection.id).toBeTruthy();
        expect(createdSection.name).toEqual(expectedSection.name);

        expect(createdSection.ingredients.length).toEqual(expectedSection.ingredients.length);
        createdSection.ingredients.forEach((createdIng, ingIndex) => {
          expect(createdIng.id).toBeTruthy();
          expect(createdIng.recipe_section_id).toEqual(createdSection.id);

          const expectedIngredient = recipeBody.sections[index].ingredients[ingIndex];
          expect(createdIng.name).toEqual(expectedIngredient.name);
          expect(createdIng.amount).toEqual(expectedIngredient.amount);
          expect(createdIng.unit).toEqual(expectedIngredient.unit);
        });

        expect(createdSection.steps.length).toEqual(expectedSection.steps.length);
        createdSection.steps.forEach((createdStep, stepIndex) => {
          expect(createdStep.id).toBeTruthy();
          expect(createdStep.recipe_section_id).toEqual(createdSection.id);

          const expectedStep = recipeBody.sections[index].steps[stepIndex];
          expect(createdStep.content).toEqual(expectedStep.content);
          expect(createdStep.time_ms).toEqual(expectedStep.time_ms);
        });
      });
    });

    it('should create recipe sections', async () => {
      const testRecipe = getTestRecipe();

      const createdRecipe = await service.create(user.id, testRecipe);
      
      const sections = await prisma.recipeSection.findMany();
      
      expect(sections.length).toEqual(testRecipe.sections.length);
      
      for(const section of sections) {
        expect(section.recipe_id).toEqual(createdRecipe.id);
        const matchingSection = testRecipe.sections.filter((s) => s.id === section.id)[0];

        expect(section.name).toEqual(matchingSection.name);
      }
    });

    it('should create recipe ingredients', async () => {
      const testRecipe = getTestRecipe();

      const createdRecipe = await service.create(user.id, testRecipe);
      
      const createdIngredients = await prisma.recipeIngredient.findMany();
      
      for(const createdIngredient of createdIngredients) {
        
      }
    });

    it('should create recipe steps', async () => {});
  });

  describe('Update', () => {
    it('should update a recipe', async () => {
      const recipeBody = getTestRecipe();
      const createdRecipe = await service.create(user.id, recipeBody);

      const updateBody = { ...createdRecipe };
      updateBody.name = 'updated name';
      updateBody.description = 'updated description';
      updateBody.sections = [{ ...updateBody.sections[1] }];

      const updatedRecipe = await service.update(createdRecipe.id, updateBody);

      expect(updatedRecipe.name).toEqual(updateBody.name);
      expect(updatedRecipe.description).toEqual(updateBody.description);
      expect(updatedRecipe.sections.length).toEqual(updateBody.sections.length);
    });

    it('should remove non-included sections', async () => {
      const originalRecipeBody = getTestRecipe();
      const createdRecipe = await service.create(user.id, recipeBody);

      const updateBody = { ...createdRecipe };
      updateBody.sections = [{ ...updateBody.sections[1] }];

      const updatedRecipe = await service.update(updateBody.id, updateBody);

      const removedSectionBody = updateBody.sections[0];
      const allSections = await prisma.recipeSection.findMany();

      expect(allSections.length).toEqual(updatedRecipe.sections.length);
    });

    it('should update included sections', async () => {});

    it('should create new sections', async () => {});

    it('should remove non-included ingredients', async () => {});

    it('should update included ingredients', async () => {});

    it('should create new ingredients', async () => {});

    it('should remove non-included steps', async () => {});

    it('should update included steps', async () => {});

    it('should create new steps', async () => {});
  });

  describe('Delete', () => {
    it('should delete a recipe', async () => {});

    it('should delete recipe sections', async () => {});

    it('should delete recipe ingredients', async () => {});

    it('should delete recipe steps', async () => {});
  });
});
