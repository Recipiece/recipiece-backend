import { getCollection } from "./util";

export async function deleteOneOp(c: string, query: any) {
  const collection = await getCollection(c);
  const response = await collection.deleteOne(query);
  return {
    deleted: response.acknowledged,
  }
}
