import expect from 'expect';
import http from 'http';
import 'mocha';
import { Db, MongoClient } from 'mongodb';
import { Environment } from 'recipiece-common';
import supertest from 'supertest';
import { databaseApp } from '../../src/app';
import { initDb } from '../db-helper';

describe('Find One Operation', function () {
  this.timeout(10000);
  let server: http.Server;
  let superapp: supertest.SuperTest<any>;
  let connection: MongoClient;
  let database: Db;
  const collectionName = 'test-collection';

  before(async () => {
    ({ connection, database } = await initDb());
    server = http.createServer(databaseApp);
    superapp = supertest(server);
  });

  after(() => {
    if (!!connection) {
      connection.close();
    }
    if (!!server) {
      server.close();
    }
  });

  afterEach(async () => {
    try {
      const collection = database.collection(collectionName);
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
