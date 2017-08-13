'use strict';

const swaggerHelpers = require('../libs/swagger-utility');
const config = require('../../config/config');
const logger = config.logger;
const DBUtility = require('../db/db-utility');
const utility = require('../libs/utility');

module.exports.createMember = function createMember(req, res, next) {
  logger.info('createMember: Received request to create member');
  const app = req.swagger.params.body.value;
  logger.debug('createMember: create member request data:', JSON.stringify(app));
  const dbUtility = new DBUtility();
  dbUtility.executeQuery('insert into members(member_name, member_email, member_contact, member_created_date, member_updated_date, member_created_by, member_updated_by)values(?,?,?,?,?,?,?)', [app.data.name, app.data.email, app.data.contactNumber, utility.newUTCDate(), utility.newUTCDate(), 'SYSTEM', 'SYSTEM'])
  .then((result) => {
    logger.debug('createMember: member details successfully stored');
    return dbUtility.executeQuery('select member_id, member_name, member_email, member_contact, member_created_date, member_updated_date, member_created_by, member_updated_by from members where member_id = ?', [result.insertId])
  })
  .then((result) => {
    const responseObject = {
      data: {
        id: result[0].member_id,
        name: result[0].member_name,
        email: result[0].member_email,
        contactNumber: result[0].member_contact,
        createdDate: utility.parseUTCFormattedDateTimeMilis(result[0].member_created_date),
        updatedDate: utility.parseUTCFormattedDateTimeMilis(result[0].member_updated_date),
        createdBy: result[0].member_created_by,
        updatedBy: result[0].member_updated_by
      }
    }
    dbUtility.end();
    swaggerHelpers.sendResponse(200, responseObject, req, res);
  })
  .catch(function(err) {
    dbUtility.end();
    logger.error(err, 'createMember: Error occurred while processing request');
    swaggerHelpers.processError(err, req, res, next);
  })
}

module.exports.retrieveMember = function retrieveMember(req, res, next) {
  logger.info('retrieveMember: Received request to create member');
  const memberId = req.swagger.params['memberId'].value;
  logger.debug('retrieveMember: retrieve member request mermerId:%s', memberId);
  const dbUtility = new DBUtility();
  dbUtility.executeQuery('select member_id, member_name, member_email, member_contact, member_created_date, member_updated_date, member_created_by, member_updated_by from members where member_id = ?', [memberId])
  .then((result) => {
    dbUtility.end();
    if (result && result.length > 0) {
      const responseObject = {
        data: {
          id: result[0].member_id,
          name: result[0].member_name,
          email: result[0].member_email,
          contactNumber: result[0].member_contact,
          createdDate: utility.parseUTCFormattedDateTimeMilis(result[0].member_created_date),
          updatedDate: utility.parseUTCFormattedDateTimeMilis(result[0].member_updated_date),
          createdBy: result[0].member_created_by,
          updatedBy: result[0].member_updated_by
        }
      }
      swaggerHelpers.sendResponse(200, responseObject, req, res);
    } else {
      swaggerHelpers.processError(utility.createError(404, 'Member Details not found'), req, res, next);
    }
  })
  .catch(function(err) {
    dbUtility.end();
    logger.error(err, 'registerMember: Error occurred while processing request');
    swaggerHelpers.processError(err, req, res, next);
  })
}

