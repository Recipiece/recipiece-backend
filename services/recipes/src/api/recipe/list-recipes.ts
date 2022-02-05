import * as E from 'express';
import {
  AuthRequest,
  Environment,
  IPagedResponse,
  IRecipe,
  Recipe,
  RecipeModel,
  UnauthorizedError
} from 'recipiece-common';
import { buildIngredientsQuery, buildNameQuery, buildTagsQuery } from '../util';

export async function listRecipesForUser(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  try {
    res.status(200).send(await listRecipes(req));
  } catch (e) {
    next(e);
  }
}

async function listRecipes(req: AuthRequest): Promise<IPagedResponse<IRecipe>> {
  const owner = req.params.userId;

  if (req.user.id !== owner) {
    throw new UnauthorizedError();
  }

  let requestQuery: any = {};

  // only query on certain things
  requestQuery.owner = req.user.id;
  requestQuery.private = owner === req.user.id;
  requestQuery = buildNameQuery(requestQuery, req);
  requestQuery = buildTagsQuery(requestQuery, req);
  requestQuery = buildIngredientsQuery(requestQuery, req);

  const page = await RecipeModel.paginate(requestQuery, {
    limit: Environment.DB_PAGE_SIZE,
    page: +(req.query.page || '0'),
  });

  const docs = page.docs.map((d: IRecipe) => new RecipeModel(d)).map((rm: Recipe) => rm.asJson());

  return {
    data: docs,
    more: page.hasNextPage,
    page: page.nextPage,
  };
}
