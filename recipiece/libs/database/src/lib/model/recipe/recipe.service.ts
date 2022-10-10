import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseModelService } from '../base-model-service';

@Injectable()
export class RecipeService extends BaseModelService<'recipe'> {
  // private readonly INCUDE_CLAUSE = {
  //   sections: {
  //     include: {
  //       ingredients: true,
  //       steps: true,
  //     },
  //   },
  // };

  constructor(prisma: PrismaService) {
    super(prisma, 'recipe');
  }

  // public async getById(id: number): Promise<Recipiece.Recipe> {
  //   return this.prisma.recipe.findFirst({
  //     where: {
  //       id: id,
  //     },
  //     include: this.INCUDE_CLAUSE,
  //   });
  // }

  // public async create(owner: number, model: Partial<Recipiece.Recipe>): Promise<Recipiece.Recipe> {
  //   // create the recipe
  //   const createdRecipe = await this.prisma.recipe.create({
  //     data: {
  //       name: model.name,
  //       description: model.description,
  //       private: !!model.private,
  //       tags: model.tags || [],
  //       advanced_config: model.advanced_config || {},
  //       owner_id: owner,
  //     },
  //   });

  //   // create the section and attach it to the recipe
  //   const createSectionPromises = (model.sections || []).map((s) => {
  //     return this.prisma.recipeSection.create({
  //       data: {
  //         name: s.name,
  //         recipe_id: createdRecipe.id,
  //       },
  //     });
  //   });

  //   const createdSections = await Promise.all(createSectionPromises);

  //   // create the steps and ings and attach it to the section
  //   const createIngsPromises = model.sections.map((section, sectionIndex) => {
  //     const ingsToCreate = section.ingredients.map((ing) => {
  //       return this.prisma.recipeIngredient.create({
  //         data: {
  //           name: ing.name,
  //           amount: ing.amount,
  //           unit: ing.unit,
  //           content: ing.content,
  //           recipe_section_id: createdSections[sectionIndex].id,
  //         },
  //       });
  //     });
  //     return Promise.all(ingsToCreate);
  //   });
  //   const createdIngredients = await Promise.all(createIngsPromises);

  //   const createStepsPromises = model.sections.map((section, sectionIndex) => {
  //     const stepsToCreate = section.steps.map((step) => {
  //       return this.prisma.recipeStep.create({
  //         data: {
  //           content: step.content,
  //           time_ms: step.time_ms,
  //           recipe_section_id: createdSections[sectionIndex].id,
  //         },
  //       });
  //     });
  //     return Promise.all(stepsToCreate);
  //   });
  //   const createdSteps = await Promise.all(createStepsPromises);

  //   return {
  //     id: createdRecipe.id,
  //     name: createdRecipe.name,
  //     description: createdRecipe.description,
  //     private: createdRecipe.private,
  //     advanced_config: createdRecipe.advanced_config,
  //     tags: createdRecipe.tags,
  //     sections: createdSections.map((section, sectionIndex) => {
  //       return {
  //         id: section.id,
  //         name: section.name,
  //         ingredients: createdIngredients[sectionIndex].map((createdIng) => {
  //           return {
  //             id: createdIng.id,
  //             name: createdIng.name,
  //             amount: createdIng.amount,
  //             unit: createdIng.unit,
  //             content: createdIng.content,
  //           };
  //         }),
  //         steps: createdSteps[sectionIndex].map((createdStep) => {
  //           return {
  //             id: createdStep.id,
  //             content: createdStep.content,
  //             time_ms: createdStep.time_ms,
  //           };
  //         }),
  //       };
  //     }),
  //   };
  // }

  // public async update(id: number, model: Partial<Recipiece.Recipe>): Promise<Recipiece.Recipe> {
  //   const recipe = await this.prisma.recipe.update({
  //     where: {
  //       id: id,
  //     },
  //     data: {
  //       name: model.name,
  //       description: model.description,
  //       tags: model.tags || [],
  //       advanced_config: model.advanced_config || {},
  //       private: model.private || false,
  //     },
  //   });