module.exports.createReward = function createReward(req, res, next) {
  logger.info('createReward: Received request to create reward');
  const app = req.swagger.params.body.value;
  logger.debug('createReward: create reward request data:', JSON.stringify(app));
  const dbUtility = new DBUtility();
  dbUtility.executeQuery('insert into rewards(reward_name, reward_created_date, reward_updated_date, reward_created_by, reward_updated_by)values(?,?,?,?,?)', [app.data.name, utility.newUTCDate(), utility.newUTCDate(), 'SYSTEM', 'SYSTEM'])
  .then((result) => {
    logger.debug('createReward: member details successfully stored');
    return dbUtility.executeQuery('select reward_id, reward_name, reward_created_date, reward_updated_date, reward_created_by, reward_updated_by from rewards where reward_id = ?', [result.insertId])
  })
  .then((result) => {
    const responseObject = {
      data: {
        id: result[0].reward_id,
        name: result[0].reward_name,
        createdDate: utility.parseUTCFormattedDateTimeMilis(result[0].reward_created_date),
        updatedDate: utility.parseUTCFormattedDateTimeMilis(result[0].reward_updated_date),
        createdBy: result[0].reward_created_by,
        updatedBy: result[0].reward_updated_by
      }
    }
    dbUtility.end();
    swaggerHelpers.sendResponse(200, responseObject, req, res);
  })
  .catch(function(err) {
    dbUtility.end();
    logger.error(err, 'createReward: Error occurred while processing request');
    swaggerHelpers.processError(err, req, res, next);
  })
}

module.exports.retrieveReward = function retrieveReward(req, res, next) {
  logger.info('retrieveReward: Received request to retrieve reward');
  const rewardId = req.swagger.params['rewardId'].value;
  logger.debug('retrieveReward: retrieve reward request rewardId: %s', rewardId);
  const dbUtility = new DBUtility();
  dbUtility.executeQuery('select reward_id, reward_name, reward_created_date, reward_updated_date, reward_created_by, reward_updated_by from rewards where reward_id = ?', [rewardId])
  .then((result) => {
    dbUtility.end();
    if (result && result.length > 0) {
      const responseObject = {
        data: {
          id: result[0].reward_id,
          name: result[0].reward_name,
          createdDate: utility.parseUTCFormattedDateTimeMilis(result[0].reward_created_date),
          updatedDate: utility.parseUTCFormattedDateTimeMilis(result[0].reward_updated_date),
          createdBy: result[0].reward_created_by,
          updatedBy: result[0].reward_updated_by
        }
      }
      swaggerHelpers.sendResponse(200, responseObject, req, res);
    } else {
      swaggerHelpers.processError(utility.createError(404, 'Reward details not found'), req, res, next);
    }
  })
  .catch(function(err) {
    dbUtility.end();
    logger.error(err, 'retrieveReward: Error occurred while processing request');
    swaggerHelpers.processError(err, req, res, next);
  })
}

module.exports.associateReward = function associateReward(req, res, next) {
  logger.info('associateReward: Received request to associate reward');
  const memberId = req.swagger.params['memberId'].value;
  const rewardId = req.swagger.params['rewardId'].value;
  logger.debug('associateReward: associate reward request data, memberId: %s, rewardId: %s', memberId, rewardId);
  const dbUtility = new DBUtility();
  dbUtility.executeQuery('select member_id from members where member_id = ?', [memberId])
  .then((result) => {
    logger.debug('member is: ' + JSON.stringify(result));
    if (result && result.length > 0) {
      return dbUtility.executeQuery('select reward_id from rewards where reward_id = ?', [rewardId])
    } else {
      swaggerHelpers.processError(utility.createError(404, 'Member details not found'), req, res, next);
    }
  })
  .then((result) => {
    logger.debug('reward is: ' + JSON.stringify(result));
    if (result && result.length > 0) {
      return dbUtility.executeQuery('select member_id from member_rewards where member_id = ? and reward_id = ?', [memberId, rewardId])
    } else {
      swaggerHelpers.processError(utility.createError(404, 'Reward details not found'), req, res, next);
    }
  })
  .then((result) => {
    if (result && result.length > 0) {
      swaggerHelpers.processError(utility.createError(409, 'Member is already having the the reward'), req, res, next);
    } else {
      dbUtility.executeQuery('insert into member_rewards(member_id, reward_id, member_rewards_created_date, member_rewards_updated_date, member_rewards_created_by, member_rewards_updated_by)values(?,?,?,?,?,?)', [memberId, rewardId, utility.newUTCDate(), utility.newUTCDate(), 'SYSTEM', 'SYSTEM'])      
    }
  })
  .then((result) => {
    swaggerHelpers.sendResponse(204, null, req, res);
  })
  .catch(function(err) {
    dbUtility.end();
    logger.error(err, 'associateReward: Error occurred while processing request');
    swaggerHelpers.processError(err, req, res, next);
  })
}

