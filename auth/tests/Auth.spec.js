jest.useFakeTimers()

let supertest = require('supertest')
require('dotenv').config({path: '.env.test', debug: true  })
const http = require('http');
let { initDb,closeConnection } = require('../database/init');
let { initAcl } = require('../acl/init');
let { boot,registerRoutes } = require("../app");

let baseUrl;
baseUrl = 'http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT 

beforeAll(() => {    
    initDb()    
});

afterAll(() => {
    closeConnection()    
});

beforeAll((done) => {
    server = http.createServer(registerRoutes());
    server.listen(done);
    request = supertest(server);
  });

  afterAll((done) => {
    server.close(done);
  });

describe('Login ',() => {
    //const route =  request(baseUrl).post('/api/auth/login')       

    test('login route is not 500', async () => {        
        
        
    });
})
