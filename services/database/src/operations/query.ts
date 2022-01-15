import { ObjectId } from 'mongodb';
import { getCollection } from './util';

export async function* queryEntities(c: string, query: any) {
  const collection = await getCollection(c);
  const queryCopy = {...query};
  if('id' in queryCopy) {
    queryCopy['_id'] = new ObjectId(queryCopy.id);
    delete queryCopy['id'];
  }
  const cursor = collection.find(query);
  yield await cursor.next();
}
