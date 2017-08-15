'use strict';

const swaggerHelpers = require('../libs/swagger-utility');
const config = require('../../config/config');
const logger = config.logger;
const DBModelHelper = require('../libs/model-helper');
const utility = require('../libs/utility');

module.exports.createMember = function createMember(req, res, next) {
  logger.info('Received request to create member');
  const app = req.swagger.params.body.value;
  logger.debug('create member request data:', JSON.stringify(app));
  DBModelHelper.addMember(app.data, utility.newUTCDate(), utility.newUTCDate(), 'SYSTEM', 'SYSTEM')
  .then((memberId) => {
    logger.debug('member details successfully stored');
    res.statusCode = 202;
    res.setHeader('Location', req.url + '/' + memberId);
    res.end();
  })
  .catch(function(err) {
    logger.error(err, 'Error occurred while processing request');
    swaggerHelpers.processError(err, req, res, next);
  });
};

module.exports.retrieveMember = function retrieveMember(req, res, next) {
  logger.info('Received request to create member');
  const memberId = req.swagger.params['memberId'].value;
  logger.debug('retrieve member request mermerId:%s', memberId);
  DBModelHelper.getMember(memberId)
  .then((result) => {
    if (result && result.data) {
      logger.debug('member details retrieved from database');
      swaggerHelpers.sendResponse(200, result, req, res);
    } else {
      logger.warn('member details not found in the system');
      swaggerHelpers.processError(utility.createError(404, 'Member Details not found'), req, res, next);
    }
  })
  .catch(function(err) {
    logger.error(err, 'registerMember: Error occurred while processing request');
    swaggerHelpers.processError(err, req, res, next);
  });
};

module.exports.createReward = function createReward(req, res, next) {
  logger.info('Received request to create reward');
  const app = req.swagger.params.body.value;
  logger.debug('create reward request data:', JSON.stringify(app));
  DBModelHelper.addReward(app.data, utility.newUTCDate(), utility.newUTCDate(), 'SYSTEM', 'SYSTEM')
  .then((rewardId) => {
    logger.debug('member details successfully stored');
    res.statusCode = 202;
    res.setHeader('Location', req.url + '/' + rewardId);
    res.end();
  })
  .catch(function(err) {
    logger.error(err, 'Error occurred while processing request');
    swaggerHelpers.processError(err, req, res, next);
  });
};

module.exports.retrieveReward = function retrieveReward(req, res, next) {
  logger.info('Received request to retrieve reward');
  const rewardId = req.swagger.params['rewardId'].value;
  logger.debug('retrieve reward request rewardId: %s', rewardId);
  DBModelHelper.getReward(rewardId)
  .then((result) => {
    if (result && result.data) {
      logger.debug('reward details retrieved from database');
      swaggerHelpers.sendResponse(200, result, req, res);
    } else {
      logger.warn('reward details not found in the system');
      swaggerHelpers.processError(utility.createError(404, 'Reward details not found'), req, res, next);
    }
  })
  .catch(function(err) {
    logger.error(err, 'Error occurred while processing request');
    swaggerHelpers.processError(err, req, res, next);
  });
};

module.exports.associateReward = function associateReward(req, res, next) {
  logger.info('Received request to associate reward');
  const memberId = req.swagger.params['memberId'].value;
  const rewardId = req.swagger.params['rewardId'].value;
  logger.debug('associate reward request data, memberId: %s, rewardId: %s', memberId, rewardId);
  DBModelHelper.getMember(memberId)
  .then((result) => {
    if (result && result.data) {
      logger.debug('member details retrieved from database');
      return DBModelHelper.getReward(rewardId);
    } else {
      logger.warn('member details not found in the system');
      return new Promise((resolve, reject) => {reject(utility.createError(404, 'Member details not found'));});
    }
  })
  .then((result) => {
    if (result && result.data) {
      logger.debug('reward details retrieved from database');
      return DBModelHelper.getSpecificMemberReward(memberId, rewardId);
    } else {
      logger.warn('reward details not found in the system');
      return new Promise((resolve, reject) => {reject(utility.createError(404, 'Reward details not found'));});
    }
  })
  .then((result) => {
    if (result && result.data) {
      logger.warn('reward is already associated with the member');
      return new Promise((resolve, reject) => {reject(utility.createError(409, 'Member is already having the the reward'));});
    } else {
      logger.debug('reward is not associated with memeber, associating now');
      DBModelHelper.addMemberReward(memberId, rewardId, utility.newUTCDate(), utility.newUTCDate(), 'SYSTEM', 'SYSTEM');      
    }
  })
  .then(() => {
    logger.debug('reward is successfully added to the member');
    res.statusCode = 202;
    res.setHeader('Location', req.url.substring(0, req.url.lastIndexOf('/')));
    res.end();
  })
  .catch(function(err) {
    logger.error(err, 'Error occurred while processing request');
    swaggerHelpers.processError(err, req, res, next);
  });
};

