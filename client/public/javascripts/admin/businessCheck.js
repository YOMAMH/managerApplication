/**
 * Created by renminghe on 16-9-19.
 */
app.controller('businessCheck',['$scope','$http',function ($scope,$http) {
    //商户详细页面的显示和隐藏，当为true时隐藏，反之为显示
    $scope.BUsInfo = true;
    $scope.BUsInfo1 = false;
    $scope.BUsInfo2 = false;
    $scope.checkIndex = 0;

    //记录点击了第几个审核按钮
    $scope.recordIndex = function () {
        $scope.checkIndex = this.$index;

    };

    //绑定商户信息数据
    $scope.MRShowInfo = function () {

        var checkType = $.trim($('.btn-danger.check').eq(this.$index).html());
        var typeTack = $('.typeTack').eq(this.$index).html();
        if(checkType == '未审批'){
            if(typeTack == "再次提交"){$('#checkBtn1').removeClass('Btndisabled').attr('disabled',false).html('未审批');}
            else {$('#checkBtn2').removeClass('Btndisabled').attr('disabled',false).html('未审批');}
        }else {
            if(typeTack == "再次提交"){ $('#checkBtn1').addClass('Btndisabled').attr('disabled',true).html('已审批');}
            else {$('#checkBtn2').addClass('Btndisabled').attr('disabled',true).html('已审批');}
        }

        $scope.BusInform = {
            name: $(angular.element('.btn-default.showBusInfoBtn')[this.$index]).parent().parent().children()[1].innerHTML,
            time: $(angular.element('.btn-default.showBusInfoBtn')[this.$index]).parent().parent().children()[2].innerHTML,
        };
        $(angular.element('.cover')).css('display', 'block');
        if(typeTack && typeTack == "再次提交" ){
            $scope.BUsInfo = false;
            $scope.BUsInfo1 = true;
            $scope.BUsInfo2=false;
        }else {
            $scope.BUsInfo = false;
            $scope.BUsInfo1 = false;
            $scope.BUsInfo2=true;
        }
        setTimeout(function () {
            $(angular.element('.cover')).css('display', 'none');
        },1000);
    };

    //点击返回商户列表页
    $scope.back = function () {
        $scope.BUsInfo = true;
        $scope.BUsInfo1 = false;
        $scope.BUsInfo2= false;
    };

    //获取商家审核信息
   getBusinessInfo();

    //下载
    $scope.download = function () {
        location.href = '/get/download/';
    };

    //拒绝通过
    $scope.refuse = function () {
        $scope.publicFun('.btn-danger.check');
        $(angular.element('.btn-danger.check').eq($scope.checkIndex).parents().eq(0).siblings()[3]).html('未通过').css('color', 'red');

        var nameInfo = $(angular.element('.btn-danger.check').eq($scope.checkIndex).parents().eq(0).siblings()[1]).html();
        var typeInfo = $(angular.element('.btn-danger.check').eq($scope.checkIndex).parents().eq(0).siblings()[3]).html();
        var message = $(angular.element('#msg1 textarea')).val();
        $http.post('/admin/business/update',{name:nameInfo,type:typeInfo,info:0,msg:message}).
            success(function (data) {

        }).error(function () {
            console.log(new Error("信息更新失败"));
        });

    };

    //审批通过
    $scope.permit = function () {
        $scope.publicFun('.btn-danger.check');
        $(angular.element('.btn-danger.check').eq($scope.checkIndex).parents().eq(0).siblings()[3]).html('已通过').css('color', 'green');
        var nameInfo = $(angular.element('.btn-danger.check').eq($scope.checkIndex).parents().eq(0).siblings()[1]).html();
        var typeInfo = $(angular.element('.btn-danger.check').eq($scope.checkIndex).parents().eq(0).siblings()[3]).html();
        var message = $(angular.element('#msg1 textarea')).val();
        $http.post('/admin/business/update',{name:nameInfo,type:typeInfo,info:1,msg:'pass'}).
        success(function (data) {

        }).error(function () {
            console.log(new Error("信息更新失败"));
        });

    };

    //商家信息审核拒绝按钮
    $scope.infoRefuse = function () {
        $scope.publicFun('#checkBtn');
    };

    //商家信息审核通过按钮
    $scope.infoPermit = function () {
        $scope.publicFun('#checkBtn');
    };

    //商家筛选
    $scope.change = function(current_option){
        if(current_option.key!="全部状态"){
            getBusinessInfo(current_option.key);
            getTotalePages('type',current_option.key);
        }else {
            getBusinessInfo();
            getTotalePages();
        }
    };

    /**** 设置下拉框显示内容 ****/
    $scope.option_array = [
        {"key" : "全部状态", "value" : 0},
        {"key" : "未审批", "value" : 1},
        {"key" : "未通过", "value" : 2},
        {"key" : "已通过", "value" : 3},
    ];

    // 下拉框默认显示内容
    $scope.current_option = $scope.option_array[0];

    //图片点击效果
    $(angular.element('img')).on('mousedown', function () {
         $(this).addClass('showBigImgBtnS');
    }).on('mouseleave', function () {
        $(this).removeClass('showBigImgBtnS');
    });

    //查找账号
    $scope.searchInfo = function () {
        var queryStr =  $('.input-group >.form-control').val();
        getBusinessInfo(queryStr,0,'name');
        getTotalePages('name',queryStr);
    };

/*****************************************公共方法**********************************************/
    $scope.publicFun = function (ele) {
        $(angular.element(ele)[$scope.checkIndex]).addClass('Btndisabled').attr("disabled", true).html('已审批');
    };

    //获取商家信息
    function getBusinessInfo(parm,index,type) {
        reload(0);
        if(!parm || parm == "全部状态") parm = "allType";
        if(!index) index=0;
        if(!type) type="type";
        $('.cover').css('display', 'block');

        $http.get('/admin/business/info',{params:{parm:parm,query:index,type:type}})
            .success(function (data) {
                $scope.BusIn = data.result;
                $('.cover').css('display', 'none');
                reload(1);
            })
            .error(function () {
                console.log(new Error("信息获取失败"));
                $('.cover').css('display', 'none');
            });
    }

    getTotalePages();

    //获取总页数
    function getTotalePages(type,content) {
        if(!type) type = 'allType';
        $http.get('/admin/business/infoCount',{params:{type:type,content:content}}).success(function (data) {
            pagination(data.count);
        }).error(function () {
            console.log(new Error("信息获取失败"));
        });
    }

    //分页查询
    function pagination(count) {
        //分页代码
        $('.M-box3').pagination({
            totalData:count,
            showData:5,
            jump: true,
            coping: true,
            prevContent: '上页',
            nextContent: '下页'
        });

        //设置a标签的点击代理
        var index = 0;
        $('.M-box3').delegate('a', 'click', function () {

            switch ($(this).html()) {
                case "下页":
                    pageSwitch(++index,0);
                    break;
                case "上页":
                    pageSwitch(--index,1);
                    break;
                case "跳转":{
                    index = $('.M-box3').find('span.active').html()-1;
                    pageSwitch(index,2);
                }
                    break;
                default:{
                    index = parseInt($(this).html())-1;
                    pageSwitch(index,2);
                }
                    break;
            }
        });
    }

    //重新渲染页面
    function reload(type) {
        if(type == 0){
            setTimeout(function () {
                for (var i = 0;i<$('.btn-danger.check').length;i++){
                    $('.btn-danger.check').eq(i).addClass('Btndisabled').attr("disabled", true).html('已审批');
                    $('.btn-danger.check').eq(i).parent().prev().find('p').eq(0).css('color','black');
                }
            });
        }else {
            setTimeout(function () {
                for (var i = 0;i<$('.btn-danger.check').length;i++){
                    $('.btn-danger.check').eq(i).addClass('Btndisabled').attr("disabled", true).html('已审批');
                    if($scope.BusIn[i]){
                        if($scope.BusIn[i].type == '未审批'){
                            $('.btn-danger.check').eq(i).removeClass('Btndisabled').attr("disabled", false).html('未审批');
                        }else if($scope.BusIn[i].type == '已通过'){
                            $('.btn-danger.check').eq(i).parent().prev().find('p').eq(0).css('color','green');
                        }else if($scope.BusIn[i].type == '未通过'){
                            $('.btn-danger.check').eq(i).parent().prev().find('p').eq(0).css('color','red');
                        }
                    }
                }
            })
        }

    }

    // 页面切换
    function pageSwitch(index,status) {
        var type = $scope.current_option.key;
        var name = $('.input-group >.form-control').val();
        if(status == 0) {
            if (name) {
                getBusinessInfo(name, index, 'name');
            } else {
                getBusinessInfo(type, index, name);
            }
        }else if (status == 1){
            if (name) {
                getBusinessInfo(name, index, 'name');
            } else {
                getBusinessInfo(type, index, name);
            }
        }else {
            if (name) {
                getBusinessInfo(name, index, 'name');
            } else {
                getBusinessInfo(type, index, name);
            }
        }

    }

}]);