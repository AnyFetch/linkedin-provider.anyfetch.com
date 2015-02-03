'use strict';
/**
 * This object contains all the handlers to use for this provider
 */
var async = require('async');
var CancelError = require('anyfetch-provider').CancelError;
var request = require('supertest');
var config = require('../config/configuration.js');


var redirectToService = function(callbackUrl, cb) {
  // Redirect user to provider consentment page
  var redirectUrl = 'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=' + config.linkedin.api + '&state=DCJJFWF45453sdffef424&redirect_uri=' + config.providerUrl + '/init/callback';
  cb(null, redirectUrl, {redirectUrl: redirectUrl, callbackUrl: callbackUrl});
};

var retrieveTokens = function(reqParams, storedParams, cb) {
  // Store new data
  if(reqParams.err) {
    return cb(new CancelError());
  }
  var token;
  async.waterfall([
    function getToken(cb) {
      var app = 'https://www.linkedin.com/';
      var url = '/uas/oauth2/accessToken?grant_type=' + 'authorization_code' + '&code=' + reqParams.code + '&redirect_uri=' + config.providerUrl + '/init/callback' + '&client_id=' + config.linkedin.api + '&client_secret=' + config.linkedin.secret;
      request(app)
        .post(url)
        .expect(200)
        .end(cb);
    },
    function getUserInfo(res, cb) {
      var app = 'https://api.linkedin.com/';
      var url = '/v1/people/~?oauth2_access_token=' + res.body.access_token + '&format=json';
      request(app)
        .get(url)
        .expect(200)
        .end(cb);
    },
    function callFinalCb(data, cb) {
      cb(null, data.body.firstName + ' ' + data.body.lastName, {token: token, callbackUrl: storedParams.callbackUrl});
    }
  ], cb);
};

module.exports = {
  connectFunctions: {
    redirectToService: redirectToService,
    retrieveTokens: retrieveTokens
  },

  config: config
};
