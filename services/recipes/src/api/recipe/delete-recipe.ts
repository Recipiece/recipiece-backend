import * as E from 'express';
import { AuthRequest, Recipe, UnauthorizedError } from 'recipiece-common';
import { fetchById } from './get-recipe';

export async function deleteRecipe(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  const recipeId = req.params.recipeId;
  let recipe: Recipe;
  try {
    recipe = new Recipe(await fetchById(recipeId));
  } catch (e) {
    next(e);
    return;
  }
  if (recipe.owner !== req.user._id) {
    next(new UnauthorizedError());
  } else {
    await recipe.delete();
    res.status(204).send();
  }
}
