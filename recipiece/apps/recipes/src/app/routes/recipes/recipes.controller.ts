import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { BetterSet, Utils } from '@recipiece/common';
import {
  RecipeIngredientService,
  RecipeSectionService,
  RecipeService,
  RecipeStepService,
  Recipiece,
} from '@recipiece/database';
import { AuthenticationGuard, AuthRequest } from '@recipiece/middleware';
import fetch from 'cross-fetch';
import { getCursor, RecipeProcessorService, RecipeQuery } from '../../api';

@Controller('recipes')
export class RecipesController {
  constructor(
    private recipeService: RecipeService,
    private recipeIngredientService: RecipeIngredientService,
    private recipeStepService: RecipeStepService,
    private recipeSectionService: RecipeSectionService,
    private recipeProcessor: RecipeProcessorService
  ) {}

  @Post('')
  @HttpCode(201)
  @UseGuards(AuthenticationGuard)
  public async createRecipe(@Req() request: AuthRequest, @Body() body: Recipiece.Recipe) {
    const processedRecipe = this.recipeProcessor.processRecipeIngredients(body);

    const createdRecipe = await this.recipeService.create({
      name: processedRecipe.name,
      description: processedRecipe.description,
      private: !!processedRecipe.private,
      tags: processedRecipe.tags || [],
      advanced_config: processedRecipe.advanced_config || {},
      owner_id: request.user.id,
    });

    const createdSections = await this.recipeSectionService.createMany(
      processedRecipe.sections.map((s) => {
        return {
          name: s.name,
          ordinal: s.ordinal,
          recipe_id: createdRecipe.id,
        };
      })
    );

    const createIngsPromises = processedRecipe.sections.map((section, sectionIndex) => {
      return this.recipeIngredientService.createMany(
        section.ingredients.map((ing) => {
          return {
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            content: ing.content,
            ordinal: ing.ordinal,
            recipe_section_id: createdSections[sectionIndex].id,
          };
        })
      );
    });
    const createdIngredients = await Promise.all(createIngsPromises);

    const createStepsPromises = processedRecipe.sections.map((section, sectionIndex) => {
      return this.recipeStepService.createMany(
        section.steps.map((step) => {
          return {
            content: step.content,
            time_ms: step.time_ms,
            ordinal: step.ordinal,
            recipe_section_id: createdSections[sectionIndex].id,
          };
        })
      );
    });
    const createdSteps = await Promise.all(createStepsPromises);

    return {
      id: createdRecipe.id,
      name: createdRecipe.name,
      description: createdRecipe.description,
      private: createdRecipe.private,
      advanced_config: createdRecipe.advanced_config,
      tags: createdRecipe.tags,
      sections: createdSections.map((section, sectionIndex) => {
        return {
          id: section.id,
          name: section.name,
          ingredients: createdIngredients[sectionIndex].map((createdIng) => {
            return {
              id: createdIng.id,
              name: createdIng.name,
              amount: createdIng.amount,
              unit: createdIng.unit,
              content: createdIng.content,
            };
          }),
          steps: createdSteps[sectionIndex].map((createdStep) => {
            return {
              id: createdStep.id,
              content: createdStep.content,
              time_ms: createdStep.time_ms,
            };
          }),
        };
      }),
    };
  }

  @Post('/parse/from-url')
  @HttpCode(200)
  @UseGuards(AuthenticationGuard)
  public async createRecipeFromUrl(@Body() body: { url: string }) {
    const url = `${process.env.RCP_PROTOCOL}://${process.env.RCP_SCRAPER_NAME}:${process.env.RCP_SCRAPER_PORT}/scrape`;
    const scraperRequest = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await scraperRequest.json();
  }

