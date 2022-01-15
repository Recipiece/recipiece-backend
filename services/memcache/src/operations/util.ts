import { Utils } from "recipiece-common";
import { createClient, RedisClientType } from "redis";

let client: RedisClientType<any, any> = undefined;

export function getNsKey(rawKey: string): string {
  return `memcache:${rawKey}`;
}

export async function getConnection() {
  if(Utils.nou(client)) {
    client = createClient();
    client.on('error', (err) => {
      throw err;
    });
  }
  await client.connect();
  return client;
}
