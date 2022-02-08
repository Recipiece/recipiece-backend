import { randomUUID } from 'crypto';
import http from 'http';
import 'jest';
import mongoose from 'mongoose';
import { getMongooseConnection, IRecipe, IRecipeSection, RecipeModel, Session, SessionModel, User, UserModel } from 'recipiece-common';
import supertest from 'supertest';
import { recipeApp } from '../src/app';

describe('Recipes', () => {
  jest.setTimeout(20000);
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

  describe('Creating a Recipe', () => {
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
      const createdRecipe: IRecipe = createResponse.body;
      expect(createdRecipe.id).toBeTruthy();
      expect(createdRecipe.owner).toEqual(user.id);
      expect(createdRecipe.name).toEqual(recipeBody.name);
      expect(createdRecipe.description).toEqual(recipeBody.description);
    });

    it('should prevent unauthorized users from creating a recipe', async () => {
      const recipeBody: Partial<IRecipe> = {
        name: 'test recipe',
        description: 'a test recipe',
        sections: [],
      };

      const createResponse = await superapp.post('/recipes/').set('Content-Type', 'application/json').send(recipeBody);
      expect(createResponse.status).toEqual(401);
    });
  });

  describe('Updating a Recipe', () => {
    fit('should allow a user to update their recipe', async () => {
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
      const createdId = createResponse.body.id;

      const updatedBody: Partial<IRecipe> = {
        name: 'test recipe with new name',
        description: 'the same recipe with a new name',
        sections: [{
          id: randomUUID(),
          name: 'section 1',
          ingredients: [{
            name: 'water',
            amount: '1',
            unit: 'cup'
          }],
          steps: [{
            content: 'put some water in a cup',
            length: {
              unit: 's',
              time: 1,
            }
          }]
        }]
      };

      const updateResponse = await superapp.put(`/recipes/${createdId}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${session.serialize()}`)
        .send(updatedBody);
      expect(updateResponse.status).toEqual(200);

      // check the response body
      const updatedRecipe: IRecipe = updateResponse.body;
      expect(updatedRecipe.id).toEqual(createdId);
      expect(updatedRecipe.owner).toEqual(user.id);
      expect(updatedRecipe.sections.length).toEqual(1);
      const section: IRecipeSection = updatedRecipe.sections[0];
      expect(section.id).toEqual(updatedBody.sections[0].id);
      expect(section.ingredients).toEqual(updatedBody.sections[0].ingredients);
      expect(section.steps).toEqual(updatedBody.sections[0].steps);

      // check against the database
      const recipes = await RecipeModel.find();
      expect(recipes.length).toEqual(1);
    });

    it('should not allow owner or createdAt to be updated', async () => {});

    it('should not allow a user to update another users recipe', async () => {});

    it('should not allow unauthorized user to update a recipe', async () => {});
  });
});
