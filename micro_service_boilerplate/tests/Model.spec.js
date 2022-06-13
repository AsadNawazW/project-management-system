import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import http from 'http';
import {
  initDb,
  closeConnection,
  clearDatabase,
} from '../database/init';

import { registerRoutes } from '../app';
import ModelService from '../services/ModelService';

require('dotenv').config({ path: '.env.test', debug: true });

const ModelServiceObj = new ModelService();

describe('Models ', () => {
  let server;
  let request;

  beforeAll(async () => {
    process.env.MONGODB_DATABASE += '_models';
    initDb();    
  });

  afterAll(async () => {
    await clearDatabase();
    await closeConnection();
  });

  beforeAll((done) => {
    server = http.createServer(registerRoutes());
    server = require('http-shutdown')(server);
    server.listen(done);
    request = supertest(server);
  });

  afterAll(() => {
    server.shutdown();
  });

  test('List all models', async () => {
    // Arrange

    // Act
    const response = await request.get('/api/models');

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
  });

  test('Get a single model', async () => {
    // Arrange
    const modelObj = {
      name: faker.name.firstName(),
    };

    const modelModel = await ModelServiceObj.Model.create(
      modelObj,
    );

    console.log(`/api/models/${modelModel._id}`);
    // Act
    const response = await request.get(
      `/api/models/${modelModel._id}`,
    );

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.hasOwnProperty('name')).toBeTruthy();
  });

  test('Create a new model', async () => {
    // Arrange
    const req = {
      name: faker.name.firstName(),
    };

    // Act
    const response = await request.post('/api/models').send(req);

    // Assert
    expect(response.statusCode).toBe(201);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.hasOwnProperty('name')).toBeTruthy();
  });

  test('Updates a model', async () => {
    // Arrange
    const modelObj = {
      name: faker.name.firstName(),
    };

    const modelModel = await ModelServiceObj.Model.create(
      modelObj,
    );

    modelObj.name = faker.name.firstName();

    // Act
    const response = await request
      .patch(`/api/models/${modelModel._id}`)
      .send(modelObj);

    // Assert    ;

    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.name).toEqual(modelObj.name);
  });

  test('Deletes a model', async () => {
    // Arrange
    const modelObj = {
      name: faker.name.firstName(),
    };

    const modelModel = await ModelServiceObj.Model.create(
      modelObj,
    );

    // Act
    const response = await request
      .delete(`/api/models/${modelModel._id}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(204);

    const newModelModel = await ModelServiceObj.Model.findOne({
      name: modelObj.name,
    });
    expect(newModelModel).toBeNull();
  });
});
