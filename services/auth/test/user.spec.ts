import http from 'http';
import 'jest';
import { MongoClient } from 'mongodb';
import nock from 'nock';
import { DatabaseConstants, Environment, IUser } from 'recipiece-common';
import supertest from 'supertest';
// @ts-ignore
import { databaseApp } from '../../database/src/app';
import { authApp } from '../src/app';

describe('Users', () => {
  const email = 'test@user.com';
  const username = 'test_user';
  const password = 'password1!';

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

  beforeEach(async () => {
    nock(Environment.EMAIL_SERVICE_URI).post('/send/signup').reply(200);
    // stage and verify a user
    const stageResponse = await superapp
      .post('/staged-users/stage')
      .set('Content-Type', 'application/json')
      .send({ username, password, email });
    const { token } = stageResponse.body;
    await superapp.post('/staged-users/confirm').set('Content-Type', 'application/json').send({ token: token });
  });

  describe('Login', () => {
    it('should allow users to log in by email', async () => {
      const response = await superapp
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send({ name: email, password: password });

      expect(response.status).toEqual(200);
      expect(response.body.token).toBeTruthy();
      const bodyUser: Partial<IUser> = response.body.user;
      expect(bodyUser._id).toBeTruthy();
      expect(bodyUser.username).toEqual(username);
    });

    it('should allow users to log in by username', async () => {
      const response = await superapp
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send({ name: username, password: password });

      expect(response.status).toEqual(200);
      expect(response.body.token).toBeTruthy();
      const bodyUser: Partial<IUser> = response.body.user;
      expect(bodyUser._id).toBeTruthy();
      expect(bodyUser.username).toEqual(username);
    });

    it('should not allow a valid user to login with a bad password', async () => {
      const response = await superapp
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send({ name: username, password: 'b@dp@55w0rd!' });

      expect(response.status).toEqual(401);
    });

    it('should not allow an unknown username to login', async () => {
      const response = await superapp
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send({ name: 'unknown_user', password: password });

      expect(response.status).toEqual(404);
    });
  });

  describe('Logout', () => {
    it('should allow users to log out', async () => {
      const loginResponse = await superapp
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send({ name: username, password: password });

      const response = await superapp
        .post('/users/logout')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${loginResponse.body.token}`)
        .send();

      expect(response.status).toEqual(204);
    });

    it('should prevent unauthenticated users from logging out', async () => {
      const response = await superapp.post('/users/logout').set('Content-Type', 'application/json').send();
      expect(response.status).toEqual(401);
    });
  });
});
