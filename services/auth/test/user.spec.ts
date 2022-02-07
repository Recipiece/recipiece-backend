import { randomUUID } from 'crypto';
import http from 'http';
import 'jest';
import mongoose from 'mongoose';
import nock from 'nock';
import {
  Environment,
  ForgotPasswordToken,
  ForgotPasswordTokenModel,
  IUser,
  SessionModel,
  User,
  UserModel,
} from 'recipiece-common';
import supertest from 'supertest';
import { authApp } from '../src/app';

describe('Users', () => {
  const email = 'test@user.com';
  const username = 'test_user';
  const password = 'password1!';
  let testUser: User;

  let server: http.Server;
  let superapp: supertest.SuperTest<any>;

  async function setupUser(username: string, email: string, password: string): Promise<User> {
    nock(Environment.EMAIL_SERVICE_URI).post('/send/signup').reply(200);
    const stageResponse = await superapp
      .post('/staged-users/stage')
      .set('Content-Type', 'application/json')
      .send({ username, password, email });
    const { token } = stageResponse.body;
    await superapp.post('/staged-users/confirm').set('Content-Type', 'application/json').send({ token: token });
    return await UserModel.findOne({ email });
  }

  async function loginUser(username: string, password: string): Promise<string> {
    const loginResponse = await superapp
      .post('/users/login')
      .set('Content-Type', 'application/json')
      .send({ name: username, password: password });

    return loginResponse.body.token;
  }

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
    testUser = await setupUser(username, email, password);
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
      const token = await loginUser(username, password);

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

  describe('Forgot Password', () => {
    it('should allow a valid user to request a token', async () => {
      nock(Environment.EMAIL_SERVICE_URI).post('/send/forgot-password').reply(200);

      const resetRequest = await superapp
        .post('/users/forgot-password/request')
        .set('Content-Type', 'application/json')
        .send({ email: email });
      expect(resetRequest.status).toEqual(204);
      expect(resetRequest.body).toEqual({});

      const user: User = await UserModel.findOne({ email });

      const forgotPasswordTokens = await ForgotPasswordTokenModel.find();
      expect(forgotPasswordTokens.length).toEqual(1);

      const token: ForgotPasswordToken = forgotPasswordTokens[0];
      expect(token.owner).toEqual(user.id);
    });

    it('should not allow an unknown user to request a token', async () => {
      const resetRequest = await superapp
        .post('/users/forgot-password/request')
        .set('Content-Type', 'application/json')
        .send({ email: 'unknown@user.com' });
      expect(resetRequest.status).toEqual(404);

      const forgotPasswordTokens = await ForgotPasswordTokenModel.find();
      expect(forgotPasswordTokens.length).toEqual(0);
    });

    it('should allow a valid token to reset a password', async () => {
      await superapp
        .post('/users/forgot-password/request')
        .set('Content-Type', 'application/json')
        .send({ email: email });
      let user: User = await UserModel.findOne({ email });

      const oldSalt = user.salt;
      const oldNonce = user.nonce;
      const oldPwHash = user.password;

      const forgotPasswordToken = await ForgotPasswordTokenModel.findOne({ owner: user.id });

      const resetResponse = await superapp
        .post('/users/forgot-password/reset')
        .set('Content-Type', 'application/json')
        .send({
          token: forgotPasswordToken.token,
          email: user.email,
          desired: 'newpassword!',
        });
      expect(resetResponse.status).toEqual(204);

      user = await UserModel.findOne({ email });
      expect(user.nonce).not.toEqual(oldNonce);
      expect(user.password).not.toEqual(oldPwHash);
      expect(user.salt).not.toEqual(oldSalt);
    });

    it('should remove all forgot password tokens on successful reset', async () => {
      for (let i = 0; i < 10; i++) {
        await superapp
          .post('/users/forgot-password/request')
          .set('Content-Type', 'application/json')
          .send({ email: email });
      }

      let tokens = await ForgotPasswordTokenModel.find({ owner: testUser.id });
      expect(tokens.length).toEqual(10);

      await superapp.post('/users/forgot-password/reset').set('Content-Type', 'application/json').send({
        token: tokens[1].token,
        email: email,
        desired: 'newpassword!',
      });

      tokens = await ForgotPasswordTokenModel.find({ owner: testUser.id });
      expect(tokens.length).toEqual(0);
    });

    it('should not allow an invalid token to reset a password', async () => {
      await superapp
        .post('/users/forgot-password/request')
        .set('Content-Type', 'application/json')
        .send({ email: email });
      const user: User = await UserModel.findOne({ email });

      const resetResponse = await superapp
        .post('/users/forgot-password/reset')
        .set('Content-Type', 'application/json')
        .send({
          token: randomUUID(),
          email: user.email,
          desired: 'newpassword!',
        });
      expect(resetResponse.status).toEqual(401);
    });

    it('should not allow a valid token for another user to reset a password', async () => {
      const user1 = await setupUser('token1', 'token1@asdf.qwer', 'token1!');
      const user2 = await setupUser('token2', 'token2@asdf.qwer', 'token2!');

      // request reset for user1
      await superapp
        .post('/users/forgot-password/request')
        .set('Content-Type', 'application/json')
        .send({ email: user1.email });
      const token = ForgotPasswordTokenModel.findOne({ owner: user1.id });

      // try to push a reset through for user2
      const resetResponse = await superapp
        .post('/users/forgot-password/reset')
        .set('Content-Type', 'application/json')
        .send({
          token: token.token,
          email: user2.email,
          desired: 'newpassword!',
        });
      expect(resetResponse.status).toEqual(401);
    });

    it('should not allow an unknown user to reset a password', async () => {
      await superapp.post('/users/forgot-password/request').set('Content-Type', 'application/json').send({ email });
      const token = ForgotPasswordTokenModel.findOne({ owner: testUser.id });
      const resetResponse = await superapp
        .post('/users/forgot-password/reset')
        .set('Content-Type', 'application/json')
        .send({
          token: token.token,
          email: 'unknownemail@asdf.qwer',
          desired: 'newpassword!',
        });
      expect(resetResponse.status).toEqual(401);
    });

    it('should delete all sessions for a user upon reset', async () => {
      await superapp
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send({ name: username, password: password });

      await superapp.post('/users/forgot-password/request').set('Content-Type', 'application/json').send({ email });
      const token = await ForgotPasswordTokenModel.findOne({ owner: testUser.id });
      await superapp.post('/users/forgot-password/reset').set('Content-Type', 'application/json').send({
        token: token.token,
        email: testUser.email,
        desired: 'newpassword!',
      });

      const sessions = await SessionModel.find({ owner: testUser.id });
      expect(sessions.length).toEqual(0);
    });
  });

  describe('Password Change', () => {
    let sessionToken: string;

    beforeEach(async () => {
      sessionToken = await loginUser(username, password);
    });

    it('should allow a user to change their password', async () => {
      const oldNonce = testUser.nonce;
      const oldPwHash = testUser.password;
      const oldSalt = testUser.salt;

      const resetRequest = await superapp
        .post('/users/password/reset')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${sessionToken}`)
        .send({ old: password, desired: 'newpassword1!' });
      expect(resetRequest.status).toEqual(204);

      const user = await UserModel.findById(testUser.id);
      expect(user.salt).not.toEqual(oldSalt);
      expect(user.password).not.toEqual(oldPwHash);
      expect(user.nonce).not.toEqual(oldNonce);
    });

    it('should not allow a user to change their password if the current password is wrong', async () => {
      const oldNonce = testUser.nonce;
      const oldPwHash = testUser.password;
      const oldSalt = testUser.salt;

      const resetRequest = await superapp
        .post('/users/password/reset')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${sessionToken}`)
        .send({ old: 'badpassword!', desired: 'newpassword1!' });
      expect(resetRequest.status).toEqual(401);

      const user = await UserModel.findById(testUser.id);
      expect(user.salt).toEqual(oldSalt);
      expect(user.password).toEqual(oldPwHash);
      expect(user.nonce).toEqual(oldNonce);
    });

    it('should delete all sessions for a user upon reset', async () => {
      await superapp
        .post('/users/password/reset')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${sessionToken}`)
        .send({ old: password, desired: 'newpassword1!' });

      const sessions = await SessionModel.find({ owner: testUser.id });
      expect(sessions.length).toEqual(0);
    });
  });
});
