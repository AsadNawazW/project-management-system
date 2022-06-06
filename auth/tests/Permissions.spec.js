import supertest from "supertest";
import { faker } from "@faker-js/faker";
require("dotenv").config({ path: ".env.test", debug: true });
import http from "http";
import { initDb, closeConnection, dropDatabase, dropCollection,clearDatabase } from "../database/init";
import { initAcl } from "../acl/init";
import { boot, registerRoutes } from "../app";

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


import PermissionService from "../services/PermissionService";
let PermissionServiceObj = new PermissionService();

describe("Permissions ", () => {

  let server;
  let request;

  beforeAll(async () => {
    process.env.MONGODB_DATABASE += '_permissions'  
    initDb();
    await initAcl();
  });

  afterAll(async () => {
    await clearDatabase();
    await closeConnection();
  });

  beforeAll(done => {
    server = http.createServer(registerRoutes());
    server = require('http-shutdown')(server);
    server.listen(done);
    request = supertest(server);
  });

  afterAll(() => {
    server.shutdown()
  });



  test("List all permissions", async () => {
    // Arrange

    // Act
    const response = await request.get("/api/permissions");

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
  });

  test("Get a single permission", async () => {
    // Arrange
    let permissionObj = {
      name: faker.name.firstName(),
    };

    const permissionModel = await PermissionServiceObj.Permission.create(permissionObj);

    // Act
    const response = await request.get("/api/permissions/" + permissionModel._id);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.hasOwnProperty("name")).toBeTruthy();    
    
  });

  test("Create a new permission", async () => {
    // Arrange
    let req = {
      name: faker.name.firstName()
    };

    // Act
    const response = await request.post("/api/permissions").send(req);

    // Assert
    expect(response.statusCode).toBe(201);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.hasOwnProperty("name")).toBeTruthy();
  });

  test("Updates a permission", async () => {
    // Arrange
    let permissionObj = {
      name: faker.name.firstName()
    };

    const permissionModel = await PermissionServiceObj.Permission.create(permissionObj);

    permissionObj.new_name = faker.name.firstName();    

    // Act
    const response = await request.patch("/api/permissions").send(permissionObj);

    // Assert    ;
    
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.name).toEqual(permissionObj.new_name);
  });

  test("Deletes a permission", async () => {
    // Arrange
    let permissionObj = {
      name: faker.name.firstName()
    };

    let permissionModel = await PermissionServiceObj.Permission.create(permissionObj);
    
    // Act
    const response = await request.delete("/api/permissions").send(permissionObj);

    // Assert
    expect(response.statusCode).toBe(204);

    let newPermissionModel = await PermissionServiceObj.Permission.findOne({name: permissionObj.name});
    expect(newPermissionModel).toBeNull()

  });

});
