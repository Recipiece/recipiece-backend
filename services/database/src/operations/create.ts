import { IBaseModel } from '@common/model';
import { getCollection } from './util';

export async function createEntity<T extends IBaseModel>(c: string, entity: Partial<T>): Promise<Partial<T>> {
  const collection = await getCollection(c);
  const copy = { ...entity };
  copy.created = Date.now();
  const insertedId = (await collection.insertOne(copy)).insertedId;
  return {
    ...copy,
    id: insertedId.toHexString(),
  };
}
