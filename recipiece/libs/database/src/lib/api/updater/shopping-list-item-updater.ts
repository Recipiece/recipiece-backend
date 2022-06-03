import { PrismaClient } from '@prisma/client';
import { NestedUpdater } from './nested-updater';

export class ShoppingListItemUpdater extends NestedUpdater<Recipiece.ShoppingListItem> {
  constructor(private listId: number, prisma: PrismaClient) {
    super(prisma);
  }

  protected mapCreateData(entity: Recipiece.ShoppingListItem): Partial<Recipiece.ShoppingListItem> {
    return {
      name: entity.name,
      checked: entity.checked,
      ordinal: entity.ordinal,
      category: entity.category,
      shopping_list_id: this.listId,
    };
  }

  protected mapUpdateData(entity: Recipiece.ShoppingListItem): Partial<Recipiece.ShoppingListItem> {
    return {
      id: entity.id,
      name: entity.name,
      checked: entity.checked,
      ordinal: entity.ordinal,
      category: entity.category,
      shopping_list_id: this.listId,
    };
  }
}
