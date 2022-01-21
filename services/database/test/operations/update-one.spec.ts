import expect from 'expect';
import http from 'http';
import 'mocha';
import { Db, MongoClient } from 'mongodb';
import { Environment } from 'recipiece-common';
import supertest from 'supertest';
import { databaseApp } from '../../src/app';
import { initDb } from '../db-helper';

describe('Update One Operation', function () {
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

  it('should not all data-less updates', async () => {
    const insertResponse = await superapp
      .post(`/${collectionName}/update-one`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({ query: {} });
    expect(insertResponse.status).toEqual(400);
  });

  it('should not all query-less updates', async () => {
    const insertResponse = await superapp
      .post(`/${collectionName}/update-one`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({ data: {} });
    expect(insertResponse.status).toEqual(400);
  });

  it('should not allow updates that violate key constraints', async () => {
    const collection = database.collection(collectionName);
    collection.createIndex({ name: 1 }, { unique: true });
    await collection.insertOne({
      name: 'test 1',
    });
    await collection.insertOne({
      name: 'test 2',
    });

    const updateResponse = await superapp
      .post(`/${collectionName}/update-one`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        data: {
          name: 'test 2',
        },
        query: {
          name: 'test 1',
        },
      });
    expect(updateResponse.status).toEqual(409);
  });

  it('should allow an item to be updated by a field', async () => {
    const collection = database.collection(collectionName);
    await collection.insertOne({
      name: 'test 1',
    });

    const updateResponse = await superapp
      .post(`/${collectionName}/update-one`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        data: {
          name: 'test 2',
        },
        query: {
          name: 'test 1',
        },
      });
    expect(updateResponse.status).toEqual(200);
    expect(updateResponse.body.data.name).toEqual('test 2');

    const noLongerExistingEntity = await collection.findOne({
      name: 'test 1',
    });
    expect(noLongerExistingEntity).toBeFalsy();

    const entity = await collection.findOne({
      name: 'test 2',
    });
    expect(entity).toBeTruthy();
  });

  it('should allow updates by id', async () => {
    const collection = database.collection(collectionName);
    const inserted = await collection.insertOne({
      name: 'test 1',
    });
    const expectedId = inserted.insertedId.toHexString();

    const updateResponse = await superapp
      .post(`/${collectionName}/update-one`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        data: {
          name: 'test 2',
          _id: expectedId,
        },
        query: {
          _id: expectedId,
        },
      });
    expect(updateResponse.status).toEqual(200);
    expect(updateResponse.body.data.name).toEqual('test 2');

    const noLongerExistingEntity = await collection.findOne({
      name: 'test 1',
    });
    expect(noLongerExistingEntity).toBeFalsy();

    const entity = await collection.findOne({
      name: 'test 2',
    });
    expect(entity).toBeTruthy();
  });

  it('should not update the created timestamp', async () => {
    const collection = database.collection(collectionName);
    const expectedBody = {
      name: 'test 1',
      created: 100,
    };
    const inserted = await collection.insertOne(expectedBody);
    const expectedId = inserted.insertedId.toHexString();

    const updateResponse = await superapp
      .post(`/${collectionName}/update-one`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        data: {
          name: 'test 2',
          created: 0,
          _id: expectedId,
        },
        query: {
          _id: expectedId,
        },
      });
    expect(updateResponse.status).toEqual(200);

    const actualBody = updateResponse.body.data;
    expect(actualBody.name).toEqual('test 2');

    const noLongerExistingEntity = await collection.findOne({
      name: 'test 1',
    });
    expect(noLongerExistingEntity).toBeFalsy();

    const entity = await collection.findOne({
      name: 'test 2',
    });
    expect(entity).toBeTruthy();
    expect(entity.created).toEqual(expectedBody.created);
  });
});
