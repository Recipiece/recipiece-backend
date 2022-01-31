import { NextFunction, Response } from 'express';
import { AuthRequest, DatabaseConstants, DbI, ICommonIngredient, ICommonIngredientName, MemI } from 'recipiece-common';

export async function listCommonIngredients(req: AuthRequest, res: Response, next: NextFunction) {}

export async function listRecipieceIngredients(): Promise<ICommonIngredient[]> {
  const memKey = 'rcp-common-ingredients'
  const inMemcache = await MemI.memHas(memKey);
  let commonIngredients = [];
  if (!inMemcache) {
    let lastRequest: any = {
      more: true,
    };
    do {
      lastRequest = await DbI.queryEntity<ICommonIngredient>(
        DatabaseConstants.collections.commonIngredients,
        {},
        lastRequest.page
      );
      commonIngredients.push(lastRequest.data);
    } while (lastRequest.more);
    await MemI.memSet(memKey, commonIngredients);
  } else {
    commonIngredients = await MemI.memGet<ICommonIngredient[]>(memKey);
  }
  return commonIngredients;
}

export async function listRecipieceIngredientNames(): Promise<ICommonIngredientName[]> {
  const memKey = 'rcp-common-ingredient-names'
  const inMemcache = await MemI.memHas(memKey);
  let commonIngredientNames = [];
  if (!inMemcache) {
    let lastRequest: any = {
      more: true,
    };
    do {
      lastRequest = await DbI.queryEntity<ICommonIngredientName>(
        DatabaseConstants.collections.commonIngredientNames,
        {},
        lastRequest.page
      );
      commonIngredientNames.push(lastRequest.data);
    } while (lastRequest.more);
    await MemI.memSet(memKey, commonIngredientNames);
  } else {
    commonIngredientNames = await MemI.memGet<ICommonIngredientName[]>(memKey);
  }
  return commonIngredientNames;
}
