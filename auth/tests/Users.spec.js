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

import UserService from '../services/UserService';

import AuthService from '../services/AuthService';

require('dotenv').config({ path: '.env.test', debug: true });

process.on('unhandledRejection', (reason) => {
  console.log(reason); // log the reason including the stack trace
  throw e;
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (bodyData) => ({
  body: bodyData,
});
const UserServiceObj = new UserService();

const AuthServiceObj = new AuthService();

describe('Users ', () => {
  let server;
  let request;

  beforeAll(async () => {
    process.env.MONGODB_DATABASE += '_users';
    await initDb();
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

  test('login route is 400 without username and password', async () => {
    // Arrange

    // Act
    const response = await request.post('/api/auth/login');

    // Assert
    expect(response.statusCode).toBe(400);
  });

  test('login route with correct username and password works', async () => {
    // Arrange
    const req = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };

    const user = await AuthServiceObj.createUser(
      mockRequest(req),
      mockResponse(),
    );

    // Act
    const response = await request.post('/api/auth/login').send({
      email: req.email,
      password: req.password,
    });

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.hasOwnProperty('email')).toBeTruthy();
    expect(response.body.hasOwnProperty('token')).toBeTruthy();
    expect(response.body.hasOwnProperty('role')).toBeTruthy();
    expect(response.body.hasOwnProperty('permissions')).toBeTruthy();
  });

  test('login route with incorrect username and password gives 401', async () => {
    // Arrange
    const req = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };

    const user = await AuthServiceObj.createUser(
      mockRequest(req),
      mockResponse(),
    );

    // Act
    const response = await request.post('/api/auth/login').send({
      email: req.email,
      password: faker.internet.password(),
    });

    // Assert
    expect(response.statusCode).toBe(401);
  });

  test('register route is 400 without any details', async () => {
    // Arrange

    // Act
    const response = await request.post('/api/auth/register');

    // Assert
    expect(response.statusCode).toBe(400);
  });

  test('register route works with parameters', async () => {
    // Arrange
    const req = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };

    // Act
    const response = await request.post('/api/auth/register').send(req);

    // Assert
    expect(response.statusCode).toBe(201);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.hasOwnProperty('email')).toBeTruthy();
    expect(response.body.hasOwnProperty('token')).toBeTruthy();
    expect(response.body.hasOwnProperty('role')).toBeTruthy();
    expect(response.body.hasOwnProperty('permissions')).toBeTruthy();
  });

  test('List all users', async () => {
    // Arrange

    // Act
    const response = await request.get('/api/users');

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
  });

  test('Get a single user', async () => {
    // Arrange
    const userObj = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
      role: await UserServiceObj.getDefaultUserRole(),
    };

    const userModel = await UserServiceObj.User.create(userObj);

    // Act
    const response = await request.get(`/api/users/${userModel._id}`);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.hasOwnProperty('email')).toBeTruthy();
    expect(response.body.hasOwnProperty('role')).toBeTruthy();
    expect(response.body.hasOwnProperty('permissions')).toBeTruthy();
  });

  test('Create a new user', async () => {
    // Arrange
    const req = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };

    // Act
    const response = await request.post('/api/users').send(req);

    // Assert
    expect(response.statusCode).toBe(201);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.hasOwnProperty('email')).toBeTruthy();
    expect(response.body.hasOwnProperty('role')).toBeTruthy();
    expect(response.body.hasOwnProperty('permissions')).toBeTruthy();
  });

  test('Updates a user without sending password', async () => {
    // Arrange
    const userObj = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };

    const userModel = await UserServiceObj.User.create(userObj);

    userObj.firstName = faker.name.firstName();
    userObj.lastName = faker.name.lastName();

    // Act
    const response = await request
      .patch(`/api/users/${userModel._id}`)
      .send(userObj);

    // Assert    ;
    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.firstName).toEqual(userObj.firstName);
    expect(response.body.lastName).toEqual(userObj.lastName);
  });

  test("Updates a user's password", async () => {
    // Arrange
    const userObj = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };

    const userModel = await UserServiceObj.User.create(userObj);

    userObj.password = faker.internet.password();

    // Act
    let response = await request
      .patch(`/api/users/${userModel._id}`)
      .send(userObj);

    // Assert;
    response = await request.post('/api/auth/login').send({
      email: userObj.email,
      password: userObj.password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.hasOwnProperty('email')).toBeTruthy();
    expect(response.body.hasOwnProperty('token')).toBeTruthy();
    expect(response.body.hasOwnProperty('role')).toBeTruthy();
    expect(response.body.hasOwnProperty('permissions')).toBeTruthy();
  });

  test('Deletes a user', async () => {
    // Arrange
    const userObj = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
      role: await UserServiceObj.getDefaultUserRole(),
    };

    const userModel = await UserServiceObj.User.create(userObj);

    // Act
    const response = await request
      .delete(`/api/users/${userModel._id}`)
      .send(userObj);

    // Assert
    expect(response.statusCode).toBe(204);

    const newUserModel = await UserServiceObj.User.findById(userModel._id);
    expect(newUserModel).toBeNull();
  });

  test('Change a user role', async () => {
    // Arrange
    const userObj = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };
    const userModel = await UserServiceObj.User.create(userObj);

    const roleObj = {
      role: 'admin',
    };

    // Act
    const response = await request
      .post(`/api/users/${userModel._id}/role`)
      .send(roleObj);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body.hasOwnProperty('email')).toBeTruthy();
    expect(response.body.hasOwnProperty('role')).toBeTruthy();
    expect(response.body.hasOwnProperty('permissions')).toBeTruthy();
    expect(response.body.role.name).toEqual(roleObj.role);
  });
});
