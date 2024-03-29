import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PagedResponse, ShoppingListItemUpdater } from '../../api';
import { DB_PAGE_SIZE } from '../../constants';
import { PrismaService } from '../../prisma/prisma.service';
import { Recipiece } from '../types';

@Injectable()
export class ShoppingListService {
  constructor(private prisma: PrismaService) {}

  public async create(owner: number, model: Recipiece.ShoppingList): Promise<Recipiece.ShoppingList> {
    return this.prisma.shoppingList.create({
      data: {
        name: model.name,
        owner_id: owner,
        description: model.description,
        items: {
          create: [...model.items],
        },
      },
      include: {
        items: true,
      },
    });
  }

  public async update(id: number, model: Recipiece.ShoppingList): Promise<Recipiece.ShoppingList> {
    const updater = new ShoppingListItemUpdater(id, this.prisma);
    const updatedItems = await updater.update(model.items, 'recipeIngredient');

    const updatedList = await this.prisma.shoppingList.update({
      where: {
        id: id,
      },
      data: {
        name: model.name,
        description: model.description,
      },
    });

    return {
      ...updatedList,
      items: [...updatedItems],
    };
  }

  public async delete(id: number) {
    return this.prisma.shoppingList.delete({
      where: {
        id: id,
      },
    });
  }

  public async list(
    cursor: number,
    where?: Prisma.ShoppingListWhereInput,
    orderBy: Prisma.ShoppingListOrderByWithRelationInput = { name: 'asc' }
  ): Promise<PagedResponse<Recipiece.ShoppingList>> {
    const findCriteria: Prisma.ShoppingListFindManyArgs = {
      take: DB_PAGE_SIZE,
      where: { ...where },
      include: {
        items: true,
      },
      orderBy: { ...orderBy },
    };

    if (cursor !== null && cursor !== undefined) {
      findCriteria.cursor = {
        id: cursor,
      };
      findCriteria.skip = 1;
    }

    const lists = await this.prisma.shoppingList.findMany(findCriteria);

    if (lists.length > 0) {
      return {
        data: lists as unknown as Recipiece.ShoppingList[],
        next: lists[lists.length - 1].id,
      };
    } else {
      return {
        data: [],
      };
    }
  }
}
