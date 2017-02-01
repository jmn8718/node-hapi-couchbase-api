'use strict';

const users = require('./users');
const posts = require('./posts');

let routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: (request, reply) => {
        return reply({
          name: 'node-hapi-couchbase-api',
          version: 1
        });
      }
    }
  }
];

routes = routes.concat(users);
routes = routes.concat(posts);

module.exports = routes;
