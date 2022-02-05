import * as E from 'express';
import { NotFoundError, Recipe, RecipeModel, Utils } from 'recipiece-common';

export async function getRecipe(req: E.Request, res: E.Response, next: E.NextFunction) {
  const recipeId = req.params.recipeId;
  try {
    const recipe = await fetchById(recipeId);
    res.status(200).send(recipe.asJson());
  } catch (e) {
    next(e);
  }
}

export async function fetchById(recipeId: string): Promise<Recipe> {
  const recipe = await RecipeModel.findById(recipeId);
  if (Utils.nou(recipe)) {
    throw new NotFoundError(recipeId);
  }
  return recipe;
}
