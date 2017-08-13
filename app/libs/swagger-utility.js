'use strict';

var http = require('http');
var fs = require('fs');
const logger = require('../../config/config').logger;

module.exports.processError = function processError(err, req, res, next) {
  // Return a JSON representation of #/definitions/errors
  if (err.code) {
    res.statusCode = err.code;    
  } else {
    res.statusCode = 500;
  }
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({errors: [{message:  err.message}]}));
};

module.exports.sendResponse = function sendResponse(statusCode, obj, req, res) {
  res.statusCode = statusCode;
  switch (statusCode) {
    case 200:
    case 201:
    case 500:
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(obj || {}, null, 2));
      break;
    case 202:
    case 204:
      res.end();
      break;
    case 400:
    case 403:
    case 404:
    case 409:
    default:
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({errors: [{message:  http.STATUS_CODES[statusCode]}]}, null, 2));
      break;
  }
}

module.exports.convertYaml = function convertYaml(filename, obj) {
  fs.writeFile(filename, JSON.stringify(obj, null, 2),(err) => {
    if (err) {
      logger.error('Error occurred while writing yml file')
    }
  });
}
