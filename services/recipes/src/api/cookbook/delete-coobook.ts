import * as E from 'express';
import { AuthRequest, CookbookModel, NotFoundError, UnauthorizedError, Utils } from 'recipiece-common';

export async function deleteCookbook(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  try {
    await runDelete(req.params.bookId, req.user.id);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}

async function runDelete(cookbookId: string, userId: string) {
  const cookbook = await CookbookModel.findById(cookbookId);
  if (Utils.nou(cookbook)) {
    throw new NotFoundError(cookbookId);
  }
  if (cookbook.owner !== userId) {
    throw new UnauthorizedError();
  }
  await cookbook.delete();
}
