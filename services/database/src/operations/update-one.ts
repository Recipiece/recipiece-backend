import { restoreObjectId, stripObjectId } from "../utils";
import { getCollection } from "./util";

export async function updateOneOp(c: string, query: any, entity: any) {
  const collection = await getCollection(c);
  const entityCopy = {
    ...entity,
  }
  if('created' in entityCopy) {
    delete entityCopy.created;
  }
  if('_id' in entityCopy) {
    delete entityCopy._id;
  }
  const updated = await collection.updateOne(restoreObjectId(query), entityCopy);
  if(updated.acknowledged) {
    return {
      data: entity,
    }
  } else {
    throw new Error('Could not update entity');
  }
}