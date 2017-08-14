'use strict';

const dbConfig = require('../../config/db-config');
const mysql = require('mysql');

class DBUtility {
  constructor() {
    this.connection = mysql.createConnection({
      host     : dbConfig.host,
      user     : dbConfig.user,
      password : dbConfig.password,
      database : dbConfig.database
    });
    this.connection.connect();
  }

  executeQuery(query, posts) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, posts, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  
  end() {
    this.connection.end();
  }
}

module.exports = DBUtility;
