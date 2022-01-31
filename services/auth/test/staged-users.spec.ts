import { randomUUID } from 'crypto';
import expect from 'expect';
import http from 'http';
import 'jest';
import nock from 'nock';
import { DatabaseConstants, Environment, IStagedUser, IUser } from 'recipiece-common';
import supertest from 'supertest';
import { authApp } from '../src/app';

describe('Staged Users', () => {
  let server: http.Server;
  let superapp: supertest.SuperTest<any>;

  beforeAll(() => {
    server = http.createServer(authApp);
    superapp = supertest(server);
  });

  describe('Staging a User', () => {
    it('should be able to stage a user', async () => {
      const email = 'test@asdf.qwer';
      const password = 'asdfqwer';

      nock(Environment.DB_SERVICE_URI)
        .post(`/${DatabaseConstants.collections.stagedUsers}/insert-one`)
        .reply(201, (_, requestBody) => {
          return {
            data: {
              ...(requestBody as any).data,
              _id: randomUUID(),
            },
          };
        });

      nock(Environment.DB_SERVICE_URI).post(`/${DatabaseConstants.collections.users}/find`).reply(200, {
        data: [],
        more: false,
      });

      nock(Environment.EMAIL_SERVICE_URI).post('/send/signup').reply(200);

      const response = await superapp
        .post('/staged-users/')
        .set('Content-Type', 'application/json')
        .send({ username: email, password: password });
      expect(response.status).toEqual(201);
      expect(response.body.token).toBeTruthy();
      expect(response.body.email).toEqual(email);
    });

    it('should not allow an existing username to be staged', async () => {
      const email = 'test@asdf.qwer';
      const password = 'asdfqwer';

      nock(Environment.DB_SERVICE_URI)
        .post(`/${DatabaseConstants.collections.users}/find`)
        .reply(200, {
          data: [
            <IUser>{
              email: email,
            },
          ],
          more: false,
        });

      const response = await superapp
        .post('/staged-users/')
        .set('Content-Type', 'application/json')
        .send({ username: email, password: password });
      expect(response.status).toEqual(409);
    });

    it('should not allow an existing staged username to be staged', async () => {
      const email = 'test@asdf.qwer';
      const password = 'asdfqwer';
      nock(Environment.DB_SERVICE_URI).post(`/${DatabaseConstants.collections.users}/find`).reply(200, {
        data: [],
        more: false,
      });

      nock(Environment.DB_SERVICE_URI).post(`/${DatabaseConstants.collections.stagedUsers}/insert-one`).reply(409, {});

      const response = await superapp
        .post('/staged-users/')
        .set('Content-Type', 'application/json')
        .send({ username: email, password: password });
      expect(response.status).toEqual(409);
    });
  });

  describe('Verifying a Staged User', () => {
    it('should allow verification with a valid token', async () => {
      const email = 'test@asdf.qwer';
      const password = 'asdfqwer';
      const salt = 'nonsensesalt';
      const nonce = 'nonsensenonce';
      const token = randomUUID();

      nock(Environment.DB_SERVICE_URI)
        .post(`/${DatabaseConstants.collections.stagedUsers}/find`)
        .reply(200, {
          data: <IStagedUser[]>[
            {
              email: email,
              password: password,
              salt: salt,
              nonce: nonce,
              token: token,
            },
          ],
        });

      nock(Environment.DB_SERVICE_URI)
        .post(`/${DatabaseConstants.collections.users}/insert-one`)
        .reply(201, (_, requestBody) => {
          return {
            data: {
              ...(requestBody as any).data,
              _id: randomUUID(),
            },
          };
        });

      const confirmResponse = await superapp
        .post('/staged-users/confirm-account')
        .set('Content-Type', 'application/json')
        .send({ token: token });
      expect(confirmResponse.status).toEqual(204);
    });
  });
});
