import * as E from 'express';
import { AuthRequest, Recipe, UnauthorizedError } from 'recipiece-common';
import { fetchById } from './get-recipe';

export async function updateRecipe(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  let recipe: Recipe;
  try {
    recipe = new Recipe(await fetchById(req.params.recipeId));
  } catch (e) {
    next(e);
    return;
  }
  if(recipe.owner !== req.user._id) {
    next(new UnauthorizedError());
  } else {
    recipe = new Recipe(req.body);
    recipe = await recipe.save();
    res.status(200).send(recipe.asModel());
  }
}
