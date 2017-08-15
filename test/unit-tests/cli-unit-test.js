'use strict';

const cli = require('../../app/libs/cli');

describe('test cli methods', () => {
  it('should throw error because of config path', () => {
    expect(() => cli.args()).toThrow(new Error('Unknown option: --config'));
  });
});
