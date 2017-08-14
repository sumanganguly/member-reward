'use strict';

const test = require('tape');
const request = require('supertest');
const app = require('../app');

test('should be able to create, retrieve and delete a member', function (t) {
  request(app)
    .post('/api/v1/members')
    .send({data: {name: 'Suman', email: 'suman@test.com'}})
    .expect(200)
    .end(function(err, res) {
      t.error(err, 'member successfully created');
      const memberId = res.body.data.id;

      request(app)
      .get('/api/v1/members/' + memberId)
      .expect(200)
      .end(function(err, res) {
        t.error(err, 'member successfully retrieved');

        request(app)
        .delete('/api/v1/members/' + memberId)
        .expect(204)
        .end(function(err, res) {
          t.error(err, 'member successfully deleted');
          t.end();
        });
      });
    });
});

test('should be able to create, retrieve and delete a reward', function (t) {
  request(app)
    .post('/api/v1/rewards')
    .send({data: {name: 'test eward'}})
    .expect(200)
    .end(function(err, res) {
      t.error(err, 'rewards successfully created');
      const rewardId = res.body.data.id;

      request(app)
      .get('/api/v1/rewards/' + rewardId)
      .expect(200)
      .end(function(err, res) {
        t.error(err, 'rewards successfully retrieved');

        request(app)
        .delete('/api/v1/rewards/' + rewardId)
        .expect(204)
        .end(function(err, res) {
          t.error(err, 'rewards successfully deleted');
          t.end();
        });
      });
    });
});

test('should be able to create a member, then create reward and associate reawrd and delete', function (t) {
  request(app)
    .post('/api/v1/members')
    .send({data: {name: 'Suman', email: 'suman@test.com', contactNumber: '0444444444'}})
    .expect(200)
    .end(function(err, res) {
      t.error(err, 'member successfully created');
      const memberId = res.body.data.id;

      request(app)
      .post('/api/v1/rewards')
      .send({data: {name: 'new reawrd'}})
      .expect(200)
      .end(function(err, res) {
        t.error(err, 'reward successfully created');
        const rewardId = res.body.data.id;

        request(app)
        .put('/api/v1/members/' + memberId + '/rewards/' + rewardId)
        .expect(204)
        .end(function(err, res) {
          t.error(err, 'reward successfully added to the member');

          request(app)
          .get('/api/v1/members/' + memberId + '/rewards')
          .expect(200)
          .end(function(err, res) {
            t.error(err, 'member rewards successfully retrieved');

            request(app)
            .delete('/api/v1/members/' + memberId)
            .expect(204)
            .end(function(err, res) {
              t.error(err, 'member successfully deleted');

              request(app)
              .delete('/api/v1/rewards/' + rewardId)
              .expect(204)
              .end(function(err, res) {
                t.error(err, 'reward successfully deleted');
                t.end();
              });    
            });  
          });
        });
      });
    });
});

test('Swagger validation error with input request', function (t) {
  request(app)
    .post('/api/v1/members')
    .send({data: {name: 'Suman'}})
    .expect(400)
    .end(function(err, res) {
      t.error(err, 'got swagger validation error');
      t.end();
    });
});

test('Member not found error', function (t) {
  request(app)
    .get('/api/v1/members/112233')
    .expect(404)
    .end(function(err, res) {
      t.error(err, 'Member not found error');
      t.end();
    });
});

test('reward not found error', function (t) {
  request(app)
    .get('/api/v1/rewards/112233')
    .expect(404)
    .end(function(err, res) {
      t.error(err, 'Reward not found error');
      t.end();
    });
});

test('associate reward - member not found error', function (t) {
  request(app)
    .put('/api/v1/members/112233/rewards/112233')
    .expect(404)
    .end(function(err, res) {
      t.error(err, 'Member not found error');
      t.end();
    });
});

test('associate reward - member not found error', function (t) {
  request(app)
    .get('/api/v1/members/112233/rewards')
    .expect(404)
    .end(function(err, res) {
      t.error(err, 'Member not found error');
      t.end();
    });
});

test('delete member - member not found error', function (t) {
  request(app)
    .delete('/api/v1/members/112233')
    .expect(404)
    .end(function(err, res) {
      t.error(err, 'Member not found error');
      t.end();
    });
});

test('delete reward - reward not found error', function (t) {
  request(app)
    .delete('/api/v1/rewards/112233')
    .expect(404)
    .end(function(err, res) {
      t.error(err, 'Reward not found error');
      t.end();
    });
});

test('should be able to create a member then error for invalid reward association', function (t) {
  request(app)
    .post('/api/v1/members')
    .send({data: {name: 'Suman', email: 'suman@test.com', contactNumber: '0444444444'}})
    .expect(200)
    .end(function(err, res) {
      t.error(err, 'member successfully created');
      const memberId = res.body.data.id;

      request(app)
      .put('/api/v1/members/' + memberId + '/rewards/112233')
      .expect(404)
      .end(function(err, res) {
        t.error(err, 'Reward not found error');
        t.end();
      });
    });
});
