var test = require('tape');
var request = require('supertest');
var app = require('../app');

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
