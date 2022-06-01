// jest.useFakeTimers();
// jest.setTimeout(30000);

let supertest = require("supertest");
require("dotenv").config({ path: ".env.test", debug: true });
const http = require("http");
let { initDb, closeConnection } = require("../database/init");
let { initAcl } = require("../acl/init");
let { boot, registerRoutes } = require("../app");

// let baseUrl;
// baseUrl = 'http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT

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
    const response = await request.post("/api/auth/login");
    expect(response.statusCode).toBe(400);
  });

  it("login route with correct username and password works", async () => {
    
    const response = await request.post("/api/auth/login").send({
      email: "noaman.h@allshorevirtualstaffing.com",
      password: "noaman123",
    });

    expect(response.statusCode).toBe(400);

  });

  it("login route with correct username and password works", async () => {
    
    const response = await request.post("/api/auth/login").send({
      email: "noaman.h@allshorevirtualstaffing.com",
      password: "noaman123",
    });

    expect(response.statusCode).toBe(400);

  });
});
