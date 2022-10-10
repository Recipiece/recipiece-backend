import { PrismaClient, RecipeSection } from '@prisma/client';
import { Recipiece } from '../../model/types';
import { NestedUpdater } from './nested-updater';

export class RecipeIngredientUpdater extends NestedUpdater<Recipiece.RecipeIngredient> {
  constructor(private section: RecipeSection, prisma: PrismaClient) {
    super(prisma);
  }

  protected refineDelete() {
    return {
      recipe_section_id: this.section.id,
    };
  }

  protected mapCreateData(entity: Recipiece.RecipeIngredient): any {
    return {
      name: entity.name,
      recipe_section_id: this.section.id,
      unit: entity.unit,
      amount: entity.amount,
      content: entity.content,
    };
  }

  protected mapUpdateData(entity: Recipiece.RecipeIngredient): any {
    return {
      name: entity.name,
      unit: entity.unit,
      amount: entity.amount,
      content: entity.content,
    };
  }
}
