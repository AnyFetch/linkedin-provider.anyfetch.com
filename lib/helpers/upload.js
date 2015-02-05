'use strict';

var rarity = require('rarity');
var request = require('supertest');
var async = require('async');

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

  var today = new Date();
  delete contact.apiStandardProfileRequest;
  delete contact.siteStandardProfileRequest;
  console.log('___TOKEN UPLOAD___\n', accessToken);
  async.waterfall([
    function checkContactLink() {
      if(!contact.siteStandardProfileRequest) {
        request('https://api.linkedin.com')
        .get('/v1/people/id=' + contact.id + '?oauth2_access_token=' + accessToken)
        .expect(200)
        .end(cb);
      }
      else {
        cb();
      }
    },
    function sendContact(res) {
      if(res) {
        console.log('___________RESULT___________\n' + res);
      }
      contact = {
      identifier: contact.siteStandardProfileRequest ? contact.siteStandardProfileRequest.url.split('&')[0] : '', // extract the relation url
      creation_date: today,
      modification_date: today,
      document_type: 'contact',
      actions: {
        'show': contact.siteStandardProfileRequest ? contact.siteStandardProfileRequest.url.split('&')[0] : '',
      },
      user_access: [anyfetchClient.accessToken],
      metadata: {
        name: (contact.firstName || ' ') + ' ' + (contact.lastName || ' '),
        image: contact.pictureUrl || '',
        job: contact.headline || '',
        phone: '',
        address: contact.location ? contact.location.name : '',
        website: '',
        data: {},
        }
      };
      cb(null);
    },
    ], cb);

  // delete contact.metadata.siteStandardProfileRequest;
  // cb(null);
  // anyfetchClient.postDocument(contact, rarity.slice(1, cb));
};