  @Put(':recipeId')
  @HttpCode(200)
  @UseGuards(AuthenticationGuard)
  public async updateRecipe(@Req() request: AuthRequest) {
    const recipeId = +request.params.recipeId;
    const updateBody: Recipiece.Recipe = request.body;

    const dbRecipe = await this.recipeService.get(recipeId);
    if (Utils.nou(dbRecipe)) {
      throw new NotFoundException(`Recipe ${recipeId} not found`);
    }
    if (dbRecipe.owner_id !== request.user.id) {
      throw new UnauthorizedException();
    }

    const processedRecipe = this.recipeProcessor.processRecipeIngredients(updateBody);

    const updatedRecipe = await this.recipeService.update(recipeId, {
      name: processedRecipe.name,
      description: processedRecipe.description,
      private: !!processedRecipe.private,
      tags: processedRecipe.tags || [],
      advanced_config: processedRecipe.advanced_config || {},
    });

    const sectionsInDb = await this.recipeSectionService.query({
      recipe_id: recipeId,
    });
    const sectionsOnModel = processedRecipe.sections;

    const stepCreatorClosure = (sectionId: number) => {
      return async (steps: Recipiece.RecipeStep[]) => {
        return this.recipeStepService.createMany(
          steps.map((step) => {
            return {
              ordinal: step.ordinal,
              content: step.content,
              recipe_section_id: sectionId,
            };
          })
        );
      };
    };

    const ingredientCreatorClosure = (sectionId: number) => {
      return async (ings: Recipiece.RecipeIngredient[]) => {
        return this.recipeIngredientService.createMany(
          ings.map((ing) => {
            return {
              content: ing.content,
              name: ing.name,
              amount: ing.amount,
              unit: ing.unit,
              ordinal: ing.ordinal,
              recipe_section_id: sectionId,
            };
          })
        );
      };
    };

    const stepUpdaterClosure = (sectionId: number) => {
      return async (steps: Recipiece.RecipeStep[]) => {
        return this.recipeStepService.updateMany(
          steps.map((step) => {
            return {
              id: step.id,
              ordinal: step.ordinal,
              content: step.content,
              recipe_section_id: sectionId,
            };
          })
        );
      };
    };

    const ingredientUpdaterClosure = (sectionId: number) => {
      return async (ings: Recipiece.RecipeIngredient[]) => {
        return this.recipeIngredientService.createMany(
          ings.map((ing) => {
            return {
              id: ing.id,
              content: ing.content,
              name: ing.name,
              amount: ing.amount,
              unit: ing.unit,
              ordinal: ing.ordinal,
              recipe_section_id: sectionId,
            };
          })
        );
      };
    };

    const stepDeleter = async (deleteQuery) => {
      await this.recipeStepService.deleteMany(deleteQuery);
    };

    const ingDeleter = async (deleteQuery) => {
      await this.recipeIngredientService.deleteMany(deleteQuery);
    };

    const sectionCreator = async (sections: Recipiece.RecipeSection[]) => {
      const createdSections = await this.recipeSectionService.createMany(
        sections.map((section) => {
          return {
            name: section.name,
            ordinal: section.ordinal,
            recipe_id: updatedRecipe.id,
          };
        })
      );

      const sectionsToReturn = [];
      for (let i = 0; i < sections.length; i++) {
        const sectionId = createdSections[i].id;

        const createdSteps = await stepCreatorClosure(sectionId)(sections[i].steps);
        const createdIngredients = await ingredientCreatorClosure(sectionId)(sections[i].ingredients);

        sectionsToReturn.push({
          ...createdSections[i],
          steps: createdSteps,
          ingredients: createdIngredients,
        });
      }

      return sectionsToReturn;
    };

    const sectionUpdater = async (sections: Recipiece.RecipeSection[]) => {
      await this.recipeSectionService.updateMany(
        sections.map((section) => {
          return {
            id: section.id,
            name: section.name,
            ordinal: section.ordinal,
          };
        })
      );

      const sectionsToReturn = [];
      for (const section of sections) {
        const stepsInDb = await this.recipeStepService.query({
          recipe_section_id: section.id,
        });
        const stepsOnModel = section.steps;
        const updatedSteps = await this.handleManyUpdate(
          stepsInDb as Recipiece.RecipeStep[],
          stepsOnModel,
          stepUpdaterClosure(section.id),
          stepCreatorClosure(section.id),
          stepDeleter
        );

        const ingsInDb = await this.recipeIngredientService.query({
          recipe_section_id: section.id,
        });
        const ingsOnModel = section.ingredients;
        const updatedIngredients = await this.handleManyUpdate(
          ingsInDb as Recipiece.RecipeIngredient[],
          ingsOnModel,
          ingredientUpdaterClosure(section.id),
          ingredientCreatorClosure(section.id),
          ingDeleter
        );

        sectionsToReturn.push({
          ...section,
          ingredients: updatedIngredients,
          step: updatedSteps,
        });
      }
      return sectionsToReturn;
    };

    const sectionDeleter = async (deleteQuery) => {
      await this.recipeSectionService.deleteMany(deleteQuery);
    };

    const updatedSections = await this.handleManyUpdate(
      sectionsInDb as Recipiece.RecipeSection[],
      sectionsOnModel,
      sectionUpdater,
      sectionCreator,
      sectionDeleter
    );

    updatedSections.forEach((section) => {
      section.steps.sort((a, b) => a.ordinal - b.ordinal);
      section.ingredients.sort((a, b) => a.ordinal - b.ordinal);
    });

    updatedSections.sort((a, b) => a.ordinal - b.ordinal);

    return {
      ...updatedRecipe,
      sections: [...updatedSections],
    };
  }

