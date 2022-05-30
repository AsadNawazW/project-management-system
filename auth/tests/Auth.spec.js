
const request = require('supertest');

let baseUrl;

beforeEach(() => {
    require('dotenv').config()
    baseUrl = 'http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT
});

describe('Authentication ',() => {
    test('register route is not 404', async () => {        
        const response =  request(baseUrl).post('/api/auth/register')
        
        //expect(response.statusCode).to
    });
})
