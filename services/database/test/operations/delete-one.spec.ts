import expect from 'expect';
import http from 'http';
import 'mocha';
import { Db, MongoClient, ObjectId } from 'mongodb';
import { Environment } from 'recipiece-common';
import supertest from 'supertest';
import { databaseApp } from '../../src/app';
import { initDb } from '../db-helper';

describe('Delete One Operation', function () {
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
    const deletedResponse = await superapp
      .post(`/${collectionName}/delete-one`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({});
    expect(deletedResponse.status).toEqual(400);
  });

  it('should delete a single entry by property', async () => {
    const collection = database.collection(collectionName);
    await collection.insertMany([
      {
        name: 'test 1',
      },
      {
        name: 'test 2',
      },
    ]);
    const deleteResponse = await superapp
      .post(`/${collectionName}/delete-one`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        query: {
          name: 'test 1',
        },
      });
    expect(deleteResponse.body.deleted).toEqual(1);

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
    const collection = database.collection(collectionName);
    const insertedResponse = await collection.insertMany([
      {
        name: 'test 1',
      },
      {
        name: 'test 2',
      },
    ]);
    const insertedIds = [insertedResponse.insertedIds[0].toHexString(), insertedResponse.insertedIds[1].toHexString()];

    const deleteResponse = await superapp
      .post(`/${collectionName}/delete-one`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        query: {
          _id: insertedIds[0],
        },
      });

    expect(deleteResponse.body.deleted).toEqual(1);

    const fetchedEntity = await collection.findOne({
      _id: new ObjectId(insertedIds[0]),
    });
    expect(fetchedEntity).toBeFalsy();
  });
});
