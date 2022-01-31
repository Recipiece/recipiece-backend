import * as E from 'express';
import { AuthRequest, Cookbook } from 'recipiece-common';

export async function createCookbook(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  try {
    const cookbook = await new Cookbook({
      ...req.body,
      owner: req.user._id,
    }).save();
    res.status(200).send(cookbook.asModel());
  } catch (e) {
    next(e);
  }
}
