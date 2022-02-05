import * as E from 'express';
import { AuthRequest, Cookbook, CookbookModel, DatabaseConstants, ICookbook, NotFoundError, Utils } from 'recipiece-common';

export async function getCookbook(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  try {
    const cookbook = await fetchCookbookById(req.params.bookId);
    res.status(200).send(cookbook.asJson());
  } catch(e) {
    next(e);
  }
}

async function fetchCookbookById(bookId: string): Promise<Cookbook> {
  const cookbook = await CookbookModel.findById(bookId);
  if(Utils.nou(cookbook)) {
    throw new NotFoundError(bookId);
  }
  return cookbook;
}
