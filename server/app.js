'use strict';
var express = require('express');
var path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development'; 
var config = require('./config/environment');

var app = express();
var server = require('http').createServer(app);
 
require('./express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
module.exports = app;