'use strict';

let ottoman = require('../db').ottoman;

let UserModel = ottoman.model('User', {
  password: 'string',
  name: 'string',
  email: 'string',
}, {
  index: {
    findByEmail: {
      by: 'email',
      type: 'refdoc'
    }
  }
});

ottoman.ensureIndices(function(err) {
  if (err) {
    return console.error('Error ensure indices USER', err);
  }
  console.log('Ensure indices USER');
});

module.exports = UserModel;
