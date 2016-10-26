var request = require('request');
var util = require('util');
var crypto = require('crypto');
var NodeMailer = require('nodemailer');
var fs = require('fs');
var path = require('path');
var log4js = require('log4js');
var log4js_config = require('./log4js.json');
log4js.configure(log4js_config);

require('./value');


// 自定义日期格式
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
            (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

// 获取客户端IP
exports.ClientIP = function(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress ||
            req.socket.remoteAddress || req.connection.socket.remoteAddress;
};

// sign检查
exports.SignCheck = function (DataStr, SignStr) {

    // log 日志
    exports.LogOut(LogsLog, __filename + ' function : SignCheck : DataStr : ' + DataStr + ' : SignStr : ' + SignStr, AlertInfo);

    var CheckFlg;
    // DataStr.key = SecretKey;
    var Sign = exports.HashMD5(DataStr + SecretKey);

    if (Sign == SignStr) {
        CheckFlg = true
    } else {
        // log 日志
        exports.LogOut(LogsLog, __filename + ' function : SignCheck : RealSign : ' + Sign + ' : DataStr : ' + DataStr + ' : SignStr : ' + SignStr, AlertError);

        CheckFlg = false
    }

    return CheckFlg;

};

// params检查
exports.ParamCheck = function (ApiMethod, ParamCheckSource, ParamCheckTarget) {

    var CheckFlg;
    var JsonKey;
    var Check;

    switch (ApiMethod) {
        case 'get':
            for (JsonKey in ParamCheckSource){
                Check = false;
                (ParamCheckTarget).forEach(function (Target){
                    if (JsonKey == Target){
                        Check = true;
                        return true;
                    }
                });
                if (Check == false){
                    break;
                }
            }
            CheckFlg = Check;
            break;
        case 'post':
            for (JsonKey in ParamCheckSource){
                Check = false;
                (ParamCheckTarget).forEach(function (Target){
                    if (JsonKey == Target){
                        Check = true;
                        return true;
                    }
                });
                if (Check == false){
                    break;
                }
            }
            CheckFlg = Check;
            break;
        case 'delete':
            break;
    }

    return CheckFlg;

};

// 创建文件夹
exports.MkDir = function (DirPath, CallBack){

    // log 日志
    exports.LogOut(LogsLog, __filename + ' function : MkDir : ' + DirPath, AlertInfo);

    var MkDirs = function(DirPath, CallBack){
        var Dirs = DirPath.slice(1).split('/');
        var DirCount = 0;

        var MK = function(err){
            DirCount += 1;
            if(DirCount > Dirs.length){
                CallBack(false);
                // log 日志
                exports.LogOut(LogsLog, __filename + ' function : MkDir : ' + DirPath + ' : Error : ' + err, AlertError);
                return;
            }
            fs.mkdir('/' + Dirs.slice(0, DirCount).join('/'), function(err){
                MK(err);
                // log 日志
                exports.LogOut(LogsLog, __filename + ' function : MkDir : ' + DirPath + ' : Error : ' + err, AlertError);
                })
        };

        MK();
    };

    MkDirs(DirPath,function(err){
        if (err){
            CallBack(false);
            // log 日志
            exports.LogOut(LogsLog, __filename + ' function : MkDir : ' + DirPath + ' : Error : ' + err, AlertError);
        } else {
            CallBack(true);
            // log 日志
            exports.LogOut(LogsLog, __filename + ' function : MkDir : Success : ' + DirPath, AlertInfo);
        }
    })

};

// 字符串包含
exports.string_include = function (Str, SubStr) {
    // log 日志
    exports.LogOut(LogsLog, __filename + ' function : string_include : ' + Str + ' : ' + SubStr + ' : ' + new RegExp(SubStr).test(Str), AlertInfo);

    return new RegExp(SubStr).test(Str);
};

// 获取客户端IP
exports.ClientIp = function (req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

// MD5加密
exports.HashMD5 = function (Str) {
    // log 日志
    exports.LogOut(LogsLog, __filename + ' function : HashMD5 : ' + Str, AlertInfo);

    return crypto.createHash('md5').update(Str).digest('hex');
};

// base64加密
exports.Base64Encode = function (Str) {
    // log 日志
    exports.LogOut(LogsLog, __filename + ' function : Base64Encode : ' + Str, AlertInfo);

    return new Buffer(Str).toString('base64');
};

// base64解密
exports.Base64Decode = function (Str) {
    // log 日志
    exports.LogOut(LogsLog, __filename + ' function : Base64Decode : ' + Str, AlertInfo);

    return new Buffer(Str, 'base64').toString();
};

// 日志输出
exports.LogOut = function(LogType, LogData, AlertType){
    var LogFile = log4js.getLogger(LogType);

    switch(AlertType){
        case AlertTrace:
            LogFile.trace(LogData);
            break;
        case AlertDebug:
            LogFile.debug(LogData);
            break;
        case AlertInfo:
            LogFile.info(LogData);
            break;
        case AlertWarning:
            LogFile.warn(LogData);
            break;
        case AlertError:
            LogFile.error(LogData);
            break;
    }
};

// 邮件发送
exports.SendMail = function(MailType, To, Subject, Message){

    var transporter;
    var mailOptions;

    transporter = NodeMailer.createTransport('smtps://' + MailSend[MailType]['from']['auth']['user'] +
        ':' + MailSend[MailType]['from']['auth']['pass'] + '@smtp.exmail.qq.com');

    if (To){
        mailOptions = {
            from: MailSend[MailType]['from']['auth']['user'],
            to: To,
            subject: Subject,
            text: Message
        };
    } else {
        mailOptions = {
            from: MailSend[MailType]['from']['auth']['user'],
            to: MailSend[MailType]['to'],
            subject: Subject,
            text: Message
        };
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            exports.LogOut(LogsLog, 'mail_send : error : ' + error, AlertError);
            console.log(error);
        } else {
            exports.LogOut(LogsLog, 'mail_send : ' + info.response, AlertInfo);
            console.log('Message sent: ' + info.response);
        }
    });

};

