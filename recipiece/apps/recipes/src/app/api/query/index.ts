import { Utils } from '@recipiece/common';
import { AuthRequest } from '@recipiece/middleware';

export * from './cookbook-query';
export * from './recipe-query';

export function getCursor(request: AuthRequest): number | undefined {
  const queryCursor = request.query?.cursor;
  let cursor: number | undefined;
  if (!Utils.nou(queryCursor)) {
    cursor = +cursor;
  } else {
    cursor = undefined;
  }
  return cursor;
}
