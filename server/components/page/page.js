var async = require('async');

module.exports = Page;

function Page(options, fn) {
    if (!(this instanceof Page)) return new Page(options, fn);
    if (!options.model) {
        console.error('invalid argument');
        return;
    }

    var me = this;
    me.model = options.model;
    me.conditions = options.conditions || {};
    me.sort = options.sort || { _id: 1 };
    me.pageNum = options.pageNum || 1;
    me.pageSize = options.pageSize || 10;

    async.waterfall([
        function (callback) {
            me.getTotalRecords(callback);
        },
        function (totalRecords, callback) {
            if (totalRecords && 0 < totalRecords) {
                me.getRecords(function (err, docs) {
                    callback(err, { totalRecords: totalRecords, data: docs });
                });
            } else {
                callback(null, { totalRecords: 0, data: [] });
            }
        }
    ], fn);
}

Page.prototype.getTotalRecords = function (callback) {
    this.model.count(this.conditions, function (err, count) {
        if (err) {
            console.error('查询总数出现异常: %j', err);
        }
        callback(err, count);
    });
};

Page.prototype.getRecords = function (callback) {
    this.model.find(this.conditions, null, { sort: this.sort, skip: (this.pageNum - 1) * this.pageSize, limit: this.pageSize }, function (err, docs) {
        if (err) {
            console.error('查询数据出现异常: %j', err);
        }
        callback(err, docs || []);
    });
};