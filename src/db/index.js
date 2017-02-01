'use strict';

let config = require('./config');
let couchbase = require('couchbase');

let endpoint = config.couchbase.endpoint;
let bucket = config.couchbase.bucket;
let myCluster = new couchbase.Cluster(endpoint, function(err) {
  if (err) {
    console.log("Can't connect to couchbase: %s", err);
  }
  console.log('connected to db %s', endpoint);
});

let myBucket = myCluster.openBucket(bucket, function(err) {
  if (err) {
    console.log("Can't connect to bucket: %s", err);
  }
  console.log('connected to bucket %s', bucket);
});

let ottoman = require('ottoman');
ottoman.store = new ottoman.CbStoreAdapter(myBucket, couchbase);

module.exports = {
  bucket: myBucket,
  ottoman: ottoman
};
