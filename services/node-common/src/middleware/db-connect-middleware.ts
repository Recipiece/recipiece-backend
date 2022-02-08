import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Environment } from '../environment';
import { nou } from '../utils';

let mongooseConnection: mongoose.Connection;

export async function dbConnectMiddleware(req: Request, res: Response, next: NextFunction) {
  await getMongooseConnection();
  next();
}

export async function getMongooseConnection(): Promise<mongoose.Connection> {
  // @ts-ignore
  if (nou(global._rcpMongooseConnection)) {
    const username = Environment.DB_USER;
    const password = Environment.DB_PASSWORD;
    const host = Environment.DB_HOST;
    const port = Environment.DB_PORT;
    const dbName = Environment.DB_NAME;
    const uri = `mongodb://${host}:${port}`;

    await mongoose.connect(uri, {
      user: username,
      pass: password,
      dbName: dbName,
      authSource: 'admin',
      bufferCommands: false,
    });
    mongooseConnection = mongoose.connection;
    mongooseConnection.on('disconnected', () => {
      // @ts-ignore
      global._rcpMongooseConnection = undefined;
    });
    // @ts-ignore
    global._rcpMongooseConnection = true;
  }
  return mongooseConnection;
}
