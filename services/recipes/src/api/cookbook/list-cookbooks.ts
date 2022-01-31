import * as E from 'express';
import { AuthRequest, DatabaseConstants, DbI, ICookbook, IPagedResult, UnauthorizedError } from 'recipiece-common';

export async function listCookbooksForUser(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  try {
    res.status(200).send(await listCookbooks(req));
  } catch (e) {
    next(e);
  }
}

async function listCookbooks(req: AuthRequest): Promise<IPagedResult<ICookbook>> {
  const userId = req.params.userId;
  if (userId !== req.user._id) {
    throw new UnauthorizedError();
  }

  const requestQuery: any = {
    owner: userId,
  };
  const trimmedName = (req.query?.name || '').toString().trim();
  if (trimmedName !== '') {
    requestQuery.name = {
      $regex: trimmedName,
      $options: 'i',
    };
  }

  const page = req.query?.page as string;
  return await DbI.queryEntity(DatabaseConstants.collections.recipeBooks, requestQuery, page);
}
