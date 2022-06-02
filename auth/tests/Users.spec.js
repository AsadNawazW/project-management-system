let supertest = require("supertest");
const { faker } = require("@faker-js/faker");
require("dotenv").config({ path: ".env.test", debug: true });
const http = require("http");
let {
  initDb,
  closeConnection,
  dropDatabase,
  dropCollection,
} = require("../database/init");
let { initAcl } = require("../acl/init");
let { boot, registerRoutes } = require("../app");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (bodyData) => {
  return {
    body: bodyData,
  };
};

const UserService = require("../services/UserService");
let UserServiceObj = new UserService();

const AuthService = require("../services/AuthService");
let AuthServiceObj = new AuthService();

describe("Users ", () => {
  let server;
  let request;

  beforeAll(async () => {
    initDb();
    await initAcl();
  });

  afterAll(async () => {
    await dropDatabase();
    // await dropCollection('users');
    closeConnection();
  });

  beforeAll(done => {
    server = http.createServer(registerRoutes());
    server.listen(done);
    request = supertest(server);
  });

  afterAll(done => {
    server.close(done);
  });

  test("login route is 400 without username and password", async () => {
    // Arrange

    // Act
    const response = await request.post("/api/auth/login");

    // Assert
    expect(response.statusCode).toBe(400);
  });

  test("login route with correct username and password works", async () => {
    // Arrange
    let req = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };

    let user = await AuthServiceObj.createUser(
      mockRequest(req),
      mockResponse()
    );

    // Act
    const response = await request.post("/api/auth/login").send({
      email: req.email,
      password: req.password,
    });

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.hasOwnProperty("email")).toBeTruthy();
    expect(response.body.hasOwnProperty("token")).toBeTruthy();
    expect(response.body.hasOwnProperty("role")).toBeTruthy();
    expect(response.body.hasOwnProperty("permissions")).toBeTruthy();
  });

  test("login route with incorrect username and password gives 401", async () => {
    // Arrange
    let req = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };

    let user = await AuthServiceObj.createUser(
      mockRequest(req),
      mockResponse()
    );

    // Act
    const response = await request.post("/api/auth/login").send({
      email: req.email,
      password: faker.internet.password(),
    });

    // Assert
    expect(response.statusCode).toBe(401);
  });

  test("register route is 400 without any details", async () => {
    // Arrange

    // Act
    const response = await request.post("/api/auth/register");

    // Assert
    expect(response.statusCode).toBe(400);
  });

  test("register route works with parameters", async () => {
    // Arrange
    let req = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };

    // Act
    const response = await request.post("/api/auth/register").send(req);

    // Assert
    expect(response.statusCode).toBe(201);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.hasOwnProperty("email")).toBeTruthy();
    expect(response.body.hasOwnProperty("token")).toBeTruthy();
    expect(response.body.hasOwnProperty("role")).toBeTruthy();
    expect(response.body.hasOwnProperty("permissions")).toBeTruthy();
  });

  test("List all users", async () => {
    // Arrange

    // Act
    const response = await request.get("/api/users");

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
  });

  test("Get a single user", async () => {
    // Arrange
    let userObj = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
      role: await UserServiceObj.getDefaultUserRole(),
    };

    const userModel = await UserServiceObj.User.create(userObj);

    // Act
    const response = await request.get("/api/users/" + userModel._id);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.hasOwnProperty("email")).toBeTruthy();
    expect(response.body.hasOwnProperty("role")).toBeTruthy();
    expect(response.body.hasOwnProperty("permissions")).toBeTruthy();
  });

  test("Create a new user", async () => {
    // Arrange
    let req = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };

    // Act
    const response = await request.post("/api/users").send(req);

    // Assert
    expect(response.statusCode).toBe(201);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.hasOwnProperty("email")).toBeTruthy();
    expect(response.body.hasOwnProperty("role")).toBeTruthy();
    expect(response.body.hasOwnProperty("permissions")).toBeTruthy();
  });

  test("Updates a user without sending password", async () => {
    // Arrange
    let userObj = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };

    const userModel = await UserServiceObj.User.create(userObj);

    userObj.first_name = faker.name.firstName();
    userObj.last_name = faker.name.lastName();

    // Act
    const response = await request.patch("/api/users").send(userObj);

    // Assert    ;
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.first_name).toEqual(userObj.first_name);
    expect(response.body.last_name).toEqual(userObj.last_name);
  });

  test("Updates a user's password", async () => {
    // Arrange
    let userObj = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };

    const userModel = await UserServiceObj.User.create(userObj);

    userObj.password = faker.internet.password();

    // Act
    let response = await request.patch("/api/users").send(userObj);

    // Assert;
    response = await request.post("/api/auth/login").send({
      email: userObj.email,
      password: userObj.password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.hasOwnProperty("email")).toBeTruthy();
    expect(response.body.hasOwnProperty("token")).toBeTruthy();
    expect(response.body.hasOwnProperty("role")).toBeTruthy();
    expect(response.body.hasOwnProperty("permissions")).toBeTruthy();
  });
});
