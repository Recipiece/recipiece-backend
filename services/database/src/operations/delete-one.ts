import * as E from 'express';
import { BadRequestError, Utils } from 'recipiece-common';
import { restoreObjectId } from '../utils';
import { getCollection } from './util';

export async function deleteOneOp(req: E.Request, res: E.Response, next: E.NextFunction) {
  const collectionName = req.params.collection;
  const bodyQuery = req.body.query;
  if (Utils.nou(bodyQuery)) {
    next(new BadRequestError('query', 'undefined'));
  } else {
    const query = restoreObjectId(bodyQuery);
    try {
      const collection = await getCollection(collectionName);
      const response = await collection.deleteOne(query);
      res.status(200).send({
        deleted: response.deletedCount,
      });
    } catch (e) {
      next(e);
    }
  }
}
