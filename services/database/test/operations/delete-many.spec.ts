import expect from 'expect';
import http from 'http';
import 'mocha';
import { Db, MongoClient } from 'mongodb';
import { Environment } from 'recipiece-common';
import supertest from 'supertest';
import { databaseApp } from '../../src/app';
import { initDb } from '../db-helper';

describe('Delete Many Operation', function () {
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
      .post(`/${collectionName}/delete-many`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({});
    expect(deletedResponse.status).toEqual(400);
  });
  
  it('should delete multiple items based on a query', async () => {
    const collection = database.collection(collectionName);
    const values = [];
    for (let i = 0; i < 150; i++) {
      values.push({
        name: `test ${i}`,
      });
    }
    collection.insertMany(values);

    const deletedResponse = await superapp
      .post(`/${collectionName}/delete-many`)
      .set('authorization', `Bearer ${Environment.INTERNAL_USER_TOKEN}`)
      .send({
        query: {
          name: {
            $regex: /test \d{2,3}/.source,
          },
        },
      });
    expect(deletedResponse.status).toEqual(200);
    expect(deletedResponse.body.deleted).toBeLessThan(150);

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
