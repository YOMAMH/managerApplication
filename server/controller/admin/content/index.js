/**
 * Created by renminghe on 16-9-18.
 */
'use strict';
//内容管理
let express = require('express');
let Router = express.Router();
let views = require('./controller');

    //跳转内容搜索页面
    Router.get('/content/search',views.contentSearch);

    //跳转类目管理页面
    Router.get('/content/type',views.contentType);

    //获取总类目
    Router.get('/content/totalClass',views.totalClass);

    //获取类目条数
    Router.get('/content/totalClassCount',views.totalClassCount);

    //增加sortId
    Router.post('/content/addSortId',views.addSortId);

    //删除sortId
    Router.post('/content/deleateSortId',views.deleateSortId);

    //检查sortId是否重复
    Router.get('/content/checkSortId',views.checkSortId);

    //检查是否已存在一级类目
    Router.get('/content/checkOneClass',views.checkOneClass);

    //增加分类信息
    Router.post('/content/upDataClass',views.upDataClass);

    //创建一级类目
    Router.post('/content/createOneClass',views.createOneClass);

    //增加三级类目
    Router.post('/content/updateThreeClass',views.updateThreeClass);

    //更新一级类目
    Router.post('/content/updateCategory',views.updateCategory);

    //删除类目
    Router.post('/content/deleteCategory',views.deleteCategory);
module.exports = Router;