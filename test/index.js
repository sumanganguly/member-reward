'use strict';

const test = require('tape');
const _ = require('underscore');
const cli = require('../app/libs/cli');
const args = cli.args();

_.each(args.parts, (key) => {
  switch (key) {
  case 'ping':
    require('./ping');
    break;
  case 'apps':
    require('./apps');
    break;
  default:
    require('./ping');
    require('./apps');
  }
});

test.onFinish(function() {
  process.exit(0);
});
