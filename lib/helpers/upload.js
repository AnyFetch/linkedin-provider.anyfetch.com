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
module.exports = function upload(contact, anyfetchClient, accessToken, cb) {

  var identifier = contact.siteStandardProfileRequest.url.split('&')[0]; // extract the relation url
  var address = contact.location ? {
    address: contact.location.name,
    type: "work"
  } : null;
  contact = {
      identifier: identifier,
      document_type: 'contact',
      actions: {
        'show': identifier,
      },
      user_access: [anyfetchClient.accessToken],
      metadata: {
        name: (contact.firstName || '') + ' ' + (contact.lastName || ''),
        image: contact.pictureUrl,
        jobTitle: contact.headline,
      }
    };
  if(address) {
    contact.address = address;
  }
  anyfetchClient.postDocument(contact, rarity.slice(1, cb));
};