module.exports.retrieveMemberRewards = function retrieveMemberRewards(req, res, next) {
  logger.info('Received request to retrieve reward for a member');
  const memberId = req.swagger.params['memberId'].value;
  logger.debug('retrieve reward request memberId: %s', memberId);
  DBModelHelper.getMember(memberId)
  .then((result) => {
    if (result && result.data) {
      logger.debug('member details retrieved from database');
      return DBModelHelper.getMemberAllRewards(memberId);
    } else {
      logger.warn('member details not found in the system');
      return new Promise((resolve, reject) => {reject(utility.createError(404, 'Member details not found'));});
    }
  })
  .then((result) => {
    if (result && result.length > 0) {
      logger.debug('member rewards retrieved from database');
      swaggerHelpers.sendResponse(200, {data: result}, req, res);
    } else {
      logger.warn('no reward found in the system for the member');
      return new Promise((resolve, reject) => {reject(utility.createError(404, 'No reward associated with the member'));});
    }
  })
  .catch(function(err) {
    logger.error(err, 'Error occurred while processing request');
    swaggerHelpers.processError(err, req, res, next);
  });
};

module.exports.deleteMember = function deleteMember(req, res, next) {
  logger.info('Received request to delete member');
  const memberId = req.swagger.params['memberId'].value;
  logger.debug('delete member request data, memberId: %s', memberId);
  DBModelHelper.getMember(memberId)
  .then((result) => {
    if (result && result.data) {
      logger.debug('member details retrieved from database');
      return DBModelHelper.deleteMemberRewards({memberId: memberId});
    } else {
      logger.warn('member details not found in the system');
      return new Promise((resolve, reject) => {reject(utility.createError(404, 'Member details not found'));});
    }
  })
  .then((result) => {
    if (result > 0) {
      logger.debug('member rewards successfully deleted');
    } else {
      logger.warn('no rewards were associated with the member to be deleted');
    }
    return DBModelHelper.deleteMember(memberId);
  })
  .then((result) => {
    if (result > 0) {
      logger.debug('member is successfully deleted');
    } else {
      logger.warn('no member found in the system now to delete');
    }
    swaggerHelpers.sendResponse(204, null, req, res);
  })
  .catch(function(err) {
    logger.error(err, 'Error occurred while processing request');
    swaggerHelpers.processError(err, req, res, next);
  });
};

module.exports.deleteReward = function deleteReward(req, res, next) {
  logger.info('Received request to delete reward');
  const rewardId = req.swagger.params['rewardId'].value;
  logger.debug('delete reward request data, rewardId: %s', rewardId);
  DBModelHelper.getReward(rewardId)
  .then((result) => {
    if (result && result.data) {
      logger.debug('reward details retrieved from database');
      return DBModelHelper.deleteMemberRewards({rewardId: rewardId});
    } else {
      logger.warn('reward details not found in the system');
      return new Promise((resolve, reject) => {reject(utility.createError(404, 'Reward details not found'));});
    }
  })
  .then((result) => {
    if (result > 0) {
      logger.debug('member rewards successfully deleted');
    } else {
      logger.warn('the reward was not associated with any member');
    }
    return DBModelHelper.deleteRewards(rewardId);
  })
  .then((result) => {
    if (result > 0) {
      logger.debug('reward successfully deleted');
    } else {
      logger.warn('no reward found in the system now to delete');
    }
    swaggerHelpers.sendResponse(204, null, req, res);
  })
  .catch(function(err) {
    logger.error(err, 'Error occurred while processing request');
    swaggerHelpers.processError(err, req, res, next);
  });
};
