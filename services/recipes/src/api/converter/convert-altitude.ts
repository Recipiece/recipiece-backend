import { fetchById } from '../recipe/get-recipe';
import { NextFunction, Response } from 'express';
import { AuthRequest, IRecipe, IRecipeIngredient } from 'recipiece-common';

export async function convertRecipeAltitude(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    res.status(200).send(await convertRecipe(req));
  } catch (e) {
    next(e);
  }
}

async function convertRecipe(req: AuthRequest): Promise<IRecipe> {
  const recipeId = req.params.recipeId;
  const destAltitude = req.body.altitude;
  const recipe = await fetchById(recipeId);

  // assume the recipe is sitting at 0, unless otherwise specified
  let srcAltitude = recipe.advanced?.highAltitude ? recipe.advanced!!.altitude : 0;

  // check through all the at-risk ingredients, and change the amounts if necessary
  const allIngredients: IRecipeIngredient[] = [];
  recipe.sections.forEach((s) => {
    allIngredients.push(...s.ingredients);
  });
  const atRiskIngredients = allIngredients.filter((i) => {
    
  });
}
