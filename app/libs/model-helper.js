'use strict';
const utility = require('./utility');
const config = require('../../config/config');
const logger = config.logger;
const DBUtility = require('../db/db-utility');

class DBModelHelper {

  static addMember(member, createdDate, updatedDate, createdBy, updatedBy) {
    return new Promise((resolve, reject) => {
      const dbUtility  =  new DBUtility();
      dbUtility.executeQuery('insert into members(member_name, member_email, member_contact, member_created_date, member_updated_date, member_created_by, member_updated_by)values(?,?,?,?,?,?,?)', [member.name, member.email, member.contactNumber, createdDate, updatedDate, createdBy, updatedBy])
        .then((result) => {
          dbUtility.end();
          resolve(result.insertId);
        })
        .catch(function (err) {
          dbUtility.end();
          logger.error(err, 'addMember: Error occurred while processing request');
          reject(err);
        });
    });
  }

  static getMember(memberId) {
    return new Promise((resolve, reject) => {
      const dbUtility  =  new DBUtility();
      dbUtility.executeQuery('select member_id, member_name, member_email, member_contact, member_created_date, member_updated_date, member_created_by, member_updated_by from members where member_id = ?', [memberId])
        .then((result) => {
          let member = {};
          if (result && result.length > 0) {
            member.data = {
              id: result[0].member_id,
              name: result[0].member_name,
              email: result[0].member_email,
              contactNumber: result[0].member_contact,
              createdDate: utility.parseUTCFormattedDateTimeMilis(result[0].member_created_date),
              updatedDate: utility.parseUTCFormattedDateTimeMilis(result[0].member_updated_date),
              createdBy: result[0].member_created_by,
              updatedBy: result[0].member_updated_by
            };
          }
          dbUtility.end();
          resolve(member);
        })
        .catch(function (err) {
          dbUtility.end();
          logger.error(err, 'getMember: Error occurred while processing request');
          reject(err);
        });
    });
  }

  static addReward(reward, createdDate, updatedDate, createdBy, updatedBy) {
    return new Promise((resolve, reject) => {
      const dbUtility  =  new DBUtility();
      dbUtility.executeQuery('insert into rewards(reward_name, reward_created_date, reward_updated_date, reward_created_by, reward_updated_by)values(?,?,?,?,?)', [reward.name, createdDate, updatedDate, createdBy, updatedBy])
        .then((result) => {
          dbUtility.end();
          resolve(result.insertId);
        })
        .catch(function (err) {
          dbUtility.end();
          logger.error(err, 'addReward: Error occurred while processing request');
          reject(err);
        });
    });
  }

  static getReward(rewardId) {
    return new Promise((resolve, reject) => {
      const dbUtility  =  new DBUtility();
      dbUtility.executeQuery('select reward_id, reward_name, reward_created_date, reward_updated_date, reward_created_by, reward_updated_by from rewards where reward_id = ?', [rewardId])
        .then((result) => {
          let reward = {};
          if (result && result.length > 0) {
            reward.data = {
              id: result[0].reward_id,
              name: result[0].reward_name,
              createdDate: utility.parseUTCFormattedDateTimeMilis(result[0].reward_created_date),
              updatedDate: utility.parseUTCFormattedDateTimeMilis(result[0].reward_updated_date),
              createdBy: result[0].reward_created_by,
              updatedBy: result[0].reward_updated_by
            };
          }
          dbUtility.end();
          resolve(reward);
        })
        .catch(function (err) {
          dbUtility.end();
          logger.error(err, 'getReward: Error occurred while processing request');
          reject(err);
        });
    });
  }

