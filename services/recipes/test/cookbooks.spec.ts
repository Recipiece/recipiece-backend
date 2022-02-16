import http from 'http';
import mongoose from 'mongoose';
import { getMongooseConnection, Session, SessionModel, User, UserModel } from 'recipiece-common';
import { recipeApp } from '../src/app';
import supertest from 'supertest';

describe('Coobooks', () => {
  let server: http.Server;
  let superapp: supertest.SuperTest<any>;
  let user: User;
  let session: Session;
  let mongooseConnection: mongoose.Connection;

  beforeAll(async () => {
    server = http.createServer(recipeApp);
    superapp = supertest(server);
    mongooseConnection = await getMongooseConnection();
  });

  beforeEach(async () => {
    const collections = await mongooseConnection.db.collections();
    const dropPromises = collections.map((c) => c.drop());
    await Promise.all(dropPromises);
  });

  beforeEach(async () => {
    // create a user and a session
    user = await new UserModel({
      username: 'testuser',
      email: 'test@user.com',
    }).save();
    session = await new SessionModel({
      owner: user.id,
    }).save();
  });
});