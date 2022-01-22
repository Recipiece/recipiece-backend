import expect from 'expect';
import http from 'http';
import 'jest';
import { Db, MongoClient } from 'mongodb';
import { Environment, EnvironmentConstants } from 'recipiece-common';
import supertest from 'supertest';
import { databaseApp } from '../../src/app';

describe('Insert Many Operation', () => {
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

  it('should allow items to be inserted', async () => {
    const insertResponse = await superapp
      .post(`/${collectionName}/insert-many`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        data: [
          {
            name: 'test 1',
          },
          {
            name: 'test 2',
          },
        ],
      });
    expect(insertResponse.status).toEqual(201);
    const { data } = insertResponse.body;

    expect(data.length).toEqual(2);
    expect(data[0].name).toEqual('test 1');
    expect(data[0]._id).toBeTruthy();
    expect(data[1].name).toEqual('test 2');
    expect(data[1]._id).toBeTruthy();

    const collection = database.collection(collectionName);
    const allItems = await collection.find().toArray();
    expect(allItems.length).toEqual(2);
  });

  it('should not all data-less insertions', async () => {
    const insertResponse = await superapp
      .post(`/${collectionName}/insert-many`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({});
    expect(insertResponse.status).toEqual(400);
  });

  it('should prevent insertion of items violating key constraints', async () => {
    const collection = database.collection(collectionName);
    await collection.createIndex({ name: 1 }, { unique: true });
    const insertResponse = await superapp
      .post(`/${collectionName}/insert-many`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        data: [
          {
            name: 'test 1',
          },
        ],
      });
    expect(insertResponse.status).toEqual(201);

    const duplicateInsertResponse = await superapp
      .post(`/${collectionName}/insert-many`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        data: [
          {
            name: 'test 1',
          },
        ],
      });
    expect(duplicateInsertResponse.status).toEqual(409);
  });
});
