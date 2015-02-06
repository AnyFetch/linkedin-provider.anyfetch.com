'use strict';

var async = require('async');
var request = require('supertest');

module.exports = function updateAccount(serviceData, cursor, queues, cb) {

  var url = '/v1/people/~/connections?oauth2_access_token=' + serviceData.access_token + '&format=json';

  if(cursor !== null) {
    // https://developer.linkedin.com/forum/connections-api-modified-modified-broken
    url += '&modified=new&modified-since=' + cursor;
  }
  cursor = new Date().getTime();

  async.waterfall([
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
    cb(null, cursor, serviceData.accessToken);
  },
  ], cb);
};
