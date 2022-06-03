import { PrismaClient } from '@prisma/client';
import { NestedUpdater } from './nested-updater';

export class RecipeStepUpdater extends NestedUpdater<Recipiece.RecipeStep> {
  constructor(private sectionId: number, prisma: PrismaClient) {
    super(prisma);
  }

  protected mapCreateData(entity: Recipiece.RecipeStep): Partial<Recipiece.RecipeStep> {
    return {
      recipe_section_id: this.sectionId,
      content: entity.content,
      time_ms: entity.time_ms,
    };
  }

  protected mapUpdateData(entity: Recipiece.RecipeStep): Partial<Recipiece.RecipeStep> {
    return {
      content: entity.content,
      time_ms: entity.time_ms,
    };
  }
}
