'use strict';
/**
 * This object contains all the handlers to use for this provider
 */

var config = require('../config/configuration.js');

var initAccount = function(req, next) {
  // Redirect user to provider consentment page
  next(null, {code: req.params.code}, 'http://PROVIDER.com');
};

var connectAccountRetrievePreDataIdentifier = function(req, next) {
  // Retrieve identifier for current request
  next(null, {'data.code': req.params.state});
};

var connectAccountRetrieveAuthData = function(req, preData, next) {
  // Store new data
  next(null, {some: "data"});
};

var updateAccount = function(data, cursor, next) {
  // Update documents from provider
  // You may define this as an helper function
  // this function is pinged on update, with the data stored by connectAccountRetrieveAuthData()
  next(null, [], new Date());
};

var queueWorker = function(task, AnyFetchClient, cb) {
  // Send data to AnyFetch.
  // You may define this as an helper function
  // Task is an item from the array returned by updateAccount
  cb();
};

module.exports = {
  initAccount: initAccount,
  connectAccountRetrievePreDataIdentifier: connectAccountRetrievePreDataIdentifier,
  connectAccountRetrieveAuthData: connectAccountRetrieveAuthData,
  updateAccount: updateAccount,
  queueWorker: queueWorker,

  anyfetchAppId: config.anyfetch_id,
  anyfetchAppSecret: config.anyfetch_secret,
  connectUrl: config.connect_url
};
