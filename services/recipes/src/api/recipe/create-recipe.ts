import * as E from 'express';
import { AuthRequest, RecipeModel } from 'recipiece-common';

export async function createRecipe(req: AuthRequest, res: E.Response) {
  const recipe = await new RecipeModel({
    ...req.body,
    owner: req.user.id,
  }).save();
  res.status(201).send(recipe.asJson());
}
