'use strict';
/**
 * This object contains all the handlers to use for this provider
 */

var config = require('../config/configuration.js');

var redirectToService = function(callbackUrl, cb) {
  // Redirect user to provider consentment page
  cb(null, config.providerUrl + '/init/callback', {some: 'data'});
};

var retrieveTokens = function(reqParams, storedParams, cb) {
  // Store new data
  cb(null, 'accountName', {some: "data"});
};

module.exports = {
  connectFunctions: {
    redirectToService: redirectToService,
    retrieveTokens: retrieveTokens
  },

  config: config
};
