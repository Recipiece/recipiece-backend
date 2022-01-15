import { Collection, MongoClient } from 'mongodb';
import { Environment } from '@common/environment';
import { nou } from '@common/utils';

let client: MongoClient = undefined;

export async function getCollection(collection: string): Promise<Collection> {
  if (nou(client)) {
    const username = Environment.DB_USER;
    const password = Environment.DB_PASSWORD;
    const host = Environment.DB_HOST;
    const port = Environment.DB_PORT;
    client = new MongoClient(`mongodb://${username}:${password}@${host}:${port}`);
  }
  await client.connect();
  const db = client.db(Environment.DB_NAME);
  return db.collection(collection);
}
