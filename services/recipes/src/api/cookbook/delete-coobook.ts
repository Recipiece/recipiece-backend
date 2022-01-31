import * as E from 'express';
import { AuthRequest, Cookbook, UnauthorizedError } from 'recipiece-common';
import { fetchCookbookById } from './get-cookbook';

export async function deleteCookbook(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  let cookbook: Cookbook;
  try {
    cookbook = await fetchCookbookById(req.params.bookId);
  } catch(e) {
    next(e);
    return;
  }
  if(cookbook.owner !== req.user._id) {
    next(new UnauthorizedError());
  } else {
    await cookbook.delete();
    res.status(204).send();
  }
}
