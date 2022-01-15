import { createClient, RedisClientType } from "redis";
import { nou } from "../utils";

let client: RedisClientType<any> = undefined;

export function getNsKey(rawKey: string): string {
  return `memcache:${rawKey}`;
}

export async function getConnection() {
  if(nou(client)) {
    client = createClient();
    client.on('error', (err) => {
      throw err;
    });
  }
  await client.connect();
  return client;
}
