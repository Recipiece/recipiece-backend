import { Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { EnvironmentConstants } from 'recipiece-common';

export async function initDb() {
  const mongod = await MongoMemoryServer.create({
    instance: {
      port: 4444,
      dbName: EnvironmentConstants.defaults.dbName,
      auth: true,
    },
    auth: {
      customRootName: EnvironmentConstants.defaults.dbUser,
      customRootPwd: EnvironmentConstants.defaults.dbPassword,
    },
  });
  const connection = await MongoClient.connect(mongod.getUri());
  const database = connection.db(EnvironmentConstants.defaults.dbName);
  process.env[EnvironmentConstants.variables.dbPort] = '4444';
  process.env[EnvironmentConstants.variables.dbHost] = '127.0.0.1';

  return {mongod, connection, database};
}