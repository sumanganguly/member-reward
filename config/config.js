const CommonLogger = require('../logger')
const logger = CommonLogger.getLogger('member-reward');

const configSettings = {
  'ci': {
    'label': 'local',
    'http': {
      'address': 'localhost',
      'port': 80,
      'requestCert': false,
      'rejectUnauthorized': false
    },
    'logger': logger
  },
  'local': {
    'label': 'local',
    'http': {
      'address': 'localhost',
      'port': 80,
      'requestCert': false,
      'rejectUnauthorized': false
    },
    'logger': logger
  },
  'dev': {
    'label': 'dev',
    'http': {
      'address': 'localhost',
      'port': 80,
      'requestCert': false,
      'rejectUnauthorized': false
    },
    'logger': logger
  },
  'test': {
    'label': 'test',
    'http': {
      'address': 'localhost',
      'port': 80,
      'requestCert': false,
      'rejectUnauthorized': false
    },
    'logger': logger
  },
  'preprod': {
    'label': 'test',
    'http': {
      'address': 'localhost',
      'port': 80,
      'requestCert': false,
      'rejectUnauthorized': false
    },
    'logger': logger
  },
  'prod': {
    'label': 'prod',
    'http': {
      'address': 'localhost',
      'port': 80,
      'requestCert': false,
      'rejectUnauthorized': false
    },
    'logger': logger
  }
};

module.exports = configSettings[process.env.APP_ENV || 'local'];
