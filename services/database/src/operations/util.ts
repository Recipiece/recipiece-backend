import { Collection, MongoClient } from 'mongodb';
import { Environment, Utils } from 'recipiece-common';

let client: MongoClient | undefined = undefined;

export async function getCollection(collection: string): Promise<Collection> {
  if (Utils.nou(client)) {
    const username = Environment.DB_USER;
    const password = Environment.DB_PASSWORD;
    const host = Environment.DB_HOST;
    const port = Environment.DB_PORT;
    const uri = `mongodb://${username}:${password}@${host}:${port}`;
    client = new MongoClient(uri);
  }
  await client!.connect();
  const db = client!.db(Environment.DB_NAME);
  return db.collection(collection);
}
