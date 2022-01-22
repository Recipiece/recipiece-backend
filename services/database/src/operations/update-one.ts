import * as E from 'express';
import { BadRequestError, Utils } from 'recipiece-common';
import { restoreObjectId, stripObjectId } from '../utils';
import { getCollection } from './util';

export async function updateOneOp(req: E.Request, res: E.Response, next: E.NextFunction) {
  const collectionName = req.params.collection;
  const entity = req.body.data;
  const query = req.body.query;

  if (Utils.nou(entity)) {
    next(new BadRequestError('data', 'undefined'));
  } else if (Utils.nou(query)) {
    next(new BadRequestError('query', 'undefined'));
  } else {
    try {
      const collection = await getCollection(collectionName);
      const entityCopy = restoreObjectId(Object.assign({}, entity));
      // don't update the created timestamp
      if ('created' in entityCopy) {
        delete entityCopy.created;
      }
      // don't update the _id
      if ('_id' in entityCopy) {
        delete entityCopy._id;
      }
      const updated = await collection.updateOne(restoreObjectId(query), { $set: entityCopy });
      if (updated.acknowledged) {
        res.status(200).send({
          data: stripObjectId(entityCopy),
        });
      } else {
        next(new Error('Could not update entity'));
      }
    } catch (e) {
      next(e);
    }
  }
}
