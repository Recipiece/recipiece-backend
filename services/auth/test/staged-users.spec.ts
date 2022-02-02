import { randomUUID } from 'crypto';
import expect from 'expect';
import http from 'http';
import 'jest';
import { MongoClient } from 'mongodb';
import nock from 'nock';
import { DatabaseConstants, Environment, EnvironmentConstants, IUser } from 'recipiece-common';
import supertest from 'supertest';
// @ts-ignore
import { databaseApp } from '../../database/src/app';
import { authApp } from '../src/app';

describe('Staged Users', () => {
  let server: http.Server;
  let superapp: supertest.SuperTest<any>;
  let dbServer: http.Server;

  beforeAll(() => {
    dbServer = http.createServer(databaseApp);
    dbServer.listen(Environment.DB_SERIVCE_PORT, Environment.DB_SERVICE_NAME);

    server = http.createServer(authApp);
    superapp = supertest(server);
  });

  afterAll((done) => {
    dbServer.close(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(async () => {
    // @ts-ignore
    const connection = await MongoClient.connect(global.mongoUri);
    const database = connection.db(Environment.DB_NAME);
    try {
      await database.collection(DatabaseConstants.collections.users).drop();
    } catch {}
    try {
      await database.collection(DatabaseConstants.collections.stagedUsers).drop();
    } catch {}
  });

  describe('Staging a User', () => {
    beforeEach(() => {
      nock(Environment.EMAIL_SERVICE_URI).post('/send/signup').reply(200);
    });

    it('should be able to stage a user', async () => {
      const email = 'test@asdf.qwer';
      const username = 'test_user';
      const password = 'asdfqwer';

      const response = await superapp
        .post('/staged-users/stage')
        .set('Content-Type', 'application/json')
        .send({ username, email, password });
      expect(response.status).toEqual(201);
      expect(response.body.token).toBeTruthy();
      expect(response.body.username).toEqual(username);
      expect(response.body.email).toBeFalsy();
    });

    it('should not allow an existing email to be staged', async () => {
      const email = 'test@asdf.qwer';
      const username = 'test_user';
      const password = 'asdfqwer';

      // stage the user first
      const goodResponse = await superapp
        .post('/staged-users/stage')
        .set('Content-Type', 'application/json')
        .send({ email, username, password });
      expect(goodResponse.status).toEqual(201);

      // try and stage the email again, it should fail
      const badResponse = await superapp
        .post('/staged-users/stage')
        .set('Content-Type', 'application/json')
        .send({ email, password, username: 'different_username' });
      expect(badResponse.status).toEqual(409);
    });

    it('should not allow an existing staged username to be staged', async () => {
      const email = 'test@asdf.qwer';
      const username = 'test_user';
      const password = 'asdfqwer';

      // stage the user first
      const goodResponse = await superapp
        .post('/staged-users/stage')
        .set('Content-Type', 'application/json')
        .send({ email, username, password });
      expect(goodResponse.status).toEqual(201);

      // try and stage the username again, it should fail
      const badResponse = await superapp
        .post('/staged-users/stage')
        .set('Content-Type', 'application/json')
        .send({ email: 'different@email.com', password, username });
      expect(badResponse.status).toEqual(409);
    });
  });

  describe('Verifying a Staged User', () => {
    it('should not allow verification with an invalid token', async () => {
      // don't stage a user, just send a random token
      const token = randomUUID();

      const confirmResponse = await superapp
        .post('/staged-users/confirm')
        .set('Content-Type', 'application/json')
        .send({ token: token });
      expect(confirmResponse.status).toEqual(404);
    });

    it('should allow verification with a valid token', async () => {
      const email = 'test@asdf.qwer';
      const username = 'test_user';
      const password = 'asdfqwer';

      nock(Environment.EMAIL_SERVICE_URI).post('/send/signup').reply(200);

      const stageResponse = await superapp
        .post('/staged-users/stage')
        .set('Content-Type', 'application/json')
        .send({ username, email, password });
      const { token } = stageResponse.body;

      const confirmResponse = await superapp
        .post('/staged-users/confirm')
        .set('Content-Type', 'application/json')
        .send({ token: token });
      expect(confirmResponse.status).toEqual(204);

      // @ts-ignore
      const connection = await MongoClient.connect(global.mongoUri);
      const database = connection.db(Environment.DB_NAME);      
      const results = database.collection(DatabaseConstants.collections.users).find();
      const user = await results.next() as unknown as IUser;
      expect(user).toBeTruthy();
      expect(user._id).toBeTruthy();
      expect(user.username).toEqual(username);
      expect(user.email).toEqual(email);
    });

    it('should delete the staged user on verification', async () => {
      const email = 'test@asdf.qwer';
      const username = 'test_user';
      const password = 'asdfqwer';

      nock(Environment.EMAIL_SERVICE_URI).post('/send/signup').reply(200);

      const stageResponse = await superapp
        .post('/staged-users/stage')
        .set('Content-Type', 'application/json')
        .send({ username, email, password });
      const { token } = stageResponse.body;

      await superapp
        .post('/staged-users/confirm')
        .set('Content-Type', 'application/json')
        .send({ token: token });

      // @ts-ignore
      const connection = await MongoClient.connect(global.mongoUri);
      const database = connection.db(EnvironmentConstants.variables.dbName);      
      const results = database.collection(DatabaseConstants.collections.stagedUsers).find({});
      expect(await results.count()).toEqual(0);
    });
  });
});
