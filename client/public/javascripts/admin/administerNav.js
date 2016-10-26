/**
 * Created by renminghe on 16/8/13.
 */

/**
 * angular绑定数据
 */
var CarouselFigure = [1, 2, 3, 4, 5];

//绑定视图
var app = angular.module('koucloApp', ['ngRoute']);

    app.config(['$routeProvider', function ($routeProvider, $locationProvider) {

        $routeProvider

        /*首页*/
        //轮播图
        .when('/', {
            templateUrl: '/admin/home/index',
            controller:'homeCarousel'
        })

        //滚动消息
        .when('/roll',{
            templateUrl: '/admin/home/roll',
            controller:'homeRoll'
        })

        //限时抢购
        .when('/limit',{
            templateUrl: '/admin/home/limit',
            controller:'homeLimit'
        })

        //展示楼层
        .when('/floor',{
            templateUrl: '/admin/home/floor',
            controller:'homeFloor'
        })

        // 精品推荐
        .when('/competitive',{
            templateUrl: '/admin/home/competitive',
            controller:'homeCompetitive'
        })

        /*内容管理*/
        //分类查找
        .when('/search',{
            templateUrl: '/admin/content/search',
            controller: 'contentSearch'
        })

        //类目管理
        .when('/type',{
            templateUrl: '/admin/content/type',
            controller: 'contentType'
        })

        /*优惠管理*/
        //优惠券
        .when('/coupon',{
            templateUrl: '/admin/promotions/coupon',
            controller: 'promotionsCoupon'
        })

        //优惠码
        .when('/code',{
            templateUrl: '/admin/promotions/code',
            controller: 'promotionsCode'
        })

        /*商家审核*/
        .when('/MR',{
            templateUrl: '/admin/business/mr',
            controller: 'businessCheck'
        });

    }]);

    //页面头部业务逻辑
    app.controller('top',['$scope',function ($scope) {
    // 注销
    $scope.loginOut = function () {
        if (confirm("确定要退出吗？")==1) location.href="/v0.0.1/user/admin/loginOut";
    };
}]);

    //页面左边业务逻辑
    app.controller('koucloControllerLeft', ['$scope', function ($scope) {

        //程序启动默认第一项和第二项展开，其他关闭
        $('.bs-example-tabs >.nav-tabs').find('li').hide();
        $('.bs-example-tabs >.nav-tabs').eq(0).find('li').show().parent().find('span').toggleClass('glyphicon-chevron-down');
        $('.bs-example-tabs >.nav-tabs').eq(1).find('li').show().parent().find('span').toggleClass('glyphicon-chevron-down');

        //左侧导航点击效果
        $('.bs-example-tabs >.nav-tabs>.navBtn').click(function () {
            $(this).parent().siblings().find('li').slideUp();
            $(this).parent().find('li').slideToggle();
            $(this).parent().find('span').toggleClass('glyphicon-chevron-down');
            $(this).parent().siblings().find('span').removeClass('glyphicon-chevron-down');
        });
        //分页代码
        $('.M-box3').pagination({
            pageCount: 50,
            jump: true,
            coping: true,
            homePage: '首页',
            endPage: '末页',
            prevContent: '上页',
            nextContent: '下页'
        });

        //设置a标签的点击代理
        $('.M-box3').delegate('a', 'click', function () {
            switch ($(this).html()) {
                case "下页":
                    console.log("下页");
                    break;
                case "上页":
                    console.log("上页");
                    break;
                case "首页":
                    console.log("首页");
                    break;
                case "末页":
                    console.log("末页");
                    break;
                case "跳转":
                    console.log("跳转");
                    break;
                default:
                    console.log($(this).html());
                    break;
            }
        });

        // 重写bootstrap的nav-tabs组件点击效果
        $('.nav.nav-tabs>li').on('click',function () {
            if($(this).hasClass('active')) $(this).removeClass('active');
        });
    }]);
