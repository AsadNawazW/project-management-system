import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import http from 'http';
import {
  initDb,
  closeConnection,
  dropDatabase,
  dropCollection,
  clearDatabase,
} from '../database/init';
import initAcl from '../acl/init';
import { boot, registerRoutes } from '../app';

import RoleService from '../services/RoleService';

import PermissionService from '../services/PermissionService';

require('dotenv').config({ path: '.env.test', debug: true });

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (bodyData) => ({
  body: bodyData,
});
const RoleServiceObj = new RoleService();

const PermissionServiceObj = new PermissionService();

describe('Roles ', () => {
  let server;
  let request;

  beforeAll(async () => {
    process.env.MONGODB_DATABASE += '_roles';
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

  test('List all roles', async () => {
    // Arrange

    // Act
    const response = await request.get('/api/roles');

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
  });

  test('Get a single role', async () => {
    // Arrange
    const roleObj = {
      name: faker.name.firstName(),
    };

    const roleModel = await RoleServiceObj.Role.create(roleObj);

    // Act
    const response = await request.get(`/api/roles/${roleModel._id}`);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.hasOwnProperty('name')).toBeTruthy();
  });

  test('Create a new role', async () => {
    // Arrange
    const req = {
      name: faker.name.firstName(),
    };

    // Act
    const response = await request.post('/api/roles').send(req);

    // Assert
    expect(response.statusCode).toBe(201);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.hasOwnProperty('name')).toBeTruthy();
  });

  test('Updates a role', async () => {
    // Arrange
    const roleObj = {
      name: faker.name.firstName(),
    };

    const roleModel = await RoleServiceObj.Role.create(roleObj);

    roleObj.roleObj = faker.name.firstName();

    // Act
    const response = await request
      .patch(`/api/roles/${roleModel._id}`)
      .send(roleObj);

    // Assert    ;

    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.name).toEqual(roleObj.name);
  });

  test('Deletes a role', async () => {
    // Arrange
    const roleObj = {
      name: faker.name.firstName(),
    };

    const roleModel = await RoleServiceObj.Role.create(roleObj);

    // Act
    const response = await request.delete(`/api/roles/${roleModel._id}`).send();

    // Assert
    expect(response.statusCode).toBe(204);

    const newRoleModel = await RoleServiceObj.Role.findOne({
      name: roleObj.name,
    });
    expect(newRoleModel).toBeNull();
  });

  test('Attach a permission to  role', async () => {
    // Arrange
    const roleObj = {
      name: faker.name.firstName(),
    };

    const roleModel = await RoleServiceObj.Role.create(roleObj);

    const permissionObj = {
      permissions: ['users.index'],
    };

    // Act
    const response = await request
      .post(`/api/roles/${roleModel._id}/permissions`)
      .send(permissionObj);

    // Assert
    const permissions = await RoleServiceObj.getRolePermissionsArray(roleModel);
    expect(response.statusCode).toBe(201);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.hasOwnProperty('permissions')).toBeTruthy();
    expect(response.body.permissions).toEqual(permissionObj.permissions);
    expect(permissions).toEqual(
      expect.arrayContaining(permissionObj.permissions),
    );
  });

  test('Detach a permission to  role', async () => {
    // Arrange
    // Arrange
    const permissionObj = {
      name: 'users.index',
    };

    const permissionModel = await PermissionServiceObj.Permission.create(
      permissionObj,
    );

    const roleObj = {
      name: faker.name.firstName(),
    };

    const roleModel = await RoleServiceObj.Role.create(roleObj);

    const permissionObjArray = {
      permissions: [permissionObj.name],
    };

    const addPermissionResponse = await request
      .post(`/api/roles/${roleModel._id}/permissions`)
      .send(permissionObjArray);

    // Act
    const response = await request
      .delete(`/api/roles/${roleModel._id}/permissions`)
      .send(permissionObjArray);

    // Assert
    const permissions = await RoleServiceObj.getRolePermissionsArray(roleModel);
    expect(response.statusCode).toBe(204);
    expect(permissions).toEqual(
      expect.not.arrayContaining(permissionObjArray.permissions),
    );
  });
});
