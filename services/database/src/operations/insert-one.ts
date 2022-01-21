import * as E from 'express';
import { BadRequestError, Utils } from 'recipiece-common';
import { stripObjectId } from '../utils';
import { getCollection } from './util';

export async function insertOneOp(req: E.Request, res: E.Response, next: E.NextFunction) {
  const collectionName = req.params.collection;
  const entity = req.body.data;
  if (Utils.nou(entity)) {
    next(new BadRequestError('data', 'undefined'));
  } else {
    try {
      const collection = await getCollection(collectionName);
      const response = await collection.insertOne(entity);
      const copy = stripObjectId({
        ...entity,
        _id: response.insertedId,
      });
      res.status(201).send({
        data: copy,
      });
    } catch (e) {
      next(e);
    }
  }
}
