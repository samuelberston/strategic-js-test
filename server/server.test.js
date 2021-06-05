import regeneratorRuntime from 'regenerator-runtime';

const supertest = require('supertest');

const expServer = require('./server');

test('GET /data', () => {
  supertest(expServer.app)
    .get('/data')
    .expect(200)
    .then((response) => {
      expect(response.data.exists()).toBe(true);
    });
  expServer.server.close();
});
