import { getConnection, getNsKey } from './util';

export async function memhas(key: string): Promise<boolean> {
  const nsKey = getNsKey(key);
  const client = await getConnection();
  return (await client.exists(nsKey)) !== 0;
}
