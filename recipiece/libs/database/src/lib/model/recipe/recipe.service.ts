import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RecipeIngredientUpdater, RecipeSectionUpdater, RecipeStepUpdater } from '../../api';
import { DB_PAGE_SIZE } from '../../constants';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RecipeService {
  private readonly INCUDE_CLAUSE = {
    sections: {
      include: {
        ingredients: true,
        steps: true,
      },
    },
  };

  constructor(private prisma: PrismaService) {}

  public async getById(id: number): Promise<Recipiece.Recipe> {
    return this.prisma.recipe.findFirst({
      where: {
        id: id,
      },
      include: this.INCUDE_CLAUSE,
    });
  }

  public async create(owner: number, model: Recipiece.Recipe): Promise<Recipiece.Recipe> {
    const sectionCreate = model.sections.map((s) => {
      return {
        ...s,
        ingredients: {
          create: [...s.ingredients],
        },
        steps: {
          create: [...s.steps],
        },
      };
    });

    const recipe = await this.prisma.recipe.create({
      data: {
        name: model.name,
        description: model.description,
        owner_id: owner,
        tags: model.tags || [],
        sections: {
          create: sectionCreate,
        },
        advanced_config: model.advanced_config || {},
        private: model.private || false,
      },
      include: this.INCUDE_CLAUSE,
    });

    return recipe;
  }

  public async update(id: number, model: Recipiece.Recipe): Promise<Recipiece.Recipe> {
    const recipe = await this.prisma.recipe.update({
      where: {
        id: id,
      },
      data: {
        name: model.name,
        description: model.description,
        tags: model.tags || [],
        advanced_config: model.advanced_config || {},
        private: model.private || false,
      },
    });

    const updatedSections = await this.updateRecipeSections(recipe.id, model.sections);

    return {
      ...recipe,
      sections: [...updatedSections],
    };
  }

  private async updateRecipeSections(
    recipeId: number,
    sections: Recipiece.RecipeSection[]
  ): Promise<Recipiece.RecipeSection[]> {
    const sectionUpdater = new RecipeSectionUpdater(recipeId, this.prisma);
    const updatedSections = await sectionUpdater.update(sections, 'recipeSection');

    const sectionsRet: Recipiece.RecipeSection[] = [];

    for (let i = 0; i < updatedSections.length; i++) {
      const updatedSection = updatedSections[i];
      const rawSection = sections[i];

      const ingredientUpdater = new RecipeIngredientUpdater(updatedSection.id, this.prisma);
      const stepUpdater = new RecipeStepUpdater(updatedSection.id, this.prisma);

      const updatedIngredients = await ingredientUpdater.update(rawSection.ingredients, 'recipeIngredient');
      const updatedSteps = await stepUpdater.update(rawSection.steps, 'recipeStep');

      sectionsRet.push({
        ...updatedSection,
        ingredients: updatedIngredients,
        steps: updatedSteps,
      });
    }

    return sectionsRet;
  }

  public async delete(id: number) {
    return await this.prisma.recipe.delete({
      where: {
        id: id,
      },
    });
  }

  public async list(
    cursor: number,
    where?: Prisma.RecipeWhereInput,
    orderBy: Prisma.RecipeOrderByWithRelationInput = { name: 'asc' }
  ): Promise<Recipiece.Recipe[]> {
    const findCriteria: Prisma.RecipeFindManyArgs = {
      where: { ...(where || {}) },
      take: DB_PAGE_SIZE,
      orderBy: { ...(orderBy || {}) },
      include: this.INCUDE_CLAUSE,
    };

    if (cursor !== null && cursor !== undefined) {
      findCriteria.cursor = {
        id: cursor,
      };
      findCriteria.skip = 1;
    }

    const recipes = await this.prisma.recipe.findMany(findCriteria);
    return recipes as unknown as Recipiece.Recipe[];
  }
}
