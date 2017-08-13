'use strict';

const http = require('http');
const app = require('./app');
const config = require('./config/config');
const logger = config.logger;

logger.info('Going to create server on http://%s:%d', config.http.address, config.http.port);
http.createServer(app).listen(config.http.port, () => {
  console.log('server listening on http://%s:%d', config.http.address, config.http.port);
});

logger.info('Defining exception logging into console');
process.on('uncaughtException', (exception) => {
  console.error(exception);
  // ToDo email on failure
})
