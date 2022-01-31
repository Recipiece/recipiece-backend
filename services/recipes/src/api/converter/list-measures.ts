import { NextFunction, Response } from 'express';
import { AuthRequest, DatabaseConstants, DbI, IMeasure, MemI } from 'recipiece-common';

export async function listMeasures(_: AuthRequest, res: Response, next: NextFunction) {
  try {
    res.status(200).send({
      data: await listRecipieceMeasures(),
    });
  } catch (e) {
    next(e);
  }
}

export async function listRecipieceMeasures(): Promise<IMeasure[]> {
  const memKey = 'rcp-measures';
  const inMemcache = await MemI.memHas(memKey);
  let measures = [];
  if (!inMemcache) {
    let lastRequest: any = {
      more: true,
    };
    do {
      lastRequest = await DbI.queryEntity<IMeasure>(
        DatabaseConstants.collections.commonIngredients,
        {},
        lastRequest.page
      );
      measures.push(lastRequest.data);
    } while (lastRequest.more);
    await MemI.memSet(memKey, measures);
  } else {
    measures = await MemI.memGet<IMeasure[]>(memKey);
  }
  return measures;
}
