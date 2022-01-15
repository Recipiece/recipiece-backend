import { getConnection, getNsKey } from "./util";

export async function del(key: string): Promise<void> {
  const nsKey = getNsKey(key);
  const client = await getConnection();
  await client.del(nsKey);
}
