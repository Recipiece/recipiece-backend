import expect from 'expect';
import http from 'http';
import 'mocha';
import { Db, MongoClient } from 'mongodb';
import { Environment } from 'recipiece-common';
import supertest from 'supertest';
import { databaseApp } from '../../src/app';
import { initDb } from '../db-helper';

describe('Insert One Operation', function () {
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

  it('should allow an item to be inserted', async () => {
    const insertResponse = await superapp
      .post(`/${collectionName}/insert-one`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        data: {
          name: 'test 1',
        },
      });
    expect(insertResponse.status).toEqual(201);
    const { data } = insertResponse.body;

    expect(data.name).toEqual('test 1');
    expect(data._id).toBeTruthy();
  });

  it('should not all data-less insertions', async () => {
    const insertResponse = await superapp
      .post(`/${collectionName}/insert-one`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({});
    expect(insertResponse.status).toEqual(400);
  });

  it('should prevent insertion of items violating key constraints', async () => {
    const collection = database.collection(collectionName);
    await collection.createIndex({ name: 1 }, { unique: true });
    const insertResponse = await superapp
      .post(`/${collectionName}/insert-one`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        data: {
          name: 'test 1',
        },
      });
    expect(insertResponse.status).toEqual(201);

    const duplicateInsertResponse = await superapp
      .post(`/${collectionName}/insert-one`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        data: {
          name: 'test 1',
        },
      });
    expect(duplicateInsertResponse.status).toEqual(409);
  });
});
