import { ObjectId } from 'mongodb';
import { Environment, Utils } from 'recipiece-common';
import { restoreObjectId, stripObjectId } from '../utils';
import { getCollection } from './util';

export async function findOp(
  c: string,
  query: any,
  page?: string
): Promise<{ data: any[]; page: string; more: boolean }> {
  const collection = await getCollection(c);
  const mappedQuery = restoreObjectId(query);
  let cursor;
  if (Utils.nou(page)) {
    cursor = collection.find(mappedQuery).limit(Environment.DB_PAGE_SIZE + 1);
  } else {
    cursor = collection.find({
      ...mappedQuery,
      _id: {...mappedQuery._id || {}, $gte: new ObjectId(page)}
    }).limit(Environment.DB_PAGE_SIZE + 1);
  }
  const more = await cursor.count() > Environment.DB_PAGE_SIZE;
  const data = (await cursor.toArray()).map((v) => stripObjectId(v));
  let newPage = undefined;
  if(more) {
    newPage = data.pop()._id;
  }
  return { data, page: newPage, more };
}
