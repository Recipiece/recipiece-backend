import { PrismaClient } from '@prisma/client';
import { NestedUpdater } from './nested-updater';

export class RecipeIngredientUpdater extends NestedUpdater<Recipiece.RecipeIngredient> {
  constructor(private sectionId: number, prisma: PrismaClient) {
    super(prisma);
  }

  protected mapCreateData(entity: Recipiece.RecipeIngredient): Partial<Recipiece.RecipeIngredient> {
    return {
      name: entity.name,
      recipe_section_id: this.sectionId,
      unit: entity.unit,
      amount: entity.amount,
    };
  }

  protected mapUpdateData(entity: Recipiece.RecipeIngredient): Partial<Recipiece.RecipeIngredient> {
    return {
      name: entity.name,
      unit: entity.unit,
      amount: entity.amount,
    };
  }
}
