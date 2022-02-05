import * as E from 'express';
import mongoose from 'mongoose';
import {
  AuthRequest,
  CookbookModel,
  Environment,
  IPagedResponse,
  IRecipe,
  NotFoundError,
  Recipe,
  RecipeModel,
  Utils
} from 'recipiece-common';
import { buildIngredientsQuery, buildNameQuery, buildTagsQuery } from '../util';

export async function listRecipesForCookbook(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  try {
    res.status(200).send(await listRecipes(req));
  } catch (e) {
    next(e);
  }
}

async function listRecipes(req: AuthRequest): Promise<IPagedResponse<IRecipe>> {
  const book = await CookbookModel.findById(req.params.bookId);

  if (Utils.nou(book)) {
    throw new NotFoundError(req.params.bookId);
  }

  let requestQuery: any = {
    _id: {
      $in: book.recipes.map((recipeId: string) => new mongoose.Types.ObjectId(recipeId)),
    },
  };

  // build up any recipe queries in this cookbook
  requestQuery.private = book.owner === req.user.id;
  requestQuery = buildNameQuery(requestQuery, req);
  requestQuery = buildTagsQuery(requestQuery, req);
  requestQuery = buildIngredientsQuery(requestQuery, req);

  const recipesPage = await RecipeModel.paginate(requestQuery, {
    limit: Environment.DB_PAGE_SIZE,
    page: +(req.query?.page || '0'),
  });

  const data = recipesPage.data.map((d: IRecipe) => new RecipeModel(d)).map((rm: Recipe) => rm.asJson());
  return {
    data: data,
    page: recipesPage.nextPage,
    more: recipesPage.hasNextPage,
  };
}
