'use strict';

require('should');
var async = require('async');

var update = require('../lib/update.js');
var config = require('../config/configuration.js');
var uploadContact = require('../lib/helpers/upload.js');


describe("Linkedin provider", function() {
  var connexionsPushed = [];

  var fakeQueue = {
    addition: {
      push: function(contact) {
        connexionsPushed.push(contact);
      }
    }
  };

  var count = 0;
  var fakeClient = {
    postDocument: function(contact, callback) {
      contact.should.have.property('identifier');
      contact.should.have.property('metadata');
      count += 1;
      if(count === connexionsPushed.length) {
        callback(null);
      }
    },
    accessToken: config.linkedin.fake,
  };

  it('can list all connections', function(done) {
    update({access_token: config.linkedin.fake}, null, fakeQueue, function() {
      connexionsPushed.length.should.equal(1);
      done();
    });
  });

  it('can list only updated contacts', function(done) {
    update({access_token: config.linkedin.fake}, new Date(), fakeQueue, function() {
      connexionsPushed.length.should.equal(1);
      done();
    });
  });

  it('can upload contacts', function(done) {
    async.map(connexionsPushed, function(contact) {
      uploadContact(contact, fakeClient, config.linkedin.fake, function(err) {
        if(err) {
          throw err;
        }
        else {
          done();
        }
      });
    });
  });
});

