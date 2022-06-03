import { Injectable } from '@nestjs/common';
import { Cookbook, Prisma, Recipe } from '@prisma/client';
import { DB_PAGE_SIZE } from '../../constants';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CookbookService {
  constructor(private prisma: PrismaService) {}

  public async getById(id: number): Promise<Cookbook | undefined> {
    return this.prisma.cookbook.findFirst({
      where: {
        id: id,
      },
    });
  }

  public async list(
    cursor: number,
    where?: Prisma.CookbookWhereInput,
    orderBy: Prisma.CookbookOrderByWithRelationInput = { name: 'asc' }
  ): Promise<Cookbook[]> {
    const findCriteria: Prisma.CookbookFindManyArgs = {
      where: { ...(where || {}) },
      take: DB_PAGE_SIZE,
      orderBy: { ...(orderBy || {}) },
    };

    if (cursor !== null && cursor !== undefined) {
      findCriteria.cursor = {
        id: cursor,
      };
      findCriteria.skip = 1;
    }

    return this.prisma.cookbook.findMany(findCriteria);
  }

  public async listRecipes(book: number, cursor: number, recipeQuery?: Prisma.RecipeWhereInput): Promise<Recipe[]> {
    const recipesFindMany: Prisma.RecipeFindManyArgs = {
      take: DB_PAGE_SIZE,
      where: {
        ...(recipeQuery || {}),
      },
      orderBy: {
        name: 'asc',
      },
      include: {
        sections: {
          include: {
            ingredients: true,
            steps: true,
          },
        },
      },
    };
    if (cursor !== null && cursor !== undefined) {
      recipesFindMany.cursor = {
        id: cursor,
      };
      recipesFindMany.skip = 1;
    }

    const query: Prisma.RecipeCookbookMembershipFindFirstArgs = {
      take: DB_PAGE_SIZE,
      where: {
        cookbook_id: book,
      },
      include: {
        recipes: { ...recipesFindMany },
      },
    };

    const results = await this.prisma.recipeCookbookMembership.findFirst(query);

    return (results as unknown as { recipes: Recipe[] }).recipes;
  }

  public async create(owner: number, model: Partial<Cookbook>): Promise<Cookbook> {
    return this.prisma.cookbook.create({
      data: {
        name: model?.name,
        description: model?.description,
        owner_id: owner,
      },
    });
  }

  public async update(id: number, model: Partial<Cookbook>): Promise<Cookbook> {
    return this.prisma.cookbook.update({
      data: {
        name: model?.name,
        description: model?.description,
      },
      where: {
        id: id,
      },
    });
  }

  public async delete(id: number) {
    return this.prisma.cookbook.delete({
      where: {
        id: id,
      },
    });
  }
}
