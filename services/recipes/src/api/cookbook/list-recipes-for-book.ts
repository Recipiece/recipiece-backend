import * as E from 'express';
import { AuthRequest, DatabaseConstants, DbI, IPagedResult, IRecipe } from 'recipiece-common';
import { buildIngredientsQuery, buildNameQuery, buildTagsQuery } from '../util';
import { fetchCookbookById } from './get-cookbook';

export async function listRecipesForCookbook(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  try {
    res.status(200).send(await listRecipes(req));
  } catch (e) {
    next(e);
  }
}

async function listRecipes(req: AuthRequest): Promise<IPagedResult<IRecipe>> {
  const book = await fetchCookbookById(req.params.bookId);
  let requestQuery: any = {
    _id: {
      $in: book.recipes,
    },
  };

  // build up any recipe queries in this cookbook
  requestQuery.private = book.owner === req.user._id;
  requestQuery = buildNameQuery(requestQuery, req);
  requestQuery = buildTagsQuery(requestQuery, req);
  requestQuery = buildIngredientsQuery(requestQuery, req);

  return await DbI.queryEntity(DatabaseConstants.collections.recipes, requestQuery, req.params.page);
}
