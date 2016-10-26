var Sequelize = require('sequelize');

module.exports = function(sequelize) {

  return sequelize.define('user', {
        admin_id: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        admin_email:Sequelize.STRING,
        admin_password:Sequelize.STRING,
        admin_name:Sequelize.STRING
      }, {
        tableName:'admin',
        timestamps: false,
        classMethods: {
          login: function(opts) {
            var User = this;
            return User
              .findOne({
                where: {admin_email:opts.userNmae, admin_password: opts.pwd}
              })
              .then(function(user) {
                if (!user) {
                  throw new Error('用户不存在');
                }
                return user;
              }).catch(function(err){
                throw err;
              });
          }
        }
      });
};


