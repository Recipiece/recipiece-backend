import 'mocha';
import expect from 'expect';
import { Collection, Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { initDb } from '../db-helper';
import { findOneOp } from '../../src/operations';

describe('Find One Operation', () => {
  let mongod: MongoMemoryServer;
  let connection: MongoClient;
  let database: Db;

  before(async () => {
    ({ mongod, connection, database } = await initDb());
  });

  after(async () => {
    if (!!connection) {
      connection.close();
    }
  });

  afterEach(async () => {
    try {
      const collection = database.collection('test-collection');
      await collection.drop();
    } catch {}
  });

  it('should be able to retrieve a record by stringy id', async () => {
    const collection = database.collection('test-collection');
    const insertedId = (
      await collection.insertOne({
        name: 'asdfqwer',
      })
    ).insertedId.toHexString();

    const foundBundle = await findOneOp('test-collection', { _id: insertedId });
    expect(foundBundle.data).toEqual({
      _id: insertedId,
      name: 'asdfqwer',
    });
  });

  it('should be able to retrieve a record by a field', async () => {
    const collection = database.collection('test-collection');
    const insertedId = (
      await collection.insertOne({
        name: 'asdfqwer',
      })
    ).insertedId.toHexString();

    const foundBundle = await findOneOp('test-collection', { name: 'asdfqwer' });
    expect(foundBundle.data).toEqual({
      _id: insertedId,
      name: 'asdfqwer',
    });
  });
});
