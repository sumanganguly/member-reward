'use strict';

const connect = require('connect');
const swaggerTools = require('swagger-tools');
const swaggerHelpers = require('./libs/swagger-utility');
const jsyaml = require('js-yaml');
const config = require('../config/config');
const logger = config.logger;
const fs = require('fs');
let app = connect();

// test for
logger.debug('Configuring the application now');

// swaggerRouter configuration
const options = {
  controllers: './app/controllers'
};

let swaggerDoc = jsyaml.safeLoad(fs.readFileSync(__dirname.concat('/api/swagger.yaml')));

// Start the server
const serverPort = config.http.port;
const serverAddress = config.http.address;

if (serverAddress && serverPort) {
  swaggerDoc.host = serverAddress + ':' + serverPort;
}

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain

  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator({ validateResponse: true }));

  // Proper error handler for Swagger validation error
  app.use((err, req, res, next) => {
    swaggerHelpers.processSwaggerValidationError(err, req, res, next);
  });

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi({apiDocs: '/api-docs', swaggerUi: '/docs'}
  ));
});

module.exports = app;
