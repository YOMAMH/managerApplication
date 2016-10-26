'use strict';

var express = require("express");
var Route = express.Router();
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var user = require("./uesr.controller");


Route.post("/upload/image",multipartyMiddleware,user.uploadImage);

// 运营管理后台入口
Route.get("/admin",user.adminCheckSession);

//检查用户信息
Route.post("/admin/checkUser",user.adminLogin);

//注销
Route.get("/admin/loginOut",user.adminLoginOut);

Route.get("/admin/BusinessInfo/download",user.busInfoDownload);
module.exports = Route;

  