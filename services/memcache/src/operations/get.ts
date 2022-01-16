import { getConnection, getNsKey } from './util';
import { Utils } from 'recipiece-common';
// @ts-ignore
import Cryo from 'cryo';

export async function memget<T>(key: string): Promise<T | undefined> {
  const nsKey = getNsKey(key);
  const client = await getConnection();
  const fetched = await client.get(nsKey);
  if (!Utils.nou(fetched)) {
    return Promise.resolve(Cryo.parse(fetched));
  } else {
    return Promise.resolve(undefined);
  }
}
