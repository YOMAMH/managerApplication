/**
 * Created by renminghe on 16-9-18.
 */
'use strict';
//促销管理
let express = require('express');
let Router = express.Router();
let views = require('./controller');
Router.get('/business/mr',views.businessCheck);
Router.get('/business/info',views.businessInfo);
Router.post('/business/update',views.businessUpdate);
Router.get('/business/infoCount',views.businessInfoCount);
module.exports = Router;