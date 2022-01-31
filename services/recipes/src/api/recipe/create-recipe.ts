import * as E from 'express';
import { AuthRequest, Recipe } from 'recipiece-common';

export async function createRecipe(req: AuthRequest, res: E.Response) {
  const recipe = await new Recipe({
    ...req.body,
    owner: req.user._id
  }).save();
  res.status(201).send(recipe.asModel());
}
