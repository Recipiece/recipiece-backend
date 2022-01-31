import * as E from 'express';
import Fraction from 'fraction.js';
import FuzzySet from 'fuzzyset.js';
import {
  AuthRequest,
  DatabaseConstants,
  DbI,
  ICommonIngredient,
  IMeasure,
  IRecipeIngredient,
  RecipieceError,
  Utils
} from 'recipiece-common';
import { listRecipieceIngredientNames } from './list-common-ingredients';
import { listRecipieceMeasures } from './list-measures';
import { UnknownIngredientError } from './unknown-ingredient-error';
import { UnknownUnitError } from './unknown-unit-error';

interface ConvertedIngredientBundle {
  ingredient: IRecipeIngredient;
  from: IMeasure;
  to: IMeasure;
}

export async function convertSingleIngredient(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  try {
    res.status(200).send(await convertIngredient(req));
  } catch (e) {
    next(e);
  }
}

async function convertIngredient(req: AuthRequest): Promise<ConvertedIngredientBundle> {
  const ingredient: IRecipeIngredient = req.body.ingredient;

  if (Utils.nou(ingredient.unit)) {
    throw new UnknownUnitError('undefined');
  }

  const desiredUnitName = req.body.to;

  // try and find the units from the ingredient and the desired unit
  const measures = await listRecipieceMeasures();

  const sourceMeasure = findMeasure(measures, ingredient.unit);

  if (Utils.nou(sourceMeasure)) {
    throw new UnknownUnitError(ingredient.unit);
  }

  const destMeasure = findMeasure(measures, desiredUnitName);

  if (Utils.nou(destMeasure)) {
    throw new UnknownUnitError(desiredUnitName);
  }

  let convertedAmount: number;
  if (sourceMeasure.cat !== destMeasure.cat) {
    convertedAmount = await convertDifferentUnitCategories(ingredient, sourceMeasure, destMeasure);
  } else {
    convertedAmount = convertSameUnitCategories(ingredient, sourceMeasure, destMeasure);
  }

  // try and nicely convert the value back to a fraction, if it ~should~ be one
  let amount = convertedAmount.toString(10);
  if (destMeasure.preferFractions) {
    amount = new Fraction(Math.round(16 * convertedAmount), 16).toFraction();
  }

  return {
    ingredient: {
      ...ingredient,
      unit: convertedAmount === 1 ? destMeasure.name.s : destMeasure.name.p,
      amount: amount,
    },
    from: sourceMeasure,
    to: sourceMeasure,
  };
}

function findMeasure(measures: IMeasure[], unitName: string): IMeasure | undefined {
  return measures.find((m) => {
    m.abbrs.includes(unitName) || m.name.s.includes(unitName) || m.name.p.includes(unitName);
  });
}

async function convertDifferentUnitCategories(
  ingredient: IRecipeIngredient,
  source: IMeasure,
  dest: IMeasure
): Promise<number> {
  // try to find the ingredient in the common ingredients
  const commonIngredientNames = await listRecipieceIngredientNames();
  const fuzzySet = FuzzySet(commonIngredientNames.map((cin) => cin.name));
  const matches = fuzzySet.get(ingredient.name.toLowerCase().trim(), [], 0.9);
  if (matches.length === 0) {
    throw new UnknownIngredientError(ingredient.name);
  }

  const bestMatchName = matches[0][1];
  // fetch the common ingredient for that name
  const commonIngRequest = await DbI.queryEntity<ICommonIngredient>(DatabaseConstants.collections.commonIngredients, {
    names: {
      $all: [bestMatchName],
    },
  });
  if (commonIngRequest.data.length === 0) {
    throw new RecipieceError();
  }
  const commonIngredient = commonIngRequest.data[0];
  // convert the recipe ingredient over to the common ingredient's matching category
  const destCommon = commonIngredient[source.cat].unit;
}

function convertSameUnitCategories(ingredient: IRecipeIngredient, source: IMeasure, dest: IMeasure): number {
  // easy peasy, just do the math
  const floatyAmount = new Fraction(ingredient.amount).valueOf();
  return (floatyAmount * source.factor) / dest.factor;
}
