'use strict';

var async = require('async');
var request = require('supertest');

module.exports = function updateAccount(serviceData, cursor, queues, cb) {

  var url = '/v1/people/~/connections?oauth2_access_token=' + serviceData.accessToken + '&format=json';

  if(cursor) {
    // https://developer.linkedin.com/forum/connections-api-modified-modified-broken
    url += '&modified=new&modified-since=' + cursor;
  }
  var newCursor = new Date().getTime();

  async.waterfall([
    function waitForLinkedin(cb) {
      if(!cursor) {
        return setTimeout(cb, 2000);
      }
      cb();
    },
    function getConnections(cb) {
      request('https://api.linkedin.com')
      .get(url)
      .expect(200)
      .end(cb);
    },
    function parseConnections(res, cb) {
      if(res.body.values) {
        res.body.values.forEach(function(contact) {
          if(contact.id !== 'private') {
            queues.addition.push(contact);
          }
        });
      }
      cb(null, newCursor, serviceData.accessToken);
    },
  ], cb);
};
