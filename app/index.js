'use strict';

const connect = require('connect');
const swaggerTools = require('swagger-tools');
const swaggerHelpers = require('./libs/swagger-utility');
const jsyaml = require('js-yaml');
const api = require('./api');
const config = require('../config/config');
const logger = config.logger;
const fs = require('fs');
let app = connect();

// test for
logger.debug('Configuring the application now');

// swaggerRouter configuration
const options = {
  swaggerUi: '/swagger.json',
  controllers: './app/controllers',
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// read in the parts of the swagger spec
let components = api.readSpec();

// now combine them into a complete document
let spec = components.info;
// load paths
for (let pathKey in components.parts) {
  spec += components.parts[pathKey].path
}
// these elements must be include in any app
spec += components.errors;

// load definitions
for (let defnKey in components.parts) {
  spec += components.parts[defnKey].defn
}

fs.writeFileSync('./app/api/swagger.yaml', spec);

let swaggerDoc = jsyaml.safeLoad(spec);

// to see what the combined yaml looks like uncomment the below
swaggerHelpers.convertYaml('./app/api/swagger.json', swaggerDoc);
logger.debug('Swagger definition generated');

// Start the server
const serverPort = config.http.port;
const serverAddress = config.http.address;

if (serverAddress && serverPort) {
  console.log('swaggerDoc.host=' + swaggerDoc.host);
  swaggerDoc.host = serverAddress + ':' + serverPort;
}

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain

  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Proper error handler for Swagger validation error
  app.use((err, req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ errors: [ err ] }))
  })

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi({
    apiDocs: '/api-docs',
    swaggerUi: '/docs'}
  ));
});

logger.debug('Middleware and Swagger api-docs uri defined');

// redirect errors to a helper that sends a conformant error status
app.use(function (err, req, res, next) {
  swaggerHelpers.processError(err, req, res, next);
});
logger.debug('Swagger error handler defined');

module.exports = app;
