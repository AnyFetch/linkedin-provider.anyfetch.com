'use strict';
/**
 * This object contains all the handlers to use for this provider
 */
var async = require('async');
var CancelError = require('anyfetch-provider').CancelError;
var request = require('supertest');
var crypto = require('crypto');

var config = require('../config/configuration.js');
var state = crypto.randomBytes(10).toString('hex');


var redirectToService = function(callbackUrl, cb) {
  // Redirect user to provider consentment page
  var redirectUrl = 'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=' + config.linkedin.api +
  '&state=' + state +
  '&redirect_uri=' + config.providerUrl + '/init/callback';
  cb(null, redirectUrl, {});
};

var retrieveTokens = function(reqParams, storedParams, cb) {
  // Store new data
  if(reqParams.error === 'access_denied') {
    return cb(new CancelError());
  }

  var token;
  var expireDate;
  var apiUrl = 'https://api.linkedin.com/';

  async.waterfall([
    function getToken(cb) {
      var app = 'https://www.linkedin.com/';
      var url = '/uas/oauth2/accessToken?grant_type=' + 'authorization_code' +
      '&code=' + reqParams.code +
      '&scope=' + 'r_fullprofile%20r_emailaddress%20r_network' +
      '&redirect_uri=' + config.providerUrl + '/init/callback' +
      '&client_id=' + config.linkedin.api +
      '&client_secret=' + config.linkedin.secret;
      request(app)
        .post(url)
        .expect(200)
        .end(cb);
    },
    function getEmailAddress(res, cb) {
      token = res.body.access_token;
      var t = new Date();
      expireDate = t.setSeconds(t.getSeconds() + res.body.expires_in);
      var url = '/v1/people/~/email-address?oauth2_access_token=' + token + '&format=json';
      request(apiUrl)
        .get(url)
        .expect(200)
        .end(cb);
    },
    function callFinalCb(data, cb) {
      cb(null, data.body, {accessToken: token, expire_date: expireDate});
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
