/**
 * Created by renminghe on 16-9-7.
 */
'use strict';
let multer = require('multer');
let uuid = require('node-uuid');
let url = require('url');
let JSZip = require('jszip');
let fs = require("fs");
let zip = new JSZip();
var co = require('co');
var models = require('./../index');
var User = models.User;

let GlobalFunction = require('../global/function');
let admin = require('./admin/admin');

module.exports = {

    //验证用户登陆
    checkAdminLogin:(userName, pwd)=>{
        return  co(function*() {
            return  yield  admin.login({userName:userName,pwd:GlobalFunction.HashMD5(pwd)});
        });

    },

    //下载商户信息
    downloadInfo:(res)=>{
        let options = {encoding:'utf8',flag:'r'};
        fs.readFile('/home/renminghe/Desktop/KouCloTown/client/public/images/bg_home_prdcouctIcon.png',options, function (err,data) {
            if(err){
                console.log("文件读取失败");
            }else{
                zip.file("archive/bg_home_prdcouctIcon.png",data);
                zip.folder("archive").generateAsync({type:"nodebuffer"})
                    .then(function (content) {
                        fs.writeFile("商家信息.zip", content, function(err){
                            if(!err){
                                res.download("商家信息.zip",function () {
                                    fs.unlink('商家信息.zip');
                                });
                            }
                        });

                    });

            }
        });



    }
};