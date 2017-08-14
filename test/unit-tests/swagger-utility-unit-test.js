'use strict';

const swaggerUtility = require('../../app/libs/swagger-utility');

describe('test swagger utility methods', () => {
  let res = {};
  beforeEach(() => {
    res.end = (responseData) => {};
    res.setHeader = (type, header) => {};
  });

  it('should have the response processed - response 200', () => {
    swaggerUtility.sendResponse(200, {}, null, res);
    expect(res.statusCode).toBe(200);
  });

  it('should have the response processed - response 204', () => {
    swaggerUtility.sendResponse(204, {}, null, res);
    expect(res.statusCode).toBe(204);
  });

  it('should have the response processed - response 500', () => {
    swaggerUtility.sendResponse(500, {}, null, res);
    expect(res.statusCode).toBe(500);
  });

  it('should have the error processed - generic error', () => {
    swaggerUtility.processError(new Error('Unknown Error'), null, res, null);
    expect(res.statusCode).toBe(500);
  });

  it('should have the error processed - specific error error', () => {
    let error = new Error('Not Found');
    error.code = 404;
    swaggerUtility.processError(error, null, res, null);
    expect(res.statusCode).toBe(404);
  });

  it('should have the swagger validation error processed', () => {
    let error = new Error('Not Found');
    error.results = {};
    let messages = [{message: 'Message 1'}, {message: 'Message 2'}];
    error.results.errors = messages;
    swaggerUtility.processSwaggerValidationError(error, null, res, null);
    expect(res.statusCode).toBe(404);
  });
});
