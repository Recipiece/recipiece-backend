import { ObjectId } from "mongodb";
import { getCollection } from "./util";

export async function deleteEntity(c: string, id: string) {
  const collection = await getCollection(c);
  await collection.deleteOne({'_id': new ObjectId(id)});
}
