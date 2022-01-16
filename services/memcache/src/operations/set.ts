// @ts-ignore
import Cryo from 'cryo';
import { Environment, Utils } from 'recipiece-common';
import { getConnection, getNsKey } from './util';

export async function memset<T>(key: string, value: T, expiry = Environment.MEMCACHE_EXP): Promise<void> {
  const nsKey = getNsKey(key);
  const client = await getConnection();
  const serialized = Cryo.stringify(value);
  if (Utils.nou(expiry)) {
    await client.set(nsKey, serialized);
  } else {
    await client.setEx(nsKey, expiry, serialized);
  }
  return Promise.resolve();
}
