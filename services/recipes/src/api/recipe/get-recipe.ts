import * as E from 'express';
import { DatabaseConstants, DbI, IRecipe, NotFoundError, Utils } from 'recipiece-common';

export async function getRecipe(req: E.Request, res: E.Response, next: E.NextFunction) {
  const recipeId = req.params.recipeId;
  let recipe: IRecipe;
  try {
    recipe = await fetchById(recipeId);
  } catch (e) {
    next(e);
    return;
  }
  res.status(200).send(recipe);
}

export async function fetchById(recipeId: string): Promise<IRecipe> {
  const recipe = await DbI.getEntityById<IRecipe>(DatabaseConstants.collections.recipes, recipeId);
  if (Utils.nou(recipe)) {
    throw new NotFoundError(recipeId);
  }
  return recipe;
}
