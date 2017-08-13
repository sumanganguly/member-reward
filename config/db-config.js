
const dbConfig = {
  'ci': {
    host: 'localhost',
    user: 'root',
    password: 'suman_gang',
    database: 'member-reward'
  },
  'local': {
    host: 'localhost',
    user: 'root',
    password: 'suman_gang',
    database: 'member-reward'
  },
  'dev': {
    'readThroughput': 15,
    'writeThroughput': 5,
    'timeout': 5000,
    'dbEnvironment': process.env.AWS_ENV || 'dev'
  },
  'st': {
    'readThroughput': 15,
    'writeThroughput': 5,
    'timeout': 5000,
    'dbEnvironment': process.env.AWS_ENV || 'st'
  },
  'sit': {
    'readThroughput': 15,
    'writeThroughput': 5,
    'timeout': 5000,
    'dbEnvironment': process.env.AWS_ENV || 'sit'
  },
  'nft': {
    'readThroughput': 15,
    'writeThroughput': 5,
    'timeout': 5000,
    'dbEnvironment': process.env.AWS_ENV || 'nft'
  },
  'preprod': {
    'readThroughput': 15,
    'writeThroughput': 5,
    'timeout': 5000,
    'dbEnvironment': process.env.AWS_ENV || 'preprod'
  },
  'prod': {
    'readThroughput': 15,
    'writeThroughput': 5,
    'timeout': 5000,
    'dbEnvironment': process.env.AWS_ENV || 'prod'
  }
}

module.exports = dbConfig[process.env.APP_ENV || 'local'];
