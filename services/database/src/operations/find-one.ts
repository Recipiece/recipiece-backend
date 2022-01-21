import * as E from 'express';
import { BadRequestError, Utils } from 'recipiece-common';
import { restoreObjectId, stripObjectId } from '../utils';
import { getCollection } from './util';

export async function findOneOp(req: E.Request, res: E.Response, next: E.NextFunction) {
  const collectionName = req.params.collection;
  const bodyQuery = req.body.query;
  if (Utils.nou(bodyQuery)) {
    next(new BadRequestError('query', 'undefined'));
  } else {
    try {
      const collection = await getCollection(collectionName);
      const result = await collection.findOne(restoreObjectId(bodyQuery));
      res.status(200).send({
        data: stripObjectId(result),
      });
    } catch (e) {
      next(e);
    }
  }
}
