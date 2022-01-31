import { buildIngredientsQuery, buildNameQuery, buildTagsQuery } from '../util';
import * as E from 'express';
import { AuthRequest, DatabaseConstants, DbI, IPagedResult, IRecipe, UnauthorizedError } from 'recipiece-common';

export async function listRecipesForUser(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  try {
    res.status(200).send(await listRecipes(req));
  } catch (e) {
    next(e);
  }
}

async function listRecipes(req: AuthRequest): Promise<IPagedResult<IRecipe>> {

  const owner = req.params.userId;

  if(req.user._id !== owner) {
    throw new UnauthorizedError();
  }

  let requestQuery: any = {};

  // only query on certain things
  requestQuery.owner = req.user._id;
  requestQuery.private = owner === req.user._id;
  requestQuery = buildNameQuery(requestQuery, req);
  requestQuery = buildTagsQuery(requestQuery, req);
  requestQuery = buildIngredientsQuery(requestQuery, req);

  return await DbI.queryEntity(
    DatabaseConstants.collections.recipes,
    requestQuery,
    req.query?.page as string
  );
}

