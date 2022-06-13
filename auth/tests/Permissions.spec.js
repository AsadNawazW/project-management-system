import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import http from 'http';
import {
  initDb,
  closeConnection,
  clearDatabase,
} from '../database/init';

import initAcl from '../acl/init';
import { registerRoutes } from '../app';
import PermissionService from '../services/PermissionService';

require('dotenv').config({ path: '.env.test', debug: true });

// const mockResponse = () => {
//   const res = {};
//   res.status = jest.fn().mockReturnValue(res);
//   res.json = jest.fn().mockReturnValue(res);
//   return res;
// };

// const mockRequest = (bodyData) => ({
//   body: bodyData,
// });

const PermissionServiceObj = new PermissionService();

describe('Permissions ', () => {
  let server;
  let request;

  beforeAll(async () => {
    process.env.MONGODB_DATABASE += '_permissions';
    initDb();
    await initAcl();
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

  test('List all permissions', async () => {
    // Arrange

    // Act
    const response = await request.get('/api/permissions');

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
  });

  test('Get a single permission', async () => {
    // Arrange
    const permissionObj = {
      name: faker.name.firstName(),
    };

    const permissionModel = await PermissionServiceObj.Permission.create(
      permissionObj,
    );

    // Act
    const response = await request.get(
      `/api/permissions/${permissionModel._id}`,
    );

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.hasOwnProperty('name')).toBeTruthy();
  });

  test('Create a new permission', async () => {
    // Arrange
    const req = {
      name: faker.name.firstName(),
    };

    // Act
    const response = await request.post('/api/permissions').send(req);

    // Assert
    expect(response.statusCode).toBe(201);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.hasOwnProperty('name')).toBeTruthy();
  });

  test('Updates a permission', async () => {
    // Arrange
    const permissionObj = {
      name: faker.name.firstName(),
    };

    const permissionModel = await PermissionServiceObj.Permission.create(
      permissionObj,
    );

    permissionObj.name = faker.name.firstName();

    // Act
    const response = await request
      .patch(`/api/permissions/${permissionModel._id}`)
      .send(permissionObj);

    // Assert    ;

    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.name).toEqual(permissionObj.name);
  });

  test('Deletes a permission', async () => {
    // Arrange
    const permissionObj = {
      name: faker.name.firstName(),
    };

    const permissionModel = await PermissionServiceObj.Permission.create(
      permissionObj,
    );

    // Act
    const response = await request
      .delete(`/api/permissions/${permissionModel._id}`)
      .send();

    // Assert
    expect(response.statusCode).toBe(204);

    const newPermissionModel = await PermissionServiceObj.Permission.findOne({
      name: permissionObj.name,
    });
    expect(newPermissionModel).toBeNull();
  });
});
