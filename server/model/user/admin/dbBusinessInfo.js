/**
 * Created by renminghe on 16-9-22.
 */
'use strict';
// Schema 结构
let mongoose = require('../../global/mognodb');
let Schema = mongoose.Schema;
var BusInfo = new Schema({
    id : Number,
    name :String,
    time : String,
    type : String,
    msg:String
},{collection:"businessInfo"});

mongoose.model('BusInfo', BusInfo);
