'use strict';

module.exports.pingServer = function pingServer(req, res, next) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'server running' }));
};
