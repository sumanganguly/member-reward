const test = require('tape');
const request = require('supertest');
const app = require('../app');

test('ping test', function(t) {
  request(app)
    .get('/api/v1/app/ping')
    .expect(200)
    .expect({ message: 'server running' })
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      t.error(err, 'No error');
      t.end();
    });
});