// post处理
exports.post_method = function(UrlStr, HeadersStr, JsonMethod, BodyData, StateFlg, StatusCheck, ReturnFlg, ReturnData){

    var Options;

    // 判断json形式
    if (JsonMethod) {
        Options = {url: UrlStr, headers: HeadersStr, json: true, body: BodyData};
    } else {
        Options = {url: UrlStr, headers: HeadersStr, body: BodyData};
    }

    // 日志
    exports.LogOut(PostLog, 'post_method' + ' : ' + util.inspect(Options, true), AlertInfo);

    // post处理
    request.post(Options, function(error, response){
        if (StateFlg == 'none'){
            if (!error) {
                exports.log_out(post_log, 'post response' + ' : ' + response.body, AlertInfo);
                if (ReturnFlg == '0'){
                    return response.body;
                } else {
                    ReturnData(response.body);
                }
            } else {
                exports.LogOut(PostLog, 'post response' + ' : ' + response.body, AlertError);
                exports.mail_send('maintenance', '',
                    'url: ' + UrlStr + ' 抛送失败',
                    'url: ' + UrlStr + ', body: ' + BodyData + ', 抛送失败');
                if (ReturnFlg == '0'){
                    return JSON.stringify({"status":'1', "message": response.body});
                } else {
                    ReturnData(JSON.stringify({"status":'0', "message": response.body}));
                }
            }
        } else {
            if (!error && JSON.parse(response.body)['state'] == StatusCheck) {
                exports.LogOut(post_log, 'post response' + ' : ' + response.body, AlertInfo);
                if (ReturnFlg == '0'){
                    return response.body;
                } else {
                    ReturnData(response.body);
                }
            } else {
                exports.LogOut(PostLog, 'post response' + ' : ' + response.body, AlertError);
                exports.MailSend('maintenance', '',
                    'url: ' + UrlStr + ' 抛送失败',
                    'url: ' + UrlStr + ', body: ' + BodyData + ', 抛送失败');
                if (ReturnFlg == '0'){
                    return JSON.stringify({"status":'1', "message": response.body});
                } else {
                    ReturnData(JSON.stringify({"status":'0', "message": response.body}));
                }
            }
        }

    });

};