'use strict';

let ottoman = require('../db').ottoman;
let User = require('./user');

let PostModel = ottoman.model('Post', {
  user: User,
  title: 'string',
  body: 'string',
  timestamp: {
    type: 'Date',
    default: Date.now
  }
});

module.exports = PostModel;
