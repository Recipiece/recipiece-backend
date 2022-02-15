import * as E from 'express';
import {
  AuthRequest,
  Cookbook,
  CookbookModel,
  Environment,
  ICookbook,
  IPagedResponse,
  UnauthorizedError
} from 'recipiece-common';

export async function listCookbooksForUser(req: AuthRequest, res: E.Response, next: E.NextFunction) {
  try {
    res.status(200).send(await listCookbooks(req.params.userId, req.user.id, req.query));
  } catch (e) {
    next(e);
  }
}

async function listCookbooks(userId: string, requestingId: string, query: any): Promise<IPagedResponse<ICookbook>> {
  if (userId !== requestingId) {
    throw new UnauthorizedError();
  }

  // const userId = req.params.userId;
  // if (userId !== req.user._id) {
  //   throw new UnauthorizedError();
  // }

  const requestQuery: any = {
    owner: userId,
  };
  const trimmedName = (query?.name || '').toString().trim();
  if (trimmedName !== '') {
    requestQuery.name = {
      $regex: trimmedName,
      $options: 'i',
    };
  }

  const page = await CookbookModel.paginate(requestQuery, {
    limit: Environment.DB_PAGE_SIZE,
    page: +(query?.page || '0'),
  });
  const data = (page.data || []).map((d: ICookbook) => new CookbookModel(d)).map((cm: Cookbook) => cm.asJson());
  return {
    data: data,
    page: page.nextPage,
    more: page.hasNextPage,
  };
}
