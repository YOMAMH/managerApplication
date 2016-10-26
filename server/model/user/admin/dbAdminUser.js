/**
 * Created by renminghe on 16-9-22.
 */
'use strict';
// Schema 结构
let mongoose = require('../../global/mognodb');
let Schema = mongoose.Schema;
var adminUser = new Schema({
    admin_id : Number,
    admin_name :String,
    admin_username : String,
    admin_email : String,
    admin_password : String,
    department : Number,
    admin_image : String,
    admin_role : Number,
    branch_id : Number,
    last_time : Number,
    last_ip : String,
    admin_status : Number,
    create_time : Number,
},{collection:"admin"});

mongoose.model('adminUser', adminUser);