  static getSpecificMemberReward(memberId, rewardId) {
    return new Promise((resolve, reject) => {
      const dbUtility  =  new DBUtility();
      dbUtility.executeQuery('select member_id, reward_id, member_rewards_created_date, member_rewards_updated_date, member_rewards_created_by, member_rewards_updated_by from rewards where member_id = ? and rewards_id = ?', [memberId, rewardId])
        .then((result) => {
          let memberReward = {};
          if (result && result.length > 0) {
            memberReward.data = {
              memberId: result[0].member_id,
              rewardId: result[0].reward_id,
              createdDate: utility.parseUTCFormattedDateTimeMilis(result[0].member_rewards_created_date),
              updatedDate: utility.parseUTCFormattedDateTimeMilis(result[0].member_rewards_updated_date),
              createdBy: result[0].member_rewards_created_by,
              updatedBy: result[0].member_rewards_updated_by
            };
          }
          dbUtility.end();
          resolve(memberReward);
        })
        .catch(function (err) {
          dbUtility.end();
          logger.error(err, 'getSpecificMemberReward: Error occurred while processing request');
          reject(err);
        });
    });
  }

  static addMemberReward(memberId, rewardId, createdDate, updatedDate, createdBy, updatedBy) {
    return new Promise((resolve, reject) => {
      const dbUtility  =  new DBUtility();
      dbUtility.executeQuery('insert into member_rewards(member_id, reward_id, member_rewards_created_date, member_rewards_updated_date, member_rewards_created_by, member_rewards_updated_by)values(?,?,?,?,?,?)', [memberId, rewardId, createdDate, updatedDate, createdBy, updatedBy])
        .then((result) => {
          dbUtility.end();
          resolve(result.insertId);
        })
        .catch(function (err) {
          dbUtility.end();
          logger.error(err, 'addMemberReward: Error occurred while processing request');
          reject(err);
        });
    });
  }
    
  static getMemberAllRewards(memberId) {
    return new Promise((resolve, reject) => {
      const dbUtility  =  new DBUtility();
      dbUtility.executeQuery('select r.reward_id, r.reward_name, r.reward_created_date, r.reward_updated_date, r.reward_created_by, r.reward_updated_by from rewards as r, member_rewards as mr where r.reward_id = mr.reward_id and mr.member_id = ?', [memberId])
        .then((result) => {
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
          dbUtility.end();
          resolve(rewards);
        })
        .catch(function (err) {
          dbUtility.end();
          logger.error(err, 'getMemberAllRewards: Error occurred while processing request');
          reject(err);
        });
    });
  }    

  static deleteMemberRewards(inputId) {
    return new Promise((resolve, reject) => {
      let deleteSQL = 'delete from member_rewards where ';
      let parameter = null;
      if (inputId.memberId) {
        parameter = inputId.memberId;
        deleteSQL = deleteSQL + 'member_id = ?';
      } else {
        deleteSQL = deleteSQL + 'reward_id = ?';
        parameter = inputId.rewardId;
      }
      const dbUtility  =  new DBUtility();
      dbUtility.executeQuery(deleteSQL, [parameter])
        .then((result) => {
          dbUtility.end();
          resolve(result.affectedRows);
        })
        .catch(function (err) {
          dbUtility.end();
          logger.error(err, 'deleteMemberRewards: Error occurred while processing request');
          reject(err);
        });
    });
  }

  static deleteMember(memberId) {
    return new Promise((resolve, reject) => {
      const dbUtility  =  new DBUtility();
      dbUtility.executeQuery('delete from members where member_id = ?', [memberId])
        .then((result) => {
          dbUtility.end();
          resolve(result.affectedRows);
        })
        .catch(function (err) {
          dbUtility.end();
          logger.error(err, 'deleteMember: Error occurred while processing request');
          reject(err);
        });
    });
  }

  static deleteRewards(rewardId) {
    return new Promise((resolve, reject) => {
      const dbUtility  =  new DBUtility();
      dbUtility.executeQuery('delete from rewards where reward_id = ?', [rewardId])
        .then((result) => {
          dbUtility.end();
          resolve(result.affectedRows);
        })
        .catch(function (err) {
          dbUtility.end();
          logger.error(err, 'deleteRewards: Error occurred while processing request');
          reject(err);
        });
    });
  }
}

module.exports = DBModelHelper;
