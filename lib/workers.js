'use strict';

var log = require('anyfetch-provider').log;

var uploadContact = require('./helpers/upload.js');

module.exports.addition = function additionQueueWorker(job, cb) {
  log.info({
    name: 'addition',
    identifier: job.task.identifier
  }, "Uploading");
  uploadContact(job.task, job.anyfetchClient, job.serviceData.accessToken, cb);
};

module.exports.deletion = function deletionQueueWorker(job, cb) {
  cb(null);
};
