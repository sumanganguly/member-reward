'use strict';

const utility = require('../../app/libs/utility');

describe('test utility methods', () => {
  it('should have the date generated', () => {
    const date = utility.newUTCDate();
    expect(date).toBeDefined();
  });

  it('should have the date generated in UTC format as specified', () => {
    const date = utility.parseUTCFormattedDateTimeMilis(new Date());
    expect(date.length).toBe(29);
  });

  it('should have the error object created as per input', () => {
    const error = utility.createError(200, 'Successful');
    expect(error.code).toBe(200);
    expect(error.message).toBe('Successful');
  });
});
