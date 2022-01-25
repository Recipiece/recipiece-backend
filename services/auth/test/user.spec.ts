import { randomUUID } from 'crypto';
import http from 'http';
import 'jest';
import nock from 'nock';
import { DatabaseConstants, Environment, IUser, Session } from 'recipiece-common';
import supertest from 'supertest';
import { authApp } from '../src/app';
import { encryptPassword } from '../src/encrypt';

describe('Users', () => {
  async function generateUser(username = 'test@asdf.qwer', password = 'password'): Promise<IUser> {
    const pwBundle = await encryptPassword(password);
    return {
      _id: randomUUID(),
      created: Date.now(),
      email: username,
      password: pwBundle.password,
      salt: pwBundle.salt,
      nonce: pwBundle.nonce,
      preferences: {},
      permissions: [],
    };
  }

  let server: http.Server;
  let superapp: supertest.SuperTest<any>;

  beforeAll(() => {
    server = http.createServer(authApp);
    superapp = supertest(server);
  });

  beforeEach(async () => {});

  describe('Login', () => {
    it('should allow users to log in', async () => {
      const existingUser = await generateUser();

      nock(Environment.DB_SERVICE_URI)
        .post(`/${DatabaseConstants.collections.users}/find`)
        .reply(200, {
          data: [existingUser],
          more: false,
        });

      nock(Environment.DB_SERVICE_URI)
        .post(`/${DatabaseConstants.collections.sessions}/insert-one`)
        .reply(201, (_, body) => {
          return {
            ...(body as any),
            _id: randomUUID(),
          };
        });

      const response = await superapp
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send({ username: existingUser.email, password: existingUser.password });

      expect(response.status).toEqual(200);
      expect(response.body.token).toBeTruthy();
      const bodyUser: Partial<IUser> = response.body.user;
      expect(bodyUser._id).toEqual(existingUser._id);
      expect(bodyUser.email).toEqual(existingUser.email);
    });
  });

  describe('Logout', () => {
    it('should allow users to log out', async () => {
      const existingUser = await generateUser();
      const session = new Session({
        owner: existingUser._id,
        created: Date.now(),
        _id: randomUUID(),
      });
      const sessionToken = session.serialize();

      nock(Environment.AUTH_SERVICE_URI).post('/sessions/validate-token').reply(200, existingUser);

      nock(Environment.DB_SERVICE_URI).post(`/${DatabaseConstants.collections.sessions}/delete-one`).reply(200, {
        deleted: 1,
      });

      const response = await superapp
        .post('/users/logout')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${sessionToken}`)
        .send();

      expect(response.status).toEqual(200);
    });

    it('should prevent unauthenticated users from logging out', async () => {
      const response = await superapp.post('/users/logout').set('Content-Type', 'application/json').send();

      expect(response.status).toEqual(401);
    });

    it('should prevent users from logging out other users', async () => {
      const user1 = await generateUser('test1@asdf.qwer');
      const token1 = new Session({
        owner: user1._id,
        created: Date.now(),
        _id: randomUUID(),
      }).serialize();

      const user2 = await generateUser('test2@asdf.qwer');
      const token2 = new Session({
        owner: user2._id,
        created: Date.now(),
        _id: randomUUID(),
      }).serialize();
    });
  });
});