module.exports.retrieveMemberRewards = function retrieveMemberRewards(req, res, next) {
  logger.info('retrieveMemberRewards: Received request to retrieve reward for a member');
  const memberId = req.swagger.params['memberId'].value;
  logger.debug('retrieveMemberRewards: retrieve reward request memberId: %s', memberId);
  const dbUtility = new DBUtility();
  dbUtility.executeQuery('select member_id from members where member_id = ?', [memberId])
  .then((result) => {
    if (result && result.length > 0) {
      return dbUtility.executeQuery('select r.reward_id, r.reward_name, r.reward_created_date, r.reward_updated_date, r.reward_created_by, r.reward_updated_by from rewards as r, member_rewards as mr where r.reward_id = mr.reward_id and mr.member_id = ?', [memberId])
    } else {
      swaggerHelpers.processError(utility.createError(404, 'Member details not found'), req, res, next);
    }
  })
  .then((result) => {
    dbUtility.end();
    if (result && result.length > 0) {
      let rewards = [];
      result.forEach(function(element) {
        rewards.push(
          {
            id: element.reward_id,
            name: element.reward_name,
            createdDate: utility.parseUTCFormattedDateTimeMilis(element.reward_created_date),
            updatedDate: utility.parseUTCFormattedDateTimeMilis(element.reward_updated_date),
            createdBy: element.reward_created_by,
            updatedBy: element.reward_updated_by
          }
        );
      }, this);
      swaggerHelpers.sendResponse(200, {data: rewards}, req, res);
    } else {
      swaggerHelpers.processError(utility.createError(404, 'No reward associated with the member'), req, res, next);
    }
  })
  .catch(function(err) {
    dbUtility.end();
    logger.error(err, 'retrieveMemberRewards: Error occurred while processing request');
    swaggerHelpers.processError(err, req, res, next);
  })
}

module.exports.deleteMember = function deleteMember(req, res, next) {
  logger.info('deleteMember: Received request to delete member');
  const memberId = req.swagger.params['memberId'].value;
  logger.debug('deleteMember: delete member request data, memberId: %s', memberId);
  const dbUtility = new DBUtility();
  dbUtility.executeQuery('select member_id from members where member_id = ?', [memberId])
  .then((result) => {
    if (result && result.length > 0) {
      return dbUtility.executeQuery('delete from member_rewards where member_id = ?', [memberId])
    } else {
      swaggerHelpers.processError(utility.createError(404, 'Member details not found'), req, res, next);
    }
  })
  .then((result) => {
    return dbUtility.executeQuery('delete from members where member_id = ?', [memberId])
  })
  .then((result) => {
    swaggerHelpers.sendResponse(204, null, req, res);
  })
  .catch(function(err) {
    dbUtility.end();
    logger.error(err, 'deleteMember: Error occurred while processing request');
    swaggerHelpers.processError(err, req, res, next);
  })
}

module.exports.deleteReward = function deleteReward(req, res, next) {
  logger.info('deleteReward: Received request to delete reward');
  const rewardId = req.swagger.params['rewardId'].value;
  logger.debug('deleteReward: delete reward request data, rewardId: %s', rewardId);
  const dbUtility = new DBUtility();
  dbUtility.executeQuery('select reward_id from rewards where reward_id = ?', [rewardId])
  .then((result) => {
    if (result && result.length > 0) {
      return dbUtility.executeQuery('delete from member_rewards where reward_id = ?', [rewardId])
    } else {
      swaggerHelpers.processError(utility.createError(404, 'Reward details not found'), req, res, next);
    }
  })
  .then((result) => {
    return dbUtility.executeQuery('delete from rewards where reward_id = ?', [rewardId])
  })
  .then((result) => {
    swaggerHelpers.sendResponse(204, null, req, res);
  })
  .catch(function(err) {
    dbUtility.end();
    logger.error(err, 'deleteReward: Error occurred while processing request');
    swaggerHelpers.processError(err, req, res, next);
  })
}
