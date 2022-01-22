import expect from 'expect';
import http from 'http';
import { describe } from 'mocha';
import nock from 'nock';
import { DatabaseConstants, Environment, IUser } from 'recipiece-common';
import supertest from 'supertest';
import { authApp } from '../src/app';

describe('Staged Users', function () {
  this.timeout(10000);
  let server: http.Server;
  let superapp: supertest.SuperTest<any>;

  before(() => {
    server = http.createServer(authApp);
    superapp = supertest(server);
  });

  describe('Staging a User', () => {
    it('should be able to stage a user', async () => {
      const email = 'test@asdf.qwer';
      const password = 'asdfqwer';

      nock(`http://${Environment.DB_SERVICE_NAME}:${Environment.DB_SERIVCE_PORT}`)
        .post(`/${DatabaseConstants.collections.stagedUsers}/insert-one`)
        .reply(201, {
          email: email,
          password: password,
          id: '1',
        });

      nock(`http://${Environment.DB_SERVICE_NAME}:${Environment.DB_SERIVCE_PORT}`)
        .post(`/${DatabaseConstants.collections.users}/find`)
        .reply(200, {
          data: [],
          more: false,
        });

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

      nock(`http://${Environment.DB_SERVICE_NAME}:${Environment.DB_SERIVCE_PORT}`)
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
      nock(`http://${Environment.DB_SERVICE_NAME}:${Environment.DB_SERIVCE_PORT}`)
        .post(`/${DatabaseConstants.collections.users}/find`)
        .reply(200, {
          data: [],
          more: false,
        });

      nock(`http://${Environment.DB_SERVICE_NAME}:${Environment.DB_SERIVCE_PORT}`)
        .post(`/${DatabaseConstants.collections.stagedUsers}/insert-one`)
        .reply(409, {});

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

      nock(`http://${Environment.DB_SERVICE_NAME}:${Environment.DB_SERIVCE_PORT}`)
        .post(`/${DatabaseConstants.collections.stagedUsers}/insert-one`)
        .reply(201, (_, requestBody) => {
          return {
            ...JSON.parse(requestBody.toString()),
            _id: '1110',
          };
        });

      nock(`http://${Environment.DB_SERVICE_NAME}:${Environment.DB_SERIVCE_PORT}`)
        .post(`/${DatabaseConstants.collections.users}/find`)
        .reply(200, {
          data: [],
          more: false,
        });

      const response = await superapp
        .post('/staged-users/')
        .set('Content-Type', 'application/json')
        .send({ username: email, password: password });
      expect(response.status).toEqual(201);

      const { token } = response.body;

      nock(`http://${Environment.DB_SERVICE_NAME}:${Environment.DB_SERIVCE_PORT}`)
        .post(`/${DatabaseConstants.collections.users}/insert-one`)
        .reply(201, (_, originalRequest) => {
          return {
            data: {
              ...JSON.parse(originalRequest.toString()),
              _id: '1111',
            },
          };
        });

      const confirmResponse = await superapp
        .post('/staged-users/confirm-account')
        .set('Content-Type', 'application/json')
        .send({ token: token });
      expect(confirmResponse.status).toEqual(201);
    });

    it('should not allow verification with an invalid token', async () => {});
  });
});
