import { restoreObjectId } from "../utils";
import { getCollection } from "./util";

export async function deleteOneOp(c: string, query: any): Promise<{deleted: number}> {
  const collection = await getCollection(c);
  const response = await collection.deleteOne(restoreObjectId(query));
  return {
    deleted: response.deletedCount,
  }
}
