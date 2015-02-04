'use strict';

var async = require('async');
var request = require('supertest');

module.exports = function updateAccount(serviceData, cursor, queues, cb) {
  // The Linkedin token will expire after 60 days
  // There is currently no way of refreshing it programatically
  // see https://developer.linkedin.com/forum/re-authenticate-users-access-token-using-cron
  var newCursor = new Date();
  async.waterfall([
   function getConnections(cb) {
    var app = 'https://api.linkedin.com';
    var url = '/v1/people/~/connections?oauth2_access_token=' + serviceData.access_token + '&format=json';
    request(app)
    .get(url)
    .expect(200)
    .end(cb);
  },
  function parseConnections(res, cb) {
    if(res.body.values) {
      res.body.values.forEach(function(contact) {
        queues.addition.push(contact);
      });
    }
    cb(null, newCursor, serviceData);
  },
  ], cb);
};
