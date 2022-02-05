import 'jest';
import http from 'http';
import { recipeApp } from '../src/app';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { IRecipe, Session, SessionModel, User, UserModel } from 'recipiece-common';

describe('Recipes', () => {
  jest.setTimeout(20000);
  let server: http.Server;
  let superapp: supertest.SuperTest<any>;
  let user: User;
  let session: Session;

  beforeAll(async () => {
    server = http.createServer(recipeApp);
    superapp = supertest(server);

    // @ts-ignore
    await mongoose.connect(global.mongoUri);
  });

  beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    const dropPromises = collections.map((c) => c.drop());
    await Promise.all(dropPromises);
  });

  describe('Creating a Recipe', () => {
    beforeEach(async () => {
      // create a user and a session
      user = await new UserModel({
        username: 'testuser',
        email: 'test@user.com',
      }).save();
      session = await new SessionModel({
        owner: user.id,
      }).save();
    })

    it('should allow a recipe to be created', async () => {
      const recipeBody: Partial<IRecipe> = {
        name: 'test recipe',
        description: 'a test recipe',
        sections: [],
      };

      const createResponse = await superapp
        .post('/recipes/')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${session.serialize()}`)
        .send(recipeBody);
      expect(createResponse.status).toEqual(201);

    });
  });
});
