import { randomUUID } from 'crypto';
import http from 'http';
import 'jest';
import nock from 'nock';
import { DatabaseConstants, Environment, IUser } from 'recipiece-common';
import supertest from 'supertest';
import { authApp } from '../src/app';
import { encryptPassword } from '../src/encrypt';

describe('Users', () => {
  const username = 'test@asdf.qwer';
  const password = 'password';
  let encryptedPassword: string;
  let nonce: string;
  let salt: string;

  let server: http.Server;
  let superapp: supertest.SuperTest<any>;

  beforeAll(() => {
    server = http.createServer(authApp);
    superapp = supertest(server);
  });

  beforeEach(async () => {
    const pwBundle = await encryptPassword(password);
    encryptedPassword = pwBundle.password;
    nonce = pwBundle.nonce;
    salt = pwBundle.salt;
  });

  it('should allow users to log in', async () => {
    nock(Environment.DB_SERVICE_URI)
      .post(`/${DatabaseConstants.collections.users}/find`)
      .reply(200, {
        data: <IUser[]>[
          {
            email: username,
            password: encryptedPassword,
            salt: salt,
            nonce: nonce,
          },
        ],
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
      .send({ username: username, password: password });

    expect(response.status).toEqual(200);
  });
});
