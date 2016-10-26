var sequelize = require('../sequelize');
var User = require('./user')(sequelize);

exports.User = User;
