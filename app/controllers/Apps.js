'use strict';

const AppsService = require('./AppsService');

module.exports.createMember = function createMember(req, res, next) {
  AppsService.createMember(req, res, next);
};

module.exports.retrieveMember = function retrieveMember(req, res, next) {
  AppsService.retrieveMember(req, res, next);
};

module.exports.createReward = function createReward(req, res, next) {
  AppsService.createReward(req, res, next);
};

module.exports.retrieveReward = function retrieveReward(req, res, next) {
  AppsService.retrieveReward(req, res, next);
};

module.exports.associateReward = function associateReward(req, res, next) {
  AppsService.associateReward(req, res, next);
};

module.exports.retrieveMemberRewards = function retrieveMemberRewards(req, res, next) {
  AppsService.retrieveMemberRewards(req, res, next);
};

module.exports.deleteMember = function deleteMember(req, res, next) {
  AppsService.deleteMember(req, res, next);
};

module.exports.deleteReward = function deleteReward(req, res, next) {
  AppsService.deleteReward(req, res, next);
};
