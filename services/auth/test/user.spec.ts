import http from 'http';
import 'jest';
import nock from 'nock';
import mongoose from 'mongoose';
import { Environment, IUser } from 'recipiece-common';
import supertest from 'supertest';
import { authApp } from '../src/app';

describe('Users', () => {
  const email = 'test@user.com';
  const username = 'test_user';
  const password = 'password1!';

  let server: http.Server;
  let superapp: supertest.SuperTest<any>;

  beforeAll(async () => {
    server = http.createServer(authApp);
    superapp = supertest(server);

    // @ts-ignore
    await mongoose.connect(global.mongoUri);
  });

  beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    const dropPromises = collections.map((c) => c.drop());
    await Promise.all(dropPromises);
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
      const bodyUser: Partial<IUser & { id: string }> = response.body.user;
      expect(bodyUser.id).toBeTruthy();
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
      expect(bodyUser.id).toBeTruthy();
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

      const { token } = loginResponse.body;

      const response = await superapp
        .post('/users/logout')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toEqual(204);
    });

    it('should prevent unauthenticated users from logging out', async () => {
      const response = await superapp.post('/users/logout').set('Content-Type', 'application/json').send();
      expect(response.status).toEqual(401);
    });
  });
});
