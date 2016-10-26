'use strict';
let mongoose = require('mongoose');
// let nconf = require('../../config/nconf');
// let dialect = nconf.get('dialect');
// let host = nconf.get('host');
// let database = nconf.get('database');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://123.206.70.228/kouCloTownAdmin');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongoose opened!');
});
module.exports = mongoose;