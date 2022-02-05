import mongoose from 'mongoose';
import { Environment } from '../environment';
import { nou } from '../utils';

export async function connect() {
  // @ts-ignore
  if (nou(global._rcpMongooseConnection)) {
    const username = Environment.DB_USER;
    const password = Environment.DB_PASSWORD;
    const host = Environment.DB_HOST;
    const port = Environment.DB_PORT;
    const dbName = Environment.DB_NAME;
    const uri = `mongodb://${host}:${port}`;

    const mongooseConnection = await mongoose.connect(uri, {
      user: username,
      pass: password,
      dbName: dbName,
      authSource: 'admin',
      bufferCommands: false,
    });
    mongooseConnection.connection.on('disconnected', () => {
      // @ts-ignore
      global._rcpMongooseConnection = undefined;
    });
    // @ts-ignore
    global._rcpMongooseConnection = true;
  }
}

