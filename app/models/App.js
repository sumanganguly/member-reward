const library = require('common-db-utility').library;
const dbConfig = require('../../config/db-config');

const Schema = library.Schema;

// simple schema to capture a remote app registration for security purposes
const appSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    hashKey: true
  }, // Primary Key
  type: {type: String, default: 'App'},
  name: {
    type: String,
    required: true,
    rangeKey: true,
    index: {
      global: true
    }
  },
  email: String,
  channel: String,
  userAgent: String,
  ipAddress: String,
  appKey: {
    type: String,
    index: {
      global: true
    }
  },
  secret: String,
  createdAt: {type: Date, default: new Date()},
  updatedAt: {type: Date, default: new Date()}
}, {throughput: {read: dbConfig.readThroughput, write: dbConfig.writeThroughput}, useDocumentTypes: true});
const App = library.model(dbConfig.dbEnvironment + '-App', appSchema, {
  create: true, // Create table in DB, if it does not exist,
  update: true, // Update remote indexes if they do not match local index structure
  waitForActive: true, // Wait for table to be created before trying to use it
  waitForActiveTimeout: 60000 // wait 1 minutes for table to activate
});

module.exports = App;
