'use strict';

module.exports = function updateAccount(serviceData, cursor, queues, cb) {
  // Update documents from provider
  // You may define this as an helper function
  // this function is pinged on update, with the data stored by retrieveTokens()
  // You can do queues.worker_name.push(task)
  cb(null, new Date());
};
