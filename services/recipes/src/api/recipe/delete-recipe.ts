import * as E from 'express';
import { AuthRequest, NotFoundError, RecipeModel, UnauthorizedError, Utils } from 'recipiece-common';

export async function deleteRecipe(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  const recipeId = req.params.recipeId;
  try {
    await runDelete(recipeId, req.user.id);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}

async function runDelete(recipeId: string, userId: string) {
  const recipe = await RecipeModel.findById(recipeId);
  if (Utils.nou(recipe)) {
    throw new NotFoundError(recipeId);
  }
  if (recipe.owner !== userId) {
    throw new UnauthorizedError();
  }
  await recipe.delete();
}
