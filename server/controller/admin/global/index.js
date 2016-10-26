/**
 * Created by renminghe on 16-9-18.
 */
'use strict';
let config = require('../../../config/environment');
module.exports = {
    //验证session
     checkSession:(req,res,view)=> req.session.user && req.session.pwd?
         res.render(view):res.redirect('/'+config.version+'/user/admin/login'),
     checkApi:(req,res)=>{
          if(!req.session.user ||! req.session.pwd){
               res.redirect('/'+config.version+'/user/admin/login')
          }
     }
};