  private async handleManyUpdate<T extends { id?: number }>(
    dbEntities: T[],
    bodyEntities: T[],
    updater,
    creator,
    deleter
  ): Promise<T[]> {
    const dbSet = new BetterSet([...dbEntities]);
    const bodySet = new BetterSet([...bodyEntities]);

    // delete entities in the db but not in the body
    const entitiesToDelete = dbSet
      .difference(bodySet, (e) => e.id)
      .toArray()
      .map((e) => e.id);
    if (entitiesToDelete.length > 0) {
      await deleter({
        id: {
          in: entitiesToDelete,
        },
      });
    }

    // create the entities in the body but not in the db
    const entitiesToCreate = bodySet.difference(dbSet, (e) => e.id).toArray();
    let createdEntities = [];
    if (entitiesToCreate.length > 0) {
      createdEntities = await creator(entitiesToCreate);
    }

    // update the entities in both
    const entitiesToUpdate = bodySet.intersection(dbSet, (e) => e.id).toArray();
    let updatedEntities = [];
    if (entitiesToUpdate.length > 0) {
      updatedEntities = await updater(entitiesToUpdate);
    }

    return [...createdEntities, ...updatedEntities];
  }

  @Delete(':recipeId')
  @HttpCode(204)
  @UseGuards(AuthenticationGuard)
  public async deleteRecipe(@Req() request: AuthRequest) {
    const recipeId = +request.params.recipeId;
    const recipe = await this.recipeService.get(recipeId);
    if (Utils.nou(recipe)) {
      throw new NotFoundException(`Recipe ${recipeId} not found`);
    }
    if (recipe.owner_id !== request.user.id) {
      throw new UnauthorizedException();
    }
    await this.recipeService.delete({ id: recipe.id });
  }

  @Get(':recipeId')
  @HttpCode(200)
  public async getRecipeById(@Req() request: AuthRequest) {
    const recipeId = +request.params.recipeId;
    const recipe = await this.recipeService.get(recipeId);
    if (Utils.nou(recipe)) {
      throw new NotFoundException(undefined, `Recipe with id ${recipeId} not found`);
    }
    if (recipe.private && recipe.owner_id !== request.user?.id) {
      throw new UnauthorizedException();
    }

    const sections = await this.recipeSectionService.query({
      recipe_id: recipe.id,
    });

    const populatedSections = [];
    for (const section of sections) {
      populatedSections.push({
        ...section,
        ingredients: await this.recipeIngredientService.query(
          {
            recipe_section_id: section.id,
          },
          undefined,
          { ordinal: 'asc' }
        ),
        steps: await this.recipeStepService.query(
          {
            recipe_section_id: section.id,
          },
          undefined,
          { ordinal: 'asc' }
        ),
      });
    }
    populatedSections.sort((a, b) => a.ordinal - b.ordinal);
    return {
      ...recipe,
      sections: populatedSections,
    };
  }

  @Get('list/:userId')
  @HttpCode(200)
  @UseGuards(AuthenticationGuard)
  public async listRecipesForUser(@Req() request: AuthRequest) {
    const owner = +request.params.userId;

    if (request.user.id !== owner) {
      throw new UnauthorizedException();
    }

    const whereQuery = new RecipeQuery().fromRequest(request);
    const recipes = await this.recipeService.query(whereQuery, getCursor(request), { name: 'asc' });

    return {
      data: recipes,
      next: recipes[recipes.length - 1].id,
    };
  }
}
