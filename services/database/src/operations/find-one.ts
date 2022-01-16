import { restoreObjectId, stripObjectId } from '../utils';
import { getCollection } from './util';

export async function findOneOp(c: string, query: any): Promise<any> {
  const collection = await getCollection(c);
  return new Promise((resolve, reject) => {
    collection.findOne(restoreObjectId(query), (err, result) => {
      if(err) {
        reject(err);
      } else {
        resolve({
          data: stripObjectId(result)
        });
      }
    });
  });
}
