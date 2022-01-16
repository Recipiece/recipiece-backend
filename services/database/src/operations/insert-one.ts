import { stripObjectId } from '../utils';
import { getCollection } from './util';

export async function insertOneOp(c: string, entity: any): Promise<any> {
  const collection = await getCollection(c);
  const response = await collection.insertOne(entity);
  const copy = stripObjectId({
    ...entity,
    _id: response.insertedId,
  });
  return {
    data: copy,
  }
}
