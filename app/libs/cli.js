'use strict';

const commandLineArgs = require('command-line-args');

module.exports.args = () => {
  const cli = commandLineArgs([{
    name: 'parts',
    type: String,
    multiple: true,
    defaultOption: true,
    defaultValue: ['all']
  }]);
  return cli.parse();
};
