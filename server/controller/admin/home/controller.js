/**
 * Created by renminghe on 16-9-18.
 */
'use strict';
let publicFun = require('../global');
module.exports = {

    homeCarouse: (req, res)=>publicFun.checkSession(req,res,'homeCarousel'),

    homeRoll: (req, res)=>publicFun.checkSession(req,res,'homeRoll'),

    homeLimit: (req, res)=>publicFun.checkSession(req,res,'homeLimit'),

    homeFloor: (req,res)=>publicFun.checkSession(req,res,'homeFloor'),

    homeCompetitive: (req,res)=>publicFun.checkSession(req,res,'homeCompetitive')
};
