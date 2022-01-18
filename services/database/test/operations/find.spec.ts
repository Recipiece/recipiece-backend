import expect from 'expect';
import 'mocha';
import { Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Environment } from 'recipiece-common';
import { findOp } from '../../src/operations';
import { initDb } from '../db-helper';

describe('Find Operation', () => {
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

  it('should filter on a query', async () => {
    const collection = database.collection('test-collection');
    await collection.insertMany([
      {
        name: 'test1',
      },
      {
        name: 'test2',
      },
      {
        name: 'test3',
      },
    ]);
    const results = await findOp('test-collection', { name: 'test1' });
    expect(results.data.length).toEqual(1);

    const obj = results.data[0];
    expect(obj.name).toEqual('test1');
    expect(obj._id).toBeTruthy();

    expect(results.page).toBeFalsy();
    expect(results.more).toBeFalsy();
  });

  it('should set the more flag if there is more data', async () => {
    const pageSize = Environment.DB_PAGE_SIZE;
    const values = [];
    for (let i = 0; i < pageSize * 2; i++) {
      values.push({
        name: `test ${i}`,
      });
    }
    const collection = database.collection('test-collection');
    await collection.insertMany(values);
    const results = await findOp('test-collection', {
      name: {
        $regex: /test\s*\d*/,
      },
    });
    expect(results.data.length).toEqual(pageSize);
    expect(results.more).toBeTruthy();
  });

  it('should set the more flag if there is no more data', async () => {
    const pageSize = Environment.DB_PAGE_SIZE;
    const values = [];
    for (let i = 0; i < pageSize * 2; i++) {
      values.push({
        name: `test ${i}`,
      });
    }
    const collection = database.collection('test-collection');
    await collection.insertMany(values);
    const results = await findOp('test-collection', {
      name: {
        $regex: /test 1\d1/,
      },
    });
    expect(results.data.length).toBeLessThan(pageSize);
    expect(results.more).toBeFalsy();
  });

  it('should allow paging', async () => {
    const pageSize = Environment.DB_PAGE_SIZE;
    const values = [];
    for (let i = 0; i < pageSize * 2; i++) {
      values.push({
        name: `test ${i}`,
      });
    }
    const collection = database.collection('test-collection');
    await collection.insertMany(values);

    const firstPage = await findOp('test-collection', {
      name: {
        $regex: /test \d+/,
      },
    });

    expect(firstPage.data.length).toEqual(pageSize);
    expect(firstPage.data[firstPage.data.length - 1].name).toEqual(values[99].name);
    expect(firstPage.page).toBeTruthy();

    const secondPage = await findOp(
      'test-collection',
      {
        name: {
          $regex: /test \d+/,
        },
      },
      firstPage.page
    );
    expect(secondPage.data.length).toEqual(pageSize);
    expect(secondPage.data[0].name).toEqual(values[100].name);
    expect(secondPage.page).toBeFalsy();
  });
});
