import { PrismaClient, RecipeSection } from '@prisma/client';
import { Recipiece } from '../../model/types';
import { NestedUpdater } from './nested-updater';

export class RecipeStepUpdater extends NestedUpdater<Recipiece.RecipeStep> {
  constructor(private section: RecipeSection, prisma: PrismaClient) {
    super(prisma);
  }

  protected refineDelete() {
    return {
      recipe_section_id: this.section.id,
    };
  }

  protected mapCreateData(entity: Recipiece.RecipeStep): any {
    return {
      recipe_section_id: this.section.id,
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
