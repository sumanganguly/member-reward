const test = require('tape');
const _ = require('underscore');

const Cli = require('common-utility').cli;
const cli = new Cli();
const args = cli.args();

console.log('testing  - ', args);

// add in each of the test suites here
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
