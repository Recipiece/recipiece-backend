import 'mocha';
import expect from 'expect';
import { Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { initDb } from '../db-helper';
import { deleteManyOp } from '../../src/operations';

describe('Delete Many Operation', () => {
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

  it('should delete multiple items based on a query', async () => {
    const collection = database.collection('test-collection');
    const values = [];
    for (let i = 0; i < 150; i++) {
      values.push({
        name: `test ${i}`,
      });
    }
    collection.insertMany(values);

    const deleted = await deleteManyOp('test-collection', {
      name: {
        $regex: /test \d{2,3}/,
      },
    });
    expect(deleted.deleted).toBeTruthy();

    const retrievedItems = collection.find({
      name: {
        $regex: /test \d{2,3}/,
      },
    });
    expect(await retrievedItems.count()).toEqual(0);

    const nonDeleted = await collection.findOne({
      name: 'test 1',
    });
    expect(nonDeleted).toBeTruthy();
  });
});
