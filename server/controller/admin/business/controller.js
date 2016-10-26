/**
 * Created by renminghe on 16-9-18.
 */
'use strict';
let publicFun = require('../global');
let admin = require('../../../model/user/admin/admin');
let co = require('co');
module.exports = {

    businessCheck: (req, res)=>publicFun.checkSession(req,res,'businessCheck'),

    //获取商家申请信息
    businessInfo: (req, res)=>co(function *() {
        try {
            publicFun.checkApi(req,res);
            let parmas = req.query;
            let info = yield admin.businessInfo(parmas);
            res.createSuccess(info);
        } catch (err){
            res.createFailure({message:err.message});
        }
    }),

    //商家信息更新
    businessUpdate:(req,res)=>co(function *() {
        try {
            publicFun.checkApi(req,res);
            let parmas = req.body;
            let result = yield admin.businessUpdate(parmas);
            res.createSuccess(result);
        }catch (err){
            res.createFailure({message:err.message});
        }
    }),

    //商家信息总页数
    businessInfoCount:(req,res)=>co(function *() {
        try {
            publicFun.checkApi(req,res);
            let parmas = req.query;
            let count = yield admin.businessInfoCount(parmas);
            res.json({count:count});
        }catch (err){
            res.createFailure({message:err.message});
        }
    })
};
