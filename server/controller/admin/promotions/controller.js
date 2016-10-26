/**
 * Created by renminghe on 16-9-18.
 */
'use strict';
let publicFun = require('../global');
module.exports = {

    promotionsCoupon: (req, res)=>publicFun.checkSession(req,res,'promotionsCoupon'),

    promotionsCode: (req,res)=>publicFun.checkSession(req,res,'promotionsCode')
};
