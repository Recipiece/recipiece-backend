import * as E from 'express';
import { AuthRequest, Cookbook, DatabaseConstants, DbI, ICookbook, NotFoundError, Utils } from 'recipiece-common';

export async function getCookbook(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  try {
    const cookbook = await fetchCookbookById(req.params.bookId);
    res.status(200).send(cookbook.asModel());
  } catch(e) {
    next(e);
  }
}

export async function fetchCookbookById(bookId: string): Promise<Cookbook> {
  const cookbook = await DbI.getEntityById<ICookbook>(DatabaseConstants.collections.recipeBooks, bookId);
  if(Utils.nou(cookbook)) {
    throw new NotFoundError(bookId);
  }
  return new Cookbook(cookbook);
}
