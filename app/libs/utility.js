'use strict';

const moment = require('moment');

module.exports.newUTCDate = () => {
  return new Date();
};

module.exports.parseUTCFormattedDateTimeMilis = (inDate) => {  
  return moment().utc(inDate).format('YYYY-MM-DD HH:mm:ss.SSSZ');
};

module.exports.createError = (code, message) => {
  let error = new Error(message);
  error.code = code;
  return error;
};
