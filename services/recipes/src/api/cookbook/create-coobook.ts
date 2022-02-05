import * as E from 'express';
import { AuthRequest, CookbookModel } from 'recipiece-common';

export async function createCookbook(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  try {
    const cookbook = await new CookbookModel({
      ...req.body,
      owner: req.user.id,
    }).save();
    res.status(200).send(cookbook.asJson());
  } catch (e) {
    next(e);
  }
}
