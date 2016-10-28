var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var _ = require('lodash');
var  util = require('util');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var RedisStore = require('connect-redis')(expressSession);
var config = require('./config/environment');
var app = express();

require('./model/global/value');
module.exports = function(app) {
app.use(expressSession({
  store: new RedisStore({
    host:"123.206.54.128",
    port:"6379",
    password:"eight8V9$",
    ttl:86400  //设置有效时长1天
  }),
  secret:'Kouclo_town'
}));

// view engine setup
app.set('views',__dirname + '/views');
app.set('view engine','hbs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.static(path.join(__dirname, '../client/bower_components')));
app.use('/user/admin/login',express.static(path.join(__dirname, '../client/static')));

app.use(function (req, res, next) {
    function send(data) {
        res.type('application/json; charset=utf-8').jsonp(data);
    }
    function getData(args) {
        var data = {};
        if (args) {
            args = JSON.parse(util.format('%j', args));
            for (var i in args) {
                if (args.hasOwnProperty(i)) {
                    _.assign(data, args[i]);
                }
            }
        }
        return data;
    }
    _.assign(res, {
        createSuccess: function () {
            send(_.assign({statusCode: 200}, {result: getData(_.values(arguments))}));
        },
        createFailure: function () {
            send(_.assign({statusCode: 500}, getData(_.values(arguments))));
        },
        createResult: function (err, result) {
            err ? res.createFailure(err) : res.createSuccess(result || {});
        }
    });
    next();
});
};