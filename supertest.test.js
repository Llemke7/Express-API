const request = require('supertest');
const app = require('./express'); 

let server;

beforeAll(done => {
    server = app.listen(done);
  });

describe('GET /items', () => {
    it('responds with json containing a list of items', async () => {
      const server = app.listen(); 
      const response = await request(server).get('/items');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
      server.close(); 
    });
  });

describe('POST /items', () => {
  it('adds a new item to the list', async () => {
    const newItem = { name: 'apple', price: 1.00 };
    const response = await request(app)
      .post('/items')
      .send(newItem);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ added: newItem });
  });
});


afterEach(() => {
  global.items = [];
});


afterAll(done => {
    server.close(done);
  });
