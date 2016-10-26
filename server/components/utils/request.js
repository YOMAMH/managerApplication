var msg = require('../../config/msg');
var util = require('util');
var request = require('request');

function req() {
}

/**
 * HTTP GET
 *
 * @param {String} uri
 * @param {Object} opts
 * @param {Function} [callback]
 */
req.get = function (uri, opts, callback) {
    var qs = opts.qs || {};
    request.get(uri, { qs: qs }, function (err, response, body) {
        if (err || response.statusCode != 200) {
            console.error('http get "%s" error: %s', uri, err);
            return callback && callback({ code: msg.CODE.SYSTEM_ERROR, message: msg.ERR_MSG.GET_DATA });
        }

        //
        var result = JSON.parse(body);
        if (!result || result.hasOwnProperty('code')) {
            return callback && callback({ code: msg.CODE.SYSTEM_ERROR, message: msg.ERR_MSG.GET_DATA });
        }

        //
        callback && callback(null, result);
    });
};

['post', 'put', 'del'].forEach(function (fn) {
    req[fn] = function (uri, opts, callback) {
        var form = opts.form || {};
        request[fn](uri, { form: form }, function (err, response, body) {
            if (err || response.statusCode != 200) {
                console.error('http %s "%s" error: %s', fn, uri, err);
                return callback && callback({ code: msg.CODE.SYSTEM_ERROR, message: msg.ERR_MSG.UPDATE_DATA });
            }

            //
            var result = JSON.parse(body);
            if (!result || result.hasOwnProperty('code')) {
                return callback && callback({ code: msg.CODE.SYSTEM_ERROR, message: msg.ERR_MSG.UPDATE_DATA });
            }

            //
            callback && callback(null, result);
        });
    };
});

module.exports = req;