var Sequelize = require('sequelize');

var nconf = require('./config/nconf');
var database = nconf.get('database');
var username = nconf.get('username');
var password = nconf.get('password');
var options = {
  host: nconf.get('host'),
  dialect: nconf.get('dialect'),
  storage: __dirname + '/' + nconf.get('storage')
};

var sequelize = new Sequelize(database, username, password, options);

module.exports = sequelize;
