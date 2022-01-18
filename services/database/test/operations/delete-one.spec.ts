import 'mocha';
import expect from 'expect';
import { Collection, Db, MongoClient, ObjectId } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { initDb } from '../db-helper';
import { deleteOneOp } from '../../src/operations';

describe('Delete One Operation', () => {
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

  it('should delete a single entry by property', async () => {
    const collection = database.collection('test-collection');
    await collection.insertMany([
      {
        name: 'test 1',
      },
      {
        name: 'test 2',
      },
    ]);
    const deleted = await deleteOneOp('test-collection', {
      name: 'test 1',
    });
    expect(deleted.deleted).toBeTruthy();

    const fetched1 = await collection.findOne({
      name: 'test 1',
    });
    expect(fetched1).toBeFalsy();

    const fetched2 = await collection.findOne({
      name: 'test 2',
    });
    expect(fetched2).toBeTruthy();
  });

  it('should be able to delete an entity by stringy id', async () => {
    const collection = database.collection('test-collection');
    const insertedResponse = await collection.insertMany([
      {
        name: 'test 1',
      },
      {
        name: 'test 2',
      },
    ]);
    const insertedIds = [insertedResponse.insertedIds[0].toHexString(), insertedResponse.insertedIds[1].toHexString()];

    const response = await deleteOneOp('test-collection', {
      _id: insertedIds[0],
    });
    expect(response.deleted).toBeTruthy();
    
    const fetchedEntity = await collection.findOne({
      _id: new ObjectId(insertedIds[0]),
    });
    expect(fetchedEntity).toBeFalsy();
  });
});
