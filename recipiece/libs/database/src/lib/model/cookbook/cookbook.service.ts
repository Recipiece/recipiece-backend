import { Injectable } from '@nestjs/common';
import { Cookbook, Prisma } from '@prisma/client';
import { PagedResponse } from '../../api/paged-response';
import { DB_PAGE_SIZE } from '../../constants';
import { PrismaService } from '../../prisma/prisma.service';
import { Recipiece } from '../types';

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
    where?: Prisma.CookbookWhereInput,
    cursor?: number,
    orderBy: Prisma.CookbookOrderByWithRelationInput = { name: 'asc' }
  ): Promise<PagedResponse<Cookbook>> {
    const findCriteria: Prisma.CookbookFindManyArgs = {
      take: DB_PAGE_SIZE,
    };

    if (orderBy) {
      findCriteria.orderBy = { ...orderBy };
    }

    if (where) {
      findCriteria.where = { ...where };
    }

    if (cursor !== null && cursor !== undefined) {
      findCriteria.cursor = {
        id: cursor,
      };
      findCriteria.skip = 1;
    }

    const data = await this.prisma.cookbook.findMany(findCriteria);
    if (data.length > 0) {
      return {
        data: data,
        next: data[data.length - 1].id,
      };
    } else {
      return {
        data: [],
      };
    }
  }

  public async attachRecipes(book: number, recipes: number[]) {
    const attachments: Prisma.RecipeCookbookMembershipCreateManyInput[] = recipes.map((r) => {
      return {
        recipe_id: r,
        cookbook_id: book,
      };
    });
    await this.prisma.recipeCookbookMembership.createMany({
      data: attachments,
    });
  }

  public async detachRecipes(book: number, recipes: number[]) {
    const detachments: Prisma.RecipeCookbookMembershipWhereInput = {
      AND: {
        cookbook_id: book,
        recipe_id: {
          in: recipes,
        },
      },
    };
    await this.prisma.recipeCookbookMembership.deleteMany({
      where: detachments,
    });
  }

  public async listRecipes(
    book: number,
    recipeQuery?: Prisma.RecipeWhereInput,
    cursor?: number
  ): Promise<PagedResponse<Recipiece.Recipe>> {
    const membershipsJoin: Prisma.RecipeCookbookMembershipFindManyArgs = {
      take: DB_PAGE_SIZE,
      where: {
        cookbook_id: book,
        recipe: {
          ...(recipeQuery || {}),
        },
      },
      include: {
        recipe: {
          include: {
            sections: {
              include: {
                ingredients: true,
                steps: true,
              },
            },
          },
        },
      },
    };

    if (cursor !== null && cursor !== undefined) {
      membershipsJoin.cursor = {
        id: cursor,
      };
      membershipsJoin.skip = 1;
    }

    const memberships = await this.prisma.recipeCookbookMembership.findMany(membershipsJoin);

    if (memberships.length > 0) {
      const recipes = memberships.map((m) => {
        return (m as unknown as { recipe: Recipiece.Recipe }).recipe;
      });
      return {
        data: recipes,
        next: memberships[memberships.length - 1].id,
      };
    } else {
      return {
        data: [],
      };
    }
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
