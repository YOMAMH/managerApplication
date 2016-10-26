/**
 * Created by renminghe on 16-9-18.
 */
'use strict';
//首页
let express = require('express');
let Router = express.Router();
let views = require('./controller');
    Router.get('/home/index',views.homeCarouse);
    Router.get('/home/roll',views.homeRoll);
    Router.get('/home/limit',views.homeLimit);
    Router.get('/home/floor',views.homeFloor);
    Router.get('/home/competitive',views.homeCompetitive);
module.exports = Router;