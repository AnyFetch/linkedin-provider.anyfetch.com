'use strict';

require('should');
var request = require('supertest');
var async = require('async');

var update = require('../lib/update.js');
var config = require('../config/configuration.js');


describe("Retrieve connexions", function() {
  var connexionsPushed = [];

  var fakeQueue = {
    addition: {
      push: function(contact) {
        connexionsPushed.push(contact);
      }
    }

  };

  it("Can list connections", function(done) {
    update({access_token: config.linkedin.fake}, new Date(), fakeQueue, function() {
      connexionsPushed.length.should.equal(177);
      done();
    });
  });
});