  //   const dbRecipe = await this.prisma.recipe.findFirst({
  //     where: {
  //       id: id,
  //     },
  //     include: {
  //       sections: {
  //         include: {
  //           ingredients: true,
  //           steps: true,
  //         },
  //       },
  //     },
  //   });

  //   const sectionsInEntity = new BetterSet(model.sections as Recipiece.RecipeSection[]);
  //   const sectionsInDb = new BetterSet(dbRecipe.sections as Recipiece.RecipeSection[]);

  //   const sectionsToDelete = [...sectionsInDb.difference(sectionsInEntity, (s) => s.id)];

  //   if (sectionsToDelete.length > 0) {
  //     await this.prisma.recipeSection.deleteMany({
  //       where: {
  //         id: {
  //           in: sectionsToDelete.map((s) => s.id),
  //         },
  //       },
  //     });
  //   }

  //   const sectionsToCreate = [...sectionsInEntity.difference(sectionsInDb, (s) => s.id)];

  //   const createSectionPromises = (model.sections || []).map((s) => {
  //     return this.prisma.recipeSection.create({
  //       data: {
  //         name: s.name,
  //         recipe_id: recipe.id,
  //       },
  //     });
  //   });    

  //   // const updatedSections = await this.updateRecipeSections(recipe.id, model.sections);

  //   // return {
  //   //   ...recipe,
  //   //   sections: [...updatedSections],
  //   // };
  // }

  // private async updateRecipeSections(
  //   recipeId: number,
  //   sections: Recipiece.RecipeSection[]
  // ): Promise<Recipiece.RecipeSection[]> {
  //   const sectionUpdater = new RecipeSectionUpdater(recipeId, this.prisma);
  //   const updatedSections = await sectionUpdater.update(sections, 'recipeSection');

  //   const sectionsRet: Recipiece.RecipeSection[] = [];

  //   for (let i = 0; i < updatedSections.length; i++) {
  //     const updatedSection = updatedSections[i];
  //     const rawSection = sections[i];

  //     const ingredientUpdater = new RecipeIngredientUpdater(updatedSection, this.prisma);
  //     const stepUpdater = new RecipeStepUpdater(updatedSection, this.prisma);

  //     const updatedIngredients = await ingredientUpdater.update(rawSection.ingredients, 'recipeIngredient');
  //     const updatedSteps = await stepUpdater.update(rawSection.steps, 'recipeStep');

  //     sectionsRet.push({
  //       ...updatedSection,
  //       ingredients: updatedIngredients,
  //       steps: updatedSteps,
  //     });
  //   }

  //   return sectionsRet;
  // }

  // public async delete(id: number) {
  //   return await this.prisma.recipe.delete({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }

  // public async list(
  //   cursor: number,
  //   where?: Prisma.RecipeWhereInput,
  //   orderBy: Prisma.RecipeOrderByWithRelationInput = { name: 'asc' }
  // ): Promise<PagedResponse<Recipiece.Recipe>> {
  //   const findCriteria: Prisma.RecipeFindManyArgs = {
  //     where: { ...(where || {}) },
  //     take: DB_PAGE_SIZE,
  //     orderBy: { ...(orderBy || {}) },
  //     include: this.INCUDE_CLAUSE,
  //   };

  //   if (cursor !== null && cursor !== undefined) {
  //     findCriteria.cursor = {
  //       id: cursor,
  //     };
  //     findCriteria.skip = 1;
  //   }

  //   const recipes = await this.prisma.recipe.findMany(findCriteria);
  //   if (recipes.length > 0) {
  //     return {
  //       data: recipes as unknown as Recipiece.Recipe[],
  //       next: recipes[recipes.length - 1].id,
  //     };
  //   } else {
  //     return {
  //       data: [],
  //     };
  //   }
  // }
}
