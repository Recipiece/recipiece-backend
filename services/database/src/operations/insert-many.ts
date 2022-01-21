import * as E from 'express';
import { BadRequestError, Utils } from 'recipiece-common';
import { restoreObjectId } from '../utils';
import { getCollection } from './util';

export async function insertManyOp(req: E.Request, res: E.Response, next: E.NextFunction) {
  const collectionName = req.params.collection;
  const entities = req.body.data;
  if (Utils.nou(entities)) {
    next(new BadRequestError('data', 'undefined'));
  } else {
    const mappedEntities = entities.map((e: any) => restoreObjectId(e));
    try {
      const collection = await getCollection(collectionName);
      const inserted = await collection.insertMany(mappedEntities);
      const responseEntities = entities.map((e: any, idx: number) => {
        e._id = inserted.insertedIds[idx].toHexString();
        return e;
      });
      res.status(201).send({
        data: responseEntities,
      });
    } catch (e) {
      next(e);
    }
  }
}
