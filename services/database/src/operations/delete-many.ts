import { getCollection } from './util';

export async function deleteManyOp(c: string, query: any): Promise<{deleted: number}> {
  const collection = await getCollection(c);
  const response = await collection.deleteMany(query);
  return {
    deleted: response.deletedCount,
  };
}
