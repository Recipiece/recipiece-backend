import { restoreObjectId } from '../utils';
import { getCollection } from './util';

export async function insertManyOp(c: string, entities: any[]) {
  const mappedEntities = entities.map((e) => restoreObjectId(e));
  const collection = await getCollection(c);
  const inserted = await collection.insertMany(mappedEntities);
  const responseEntities = entities.map((e, idx) => {
    e._id = inserted.insertedIds[idx].toHexString();
    return e;
  });
  return {
    data: responseEntities,
  }
}
