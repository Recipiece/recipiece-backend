import { getCollection } from './util';

export async function deleteManyOp(c: string, query: any) {
  const collection = await getCollection(c);
  const response = await collection.deleteMany(query);
  return {
    deleted: response.acknowledged,
  };
}
