'use strict';
  var fs = require('fs');
  var path = require('path');
  let user = require('../../model/user/user');
  let config = require('../../config/environment');
  var co = require('co');
  module.exports = {
    uploadImage:function(req,res){
      var file = req.files.file;
      var tmpPath = file.path;
      var targetPath =  path.join(__dirname, '../../../client/public/images/'+ file.name);
      fs.rename(tmpPath, targetPath , function(err) {
        if(err) res.createFailure({message:"复制图片失败"});
        fs.unlink(tmpPath, function(){
          if(err) res.createFailure({message:"删除图片失败"});
          var imageUrl = "http://"+req.headers.host+"/images/"+file.name;
          return res.createSuccess({"url":imageUrl});
      });
    });
  },

    // 验证用户session
    adminCheckSession: (req,res) => {
        if(req.session.user&&req.session.pwd){
            res.render('mainPage',{user: req.session.userName});
          }else {
            res.redirect('/' + config.version + '/user/admin/login');
          }
    },

    // 验证用户账号
    adminLogin:(req,res)=>co(function*() {
          try {
            var body = req.body;
            var userInfo =  yield user.checkAdminLogin(body.userName,body.pwd);
           if(typeof userInfo[0] == 'object'){
             req.session.userName = userInfo[0].admin_name;
             req.session.user = userInfo[0].admin_email;
             req.session.pwd = userInfo[0].admin_password;
             res.createSuccess(userInfo);
           }else {
             res.json(401,{message:'user not found'});
           }

          } catch (err) {
            res.createFailure({message:err.message});
          }

        }),


    //注销
    adminLoginOut:(req,res)=>{
      req.session.userName = null;
      req.session.user = null;
      req.session.pwd = null;
      res.redirect('/'+config.version+'/user/admin/login');
    },

    //下载商户信息
    busInfoDownload:(req,res)=>co(function*() {
      try {
        user.downloadInfo(res);
      } catch (err) {
        res.createFailure({message:err.message});
      }

    })


};
