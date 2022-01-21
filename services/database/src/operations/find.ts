import * as E from 'express';
import { ObjectId } from 'mongodb';
import { BadRequestError, Environment, Utils } from 'recipiece-common';
import { restoreObjectId, stripObjectId } from '../utils';
import { getCollection } from './util';

export async function findOp(req: E.Request, res: E.Response, next: E.NextFunction) {
  const collectionName = req.params.collection;
  const page = req.query?.page as string | undefined;
  const query = req.body.query;
  if (Utils.nou(query)) {
    next(new BadRequestError('query', 'undefined'));
  } else {
    try {
      const collection = await getCollection(collectionName);
      let mappedQuery = restoreObjectId(query);
      if (!Utils.nou(page)) {
        mappedQuery = {
          ...mappedQuery,
          _id: { ...(mappedQuery._id || {}), $gte: new ObjectId(page) },
        };
      }
      const cursor = collection.find(mappedQuery).limit(Environment.DB_PAGE_SIZE + 1);
      const more = (await cursor.count()) > Environment.DB_PAGE_SIZE;
      const data = (await cursor.toArray()).map((v) => stripObjectId(v));
      let newPage = undefined;
      if (more) {
        newPage = data.pop()._id;
      }
      res.status(200).send({ data, page: newPage, more });
    } catch (e) {
      next(e);
    }
  }
}
