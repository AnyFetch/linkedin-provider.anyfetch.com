'use strict';

require('should');
var async = require('async');

var update = require('../lib/update.js');
var config = require('../config/configuration.js');
var uploadContact = require('../lib/helpers/upload.js');


describe("Linkedin provider", function() {
  var connectionsPushed = [];

  var fakeQueue = {
    addition: {
      push: function(contact) {
        connectionsPushed.push(contact);
      }
    }
  };

  var count = 0;
  var fakeClient = {
    postDocument: function(contact, callback) {
      contact.should.have.property('identifier');
      contact.should.have.property('metadata');
      count += 1;
      if(count === connectionsPushed.length) {
        callback(null);
      }
    },
    accessToken: config.linkedin.fake,
  };

  it('should list all connections', function(done) {
    update({access_token: config.linkedin.fake}, null, fakeQueue, function() {
      connectionsPushed.length.should.be.greaterThan(0);
      done();
    });
  });

  it('should list only updated contacts', function(done) {
    update({access_token: config.linkedin.fake}, new Date().getTime(), fakeQueue, function() {
      connectionsPushed.length.should.equal(0);
      done();
    });
  });

  it('should upload contacts', function(done) {
    async.map(connectionsPushed, function(contact) {
      uploadContact(contact, fakeClient, config.linkedin.fake, done);
    });
  });
});

