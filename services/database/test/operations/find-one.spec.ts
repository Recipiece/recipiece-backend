import expect from 'expect';
import http from 'http';
import 'jest';
import { Db, MongoClient } from 'mongodb';
import { Environment, EnvironmentConstants } from 'recipiece-common';
import supertest from 'supertest';
import { databaseApp } from '../../src/app';

describe('Find One Operation', () => {
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
      .post(`/${collectionName}/find-one`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({});
    expect(findResponse.status).toEqual(400);
  });

  it('should be able to retrieve a record by stringy id', async () => {
    const collection = database.collection(collectionName);
    const insertedId = (
      await collection.insertOne({
        name: 'asdfqwer',
      })
    ).insertedId.toHexString();

    const findResponse = await superapp
      .post(`/${collectionName}/find-one`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        query: {
          _id: insertedId,
        },
      });
    expect(findResponse.status).toEqual(200);
    expect(findResponse.body.data).toEqual({
      _id: insertedId,
      name: 'asdfqwer',
    });

    // const foundBundle = await findOneOp('test-collection', { _id: insertedId });
    // expect(foundBundle.data).toEqual({
    //   _id: insertedId,
    //   name: 'asdfqwer',
    // });
  });

  it('should be able to retrieve a record by a field', async () => {
    const collection = database.collection(collectionName);
    const insertedId = (
      await collection.insertOne({
        name: 'asdfqwer',
      })
    ).insertedId.toHexString();

    const findResponse = await superapp
      .post(`/${collectionName}/find-one`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        query: {
          _id: insertedId,
        },
      });
    expect(findResponse.status).toEqual(200);
    expect(findResponse.body.data).toEqual({
      _id: insertedId,
      name: 'asdfqwer',
    });
  });
});
