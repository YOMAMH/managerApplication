var nconf = require('nconf');
var debuglog = require('util').debuglog('app');

nconf.argv().env().defaults({
  NODE_ENV: 'development'
});

var filename = __dirname + '/config.' + nconf.get('NODE_ENV') + '.json';
debuglog('using config file: %s', filename);
nconf.file({file: filename});

module.exports = nconf;
