'use strict';

const Hapi = require('hapi');
const routes = require('./api');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 5000,
  routes: {
    cors: true,
  }
});

// Add the routes
server.route(routes);

// Start the server
server.start( err => {
  if( err ) {
    // Fancy error handling here
    console.error( err );
    throw err;
  }
  console.log( `Server started at ${ server.info.uri }` );
} );

module.exports = server;
