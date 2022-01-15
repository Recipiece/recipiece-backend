import Cryo from 'cryo';
import { Environment } from '../environment';
import { nou } from '../utils';
import { getConnection, getNsKey } from './util';

export async function set<T>(key: string, value: T, expiry = Environment.MEMCACHE_EXP): Promise<void> {
  const nsKey = getNsKey(key);
  const client = await getConnection();
  const serialized = Cryo.stringify(value);
  if (nou(expiry)) {
    await client.set(nsKey, serialized);
  } else {
    await client.setEx(nsKey, expiry, serialized);
  }
  return Promise.resolve();
}
