
const dbConfig = {
  'ci': {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'member-reward'
  },
  'local': {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'member-reward'
  },
  'dev': {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'member-reward'
  },
  'test': {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'member-reward'
  },
  'preprod': {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'member-reward'
  },
  'prod': {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'member-reward'
  }
}

module.exports = dbConfig[process.env.APP_ENV || 'local'];
