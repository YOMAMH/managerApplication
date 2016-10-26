/**
 * Created by renminghe on 16-9-21.
 */
'use strict';
let mongoose = require('mongoose');
require('./dbAdminUser');
require('./dbBusinessInfo');
let adminUser = mongoose.model('adminUser');
let businessInfo = mongoose.model('BusInfo');
//mongodb的数据处理
module.exports = {
    //登陆
    login: function(opts) {
        var User = adminUser;
        return User
            .find({admin_email:opts.userName, admin_password: opts.pwd})
            .then(function(user) {
                if (!user) {
                    throw new Error('用户不存在');
                }
                return user;
            }).catch(function(err){
                throw err;
            });
    },

    //商家审核信息
    businessInfo:(parmas)=>{
        let typeInfo;
        let info = businessInfo;
        let queryStr = parseInt(parmas.query)*5;
        if(parmas.parm == 'allType'){
            typeInfo = {};
        }else if(parmas.type == 'name'){
            //正则匹配
            let qs = new RegExp(parmas.parm);
            typeInfo={name:qs};
        } else {
            typeInfo={type:parmas.parm};
        }

       return info.where(typeInfo).limit(5).skip(queryStr).then(function (businfo) {
           if(!businfo){
               throw new Error('信息不存在！');
           }
           return businfo;
       }).catch(function (err) {
           throw err;
       })
    },

    //商家信息更新
    businessUpdate:(parmas)=>{
        let info = businessInfo;
        if( parmas.info == 0){
            info.update({name:parmas.name},{$set:{type:"未通过",msg:"未通过原因："+parmas.msg}}).then(function (businfo) {
                return businfo;
            }).catch(function (err) {
                throw err;
            })
        }else {
            info.update({name:parmas.name},{$set:{type:"已通过"}}).then(function (businfo) {
                return businfo;
            }).catch(function (err) {
                throw err;
            })
        }
    },

    //数据总数
    businessInfoCount:(params)=>{
        let count = businessInfo;
        let queryString = {};
        if(params.type == 'type') queryString = {type:params.content};
        if(params.type == 'name') {
            //正则匹配
            let qs = new RegExp(params.content);
            queryString ={name:qs};
        }
        return count.count(queryString).then(function (data) {
            if(!data) throw new Error("数据请求失败！");
            return data;
        }).catch(function (err) {
            throw err;
        })
    }
};