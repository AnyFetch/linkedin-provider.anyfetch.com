'use strict';

var rarity = require('rarity');

/**
 * Upload `contact` (containing contact data) onto AnyFetch.
 *
 *
 * @param {Object} contact Contact to upload, plus anyfetchClient
 * @param {Object} anyfetchClient Client for upload
 * @param {Object} accessToken Access token of the current account
 * @param {Object} contact Contact to upload, plus anyfetchClient
 * @param {Function} cb Callback to call once contacts has been uploaded.
 */
module.exports = function(contact, anyfetchClient, accessToken, cb) {

  var today = new Date();
  delete contact.apiStandardProfileRequest;
  delete contact.id;
  var data = {};

  contact = {
    identifier: contact.siteStandardProfileRequest.url.split('&')[0], // extract the relation url
    creation_date: today,
    modification_date: today,
    metadata: {
      name: (contact.firstName || ' ') + ' ' + (contact.lastName || ' '),
      image: contact.pictureUrl || '',
      job: contact.headline || '',
      phone: '',
      address: contact.location.name ? contact.location.name : '',
      website: '',
      data: data,
      document_type: 'contact',
      actions: {
        'show': contact.siteStandardProfileRequest.url.split('&')[0],
      },
      user_access: [anyfetchClient.accessToken]
    }
  };

  delete contact.metadata.siteStandardProfileRequest;
  anyfetchClient.postDocument(contact, rarity.slice(1, cb));
};
