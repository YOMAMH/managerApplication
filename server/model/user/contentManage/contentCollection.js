/**
 * Created by renminghe on 16-10-11.
 */
'use strict';
// Schema 结构
let mongoose = require('../../global/mognodb');
let Schema = mongoose.Schema;

let contentColThree = new Schema({
    name:String,
    sortId:Number,
    type:String,
});
let contentColTwo = new Schema({
    name:String,
    sortId:Number,
    type:String,
    typeThree:[contentColThree]
});
let contentColOne = new Schema({
    name:String,
    sortId:Number,
    type:String,
    typeTwo:[contentColTwo]
},{collection:'contentManageType'});

let sortId = new Schema({
    number:Number
},{collection:'sortNumber'});

mongoose.model('ContentType',contentColOne);
mongoose.model('SortId',sortId);