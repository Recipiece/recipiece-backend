import expect from 'expect';
import http from 'http';
import 'jest';
import { Db, MongoClient } from 'mongodb';
import { Environment, EnvironmentConstants } from 'recipiece-common';
import supertest from 'supertest';
import { databaseApp } from '../../src/app';

describe('Find Operation', () => {
  let server: http.Server;
  let superapp: supertest.SuperTest<any>;
  let connection: MongoClient;
  let database: Db;
  const collectionName = 'test-collection';

  beforeAll(async () => {
    // @ts-ignore
    connection = await MongoClient.connect(global.mongoUri);
    database = connection.db(EnvironmentConstants.variables.dbName);
    server = http.createServer(databaseApp);
    superapp = supertest(server);
  });

  afterAll(() => {
    if (!!connection) {
      connection.close();
    }
    if (!!server) {
      server.close();
    }
  });

  beforeEach(async () => {
    try {
      await database.createCollection(collectionName);
    } catch {}
  });

  afterEach(async () => {
    const collection = database.collection(collectionName);
    try {
      await collection.drop();
    } catch {}
  });

  it('should not allow a query-less request', async () => {
    const findResponse = await superapp
      .post(`/${collectionName}/find`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({});
    expect(findResponse.status).toEqual(400);
  });

  it('should send back an empty data array if there is no data', async () => {
    const collection = database.collection(collectionName);
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

    const findResponse = await superapp
      .post(`/${collectionName}/find`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        query: {
          name: 'not in the db',
        },
      });
    expect(findResponse.status).toEqual(200);
    const { data, page, more } = findResponse.body;
    expect(data).toEqual([]);
    expect(page).toBeFalsy();
    expect(more).toBeFalsy();
  });

  it('should filter on a query', async () => {
    const collection = database.collection(collectionName);
    await collection.insertMany([
      {
        name: 'test 1',
      },
      {
        name: 'test 2',
      },
      {
        name: 'test 3',
      },
    ]);
    const findResponse = await superapp
      .post(`/${collectionName}/find`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        query: {
          name: 'test 1',
        },
      });
    expect(findResponse.status).toEqual(200);
    const { data, page, more } = findResponse.body;

    const obj = data[0];
    expect(obj.name).toEqual('test 1');
    expect(obj._id).toBeTruthy();

    expect(page).toBeFalsy();
    expect(more).toBeFalsy();
  });

  it('should set the more flag if there is more data', async () => {
    const pageSize = Environment.DB_PAGE_SIZE;
    const values = [];
    for (let i = 0; i < pageSize * 2; i++) {
      values.push({
        name: `test ${i}`,
      });
    }
    const collection = database.collection(collectionName);
    await collection.insertMany(values);
    const findResponse = await superapp
      .post(`/${collectionName}/find`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        query: {
          name: {
            $regex: /test \d+/.source,
          },
        },
      });
    expect(findResponse.status).toEqual(200);
    const { data, more } = findResponse.body;
    expect(data.length).toEqual(pageSize);
    expect(more).toBeTruthy();
  });

  it('should set the more flag if there is no more data', async () => {
    const pageSize = Environment.DB_PAGE_SIZE;
    const values = [];
    for (let i = 0; i < pageSize * 2; i++) {
      values.push({
        name: `test ${i}`,
      });
    }
    const collection = database.collection(collectionName);
    await collection.insertMany(values);
    const findResponse = await superapp
      .post(`/${collectionName}/find`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        query: {
          name: {
            $regex: /test 1\d1/.source,
          },
        },
      });
    expect(findResponse.status).toEqual(200);
    const { data, more } = findResponse.body;
    expect(data.length).toBeLessThan(pageSize);
    expect(more).toBeFalsy();
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

    const firstPageResponse = await superapp
      .post(`/${collectionName}/find`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        query: {
          name: {
            $regex: /test \d+/.source,
          },
        },
      });
    expect(firstPageResponse.status).toEqual(200);
    const firstPage = firstPageResponse.body;

    expect(firstPage.data.length).toEqual(pageSize);
    expect(firstPage.data[firstPage.data.length - 1].name).toEqual(values[99].name);
    expect(firstPage.page).toBeTruthy();

    const secondPageResponse = await superapp
      .post(`/${collectionName}/find?page=${firstPage.page}`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        query: {
          name: {
            $regex: /test \d+/.source,
          },
        },
      });
    expect(secondPageResponse.status).toEqual(200);
    const secondPage = secondPageResponse.body;

    expect(secondPage.data.length).toEqual(pageSize);
    expect(secondPage.data[0].name).toEqual(values[100].name);
    expect(secondPage.page).toBeFalsy();
  });
});
