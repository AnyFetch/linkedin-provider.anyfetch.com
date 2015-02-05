'use strict';

require('should');
var request = require('supertest');
var async = require('async');

var update = require('../lib/update.js');
var worker = require('../lib/workers.js');
var config = require('../config/configuration.js');


describe("Retrieve connexions", function() {
  it("should list connections", function(done) {
    //update.updateAccount({access_token: config.linkedin.fake}, new Date(), );
    done();
  });
});

it("should list contacts modified after specified date", function(done) {
  done();
});
