/**
 * Created by renminghe on 16-9-18.
 */
'use strict';
//促销管理
let express = require('express');
let Router = express.Router();
let views = require('./controller');
Router.get('/promotions/coupon',views.promotionsCoupon);
Router.get('/promotions/code',views.promotionsCode);
module.exports = Router;