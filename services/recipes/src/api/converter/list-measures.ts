import { NextFunction, Response } from 'express';
import { AuthRequest, DatabaseConstants, DbI, IMeasure } from 'recipiece-common';

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
  const measures = await DbI.queryEntity<IMeasure>(DatabaseConstants.collections.measures, {});
  return measures.data;
}
