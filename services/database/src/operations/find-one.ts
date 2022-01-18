import { restoreObjectId, stripObjectId } from '../utils';
import { getCollection } from './util';

export async function findOneOp(c: string, query: any): Promise<{data: any}> {
  const collection = await getCollection(c);
  const result = await collection.findOne(restoreObjectId(query));
  return {
    data: stripObjectId(result),
  }
  // return new Promise((resolve, reject) => {
  //   collection.findOne(restoreObjectId(query), (err, result) => {
  //     if(err) {
  //       reject(err);
  //     } else {
  //       resolve({
  //         data: stripObjectId(result)
  //       });
  //     }
  //   });
  // });
}
