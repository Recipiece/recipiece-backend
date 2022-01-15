import { nou } from "../utils";
import { getConnection, getNsKey } from "./util";
import Cryo from 'cryo';

export async function get<T>(key: string): Promise<T | undefined> {
  const nsKey = getNsKey(key);
  const client = await getConnection();
  const fetched = await client.get(nsKey);
  if (!nou(fetched)) {
    return Promise.resolve(Cryo.parse(fetched));
  } else {
    return Promise.resolve(undefined);
  }
}