import { Prisma } from '@prisma/client';
import { Utils } from '@recipiece/common';
import { AuthRequest } from '@recipiece/middleware';
import { Request } from 'express';

export class RecipeQuery {
  private query: Prisma.RecipeWhereInput;

  constructor() {
    this.query = {};
  }

  public fromRequest(request: AuthRequest): Prisma.RecipeWhereInput {
    this.setNameReq(request);
    this.setOwnerReq(request);
    this.setTagsReq(request);
    this.setIngredientsReq(request);
    return { ...this.query };
  }

  public setOwnerReq(request: AuthRequest) {
    this.setOwner(request.user.id);
  }

  public setOwner(owner: number) {
    this.query.owner_id = owner;
  }

  public setNameReq(request: Request) {
    const recipePartialName = request.query?.name;
    if (!Utils.nou(recipePartialName)) {
      this.setName(recipePartialName as string);
    }
  }

  public setName(name: string) {
    this.query.name = {
      contains: name,
      mode: 'insensitive',
    };
  }

  public setTagsReq(request: Request) {
    const tags = request.query?.tags;
    if (!Utils.nou(tags)) {
      this.setTags(tags as string[]);
    }
  }

  public setTags(tags: string[]) {
    this.query.tags = {
      hasEvery: tags as string[],
    };
  }

  public setIngredientsReq(request: Request) {
    const ingredients = request.query?.ingredients;
    if (!Utils.nou(ingredients)) {
      this.setIngredients(ingredients as string[]);
    }
  }

  public setIngredients(ingredientNames: string[]) {
    this.query.sections = {
      some: {
        ingredients: {
          some: {
            name: {
              in: ingredientNames,
            },
          },
        },
      },
    };
  }
}
