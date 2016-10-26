/**
 * Created by renminghe on 16-9-18.
 */
'use strict';
let publicFun = require('../global');
let co = require('co');
let content = require('../../../model/user/contentManage');

module.exports = {

    //内容搜索
    contentSearch: (req, res)=>publicFun.checkSession(req,res,'contentSearch'),

    //内容管理
    contentType: (req, res)=>publicFun.checkSession(req,res,'contentType'),

    //获取总类目
    totalClass:(req,res)=>co(function *() {
        try {
            let param = req.query;
            let classInfo = yield content.totalClass(param);
            res.createSuccess(classInfo);
        } catch (err){
            res.createFailure({message:err.message});
        }
    }),

    //获取类目条数
    totalClassCount:(req,res)=>co(function *() {
        try {
            let count = yield content.totalClassCount();
            res.createSuccess(count);
        } catch (err){
            res.createFailure({message:err.message});
        }
    }),

    //增加sortId
    addSortId:(req,res)=>co(function *() {
        try {
            publicFun.checkApi(req,res);
            let params = req.body;
            let info = yield content.addSortId(params);
            res.createSuccess(info);
        } catch (err){
            res.createFailure({message:err.message});
        }
    }),

    //检查sortId是否重复
    checkSortId:(req,res)=>co(function *() {
        try {
            publicFun.checkApi(req,res);
            let params = req.query;
            let info = yield content.checkSortId(params);
            res.createSuccess(info);
        } catch (err){
            res.createFailure({message:err.message});
        }
    }),

    //增加分类信息
    upDataClass:(req,res)=>co(function *() {
        try {
            publicFun.checkApi(req,res);
            let params = req.body;
            let info = yield content.upDataClass(params);
            res.createSuccess(info);
        } catch (err){
            res.createFailure({message:err.message});
        }
    }),

    //检查是否已存在一级类目
    checkOneClass:(req,res)=>co(function *() {
        try {
            publicFun.checkApi(req,res);
            let params = req.query;
            let info = yield content.checkOneClass(params);
            res.createSuccess(info);
        } catch (err){
            res.createFailure({message:err.message});
        }
    }),

    //创建一级类目
    createOneClass:(req,res)=>co(function *() {
        try {
            publicFun.checkApi(req,res);
            let params = req.body;
            let info = yield content.createOneClass(params);
            res.createSuccess(info);
        } catch (err){
            res.createFailure({message:err.message});
        }
    }),

    //增加三级类目
    updateThreeClass:(req,res)=>co(function *() {
        try {
            publicFun.checkApi(req,res);
            let params = req.body;
            let info = yield content.updateThreeClass(params);
            res.createSuccess(info);
        } catch (err){
            res.createFailure({message:err.message});
        }
    }),

    //更新一级类目
    updateCategory:(req,res)=>co(function *() {
        try {
            publicFun.checkApi(req, res);
            let params = req.body;
            let info = yield content.updateCategory(params);
            res.createSuccess(info);
        } catch (err) {
            res.createFailure({message: err.message});
        }
    }),

    //删除类目信息
    deleteCategory:(req,res)=>co(function *() {
        try {
            publicFun.checkApi(req, res);
            let params = req.body;
            let info = yield content.deleteCategory(params);
            res.createSuccess(info);
        } catch (err) {
            res.createFailure({message: err.message});
        }
    }),

    //删除sortid
    deleateSortId:(req,res)=>co(function *() {
        try {
            publicFun.checkApi(req, res);
            let params = req.body;
            let info = yield content.deleateSortId(params);
            res.createSuccess(info);
        } catch (err) {
            res.createFailure({message: err.message});
        }
    })
};