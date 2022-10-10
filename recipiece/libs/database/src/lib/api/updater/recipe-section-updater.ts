import { PrismaClient } from '@prisma/client';
import { Recipiece } from '../../model/types';
import { NestedUpdater } from './nested-updater';

export class RecipeSectionUpdater extends NestedUpdater<Recipiece.RecipeSection> {
  constructor(private recipeId: number, prisma: PrismaClient) {
    super(prisma);
  }

  protected refineDelete() {
    return {
      recipe_id: this.recipeId,
    };
  }

  protected mapCreateData(entity: Recipiece.RecipeSection): Partial<Recipiece.RecipeSection> {
    return {
      recipe_id: this.recipeId,
      name: entity.name,
    };
  }

  protected mapUpdateData(entity: Recipiece.RecipeSection): Partial<Recipiece.RecipeSection> {
    return {
      name: entity.name,
    };
  }
}
