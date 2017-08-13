const CommonLogger = require('../logger')
const logger = CommonLogger.getLogger('member-reward');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const configSettings = {
  'ci': {
    'label': 'local',
    'http': {
      'address': 'localhost',
      'port': 8082,
      'requestCert': false,
      'rejectUnauthorized': false
    },
    'logger': logger
  },
  'local': {
    'label': 'local',
    'http': {
      'address': 'localhost',
      'port': 8082,
      'requestCert': false,
      'rejectUnauthorized': false
    },
    'logger': logger
  },
  'dev': {
    'label': 'dev',
    'http': {
      'address': 'localhost',
      'port': 8082,
      'requestCert': false,
      'rejectUnauthorized': false
    },
    'logger': logger
  },
  'st': {
    'label': 'test',
    'http': {
      'address': 'localhost',
      'port': 8082,
      'requestCert': false,
      'rejectUnauthorized': false
    },
    'logger': logger
  },
  'sit': {
    'label': 'test',
    'http': {
      'address': 'localhost',
      'port': 8082,
      'requestCert': false,
      'rejectUnauthorized': false
    },
    'logger': logger
  },
  'nft': {
    'label': 'test',
    'http': {
      'address': 'localhost',
      'port': 8082,
      'requestCert': false,
      'rejectUnauthorized': false
    },
    'logger': logger
  },
  'preprod': {
    'label': 'test',
    'http': {
      'address': 'localhost',
      'port': 8082,
      'requestCert': false,
      'rejectUnauthorized': false
    },
    'logger': logger
  },
  'prod': {
    'label': 'prod',
    'http': {
      'address': 'localhost',
      'port': 8082,
      'requestCert': false,
      'rejectUnauthorized': false
    },
    'logger': logger
  }
};

module.exports = configSettings[process.env.APP_ENV || 'local'];
