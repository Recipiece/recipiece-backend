import { ObjectId } from 'mongodb';
import { IBaseModel } from '@common/model';
import { getCollection } from './util';

export async function updateEntity<T extends IBaseModel>(c: string, entity: Partial<T>): Promise<Partial<T>> {
  const copy = { ...entity };
  const idToUpdate = new ObjectId(entity['id']);
  // sanitize out the id and the created time
  delete copy['id'];
  delete copy['created'];
  // sanitize out the owner if we need to
  // @ts-ignore
  if (!nou(copy.owner)) {
    // @ts-ignore
    delete copy.owner;
  }
  const collection = await getCollection(c);
  await collection.updateOne({ _id: idToUpdate }, copy);
  return {
    ...entity,
  };
}
