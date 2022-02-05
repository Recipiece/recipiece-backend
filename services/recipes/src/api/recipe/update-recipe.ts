import * as E from 'express';
import { AuthRequest, NotFoundError, Recipe, RecipeModel, UnauthorizedError, Utils } from 'recipiece-common';

export async function updateRecipe(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  try {
    const recipe = await update(req.body, req.params.recipeId, req.user.id);
    res.status(200).send(recipe.asJson());
  } catch(e) {
    next(e);
  }
}

async function update(body: any, recipeId: string, owner: string): Promise<Recipe> {
  let recipe = await RecipeModel.findById(recipeId);
  if(Utils.nou(recipe)) {
    throw new NotFoundError(recipeId);
  }
  if(recipe.owner !== owner) {
    throw new UnauthorizedError();
  }
  recipe = new RecipeModel(body);
  return await recipe.save();
}
