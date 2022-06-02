// jest.useFakeTimers();
// jest.setTimeout(30000);

let supertest = require("supertest");
const { faker } = require('@faker-js/faker');
require("dotenv").config({ path: ".env.test", debug: true });
const http = require("http");
let { initDb, closeConnection } = require("../database/init");
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

// let baseUrl;
// baseUrl = 'http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT

const AuthService = require("../services/AuthService");
let AuthServiceObj = new AuthService;

describe("Login ", () => {
  let server;
  let request;
  beforeAll(() => {
    initDb();
  });

  afterAll(() => {
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

  it("login route is 400 without username and password", async () => {
    // Arrange

    // Act
    const response = await request.post("/api/auth/login");

    // Assert
    expect(response.statusCode).toBe(400);
  });

  it("login route with correct username and password works", async () => {
    // Arrange
    let req = {
        first_name : faker.name.firstName(), 
        last_name : faker.name.lastName(), 
        email : faker.internet.email().toLocaleLowerCase(),
        password : faker.internet.password()
    }
    
    let user = await AuthServiceObj.createUser(mockRequest(req),mockResponse())
    
    // Act
    const response = await request.post("/api/auth/login").send({
      email: req.email,
      password: req.password,
    });
    
    // Assert
    expect(response.statusCode).toBe(200);

  });

  it("login route with incorrect username and password gives 401", async () => {
    
    // Arrange
    let req = {
      first_name : faker.name.firstName(), 
      last_name : faker.name.lastName(), 
      email : faker.internet.email().toLocaleLowerCase(),
      password : faker.internet.password()
    }
    
    let user = await AuthServiceObj.createUser(mockRequest(req),mockResponse())
    
    // Act
    const response = await request.post("/api/auth/login").send({
      email: req.email,
      password: faker.internet.password(),
    });
    
    // Assert
    expect(response.statusCode).toBe(401);

  });
});
