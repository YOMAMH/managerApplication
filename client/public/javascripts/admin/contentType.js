/**
 * Created by renminghe on 16-9-19.
 */

app.controller('contentType',['$scope','$http',function ($scope,$http) {


    //获取总类目
    getPage();
    //添加二级、三级分类
    $('.contentManage').delegate('input', 'click', function (e) {
        switch (this.className) {
            //添加二级类目
            case 'btn btn-success btnClassAdd btnClassAddTwo': {
                if ($(this).val() != '保存') {
                    $(this).parent().parent().parent().append(
                        "<div class=" + "'typeContentTwo clearfix'" + ">" +
                        "<div class=" + "'typeContentItem clearfix'" + ">" +
                        "<div class=" + "'col-xs-5 col-sm-5 col-md-5 twoTitle'" + ">" +
                        "<span class=" + "'glyphicon glyphicon-menu-hamburger tag'></span>" +
                        "<input type=" + '"text"' + "placeholder=" + '"添加二级分类"' + "class=" + "'twoClassIn'" + ">" +
                        "</div>" +
                        "<div class=" + "'col-xs-2 col-sm-2 col-md-2'" + ">" + "<span>"+getRandom()+"</span>" + "</div>" +
                        "<div class=" + "'col-xs-3 col-sm-3 col-md-3'" + ">" + "" +
                        "<input type=" + '"button"' + "style=" + '"margin: 0 auto"' + " value=" + '"添加三级分类"' + "class=" + "'btn btn-success btnClassAdd btnClassAddThree'" + ">" + "</div>" +
                        "<div class=" + "'col-xs-2 col-sm-2 col-md-2'" + ">" +
                        "<a href=" + "'javascript:void(0);'" + ">禁用" + "</a>" +
                        "<a href=" + "'javascript:void(0);'" + ">编辑" + "</a>" +
                        "<a href=" + "'javascript:void(0);'" + ">删除" + "</a>" +
                        "</div>" +
                        "</div>" +
                        "<div class=" + "'typeContentThree clearfix'" + ">" +
                        "<div class=" + "'col-xs-5 col-sm-5 col-md-5 threeTitle'" + ">" +
                        "<input type=" + "'text'" + "placeholder=" + "'添加三级分类'" + "class=" + "'threeClassIn'" + ">" +
                        "</div>" +
                        "<div class=" + "'col-xs-2 col-sm-2 col-md-2'" + ">" + "<span>" + getRandom() + "</span></div>" +
                        "<div class=" + "'col-xs-3 col-sm-3 col-md-3'" + ">" + "</div>" +
                        "<div class=" + "'col-xs-2 col-sm-2 col-md-2'" + ">" +
                        "<a href=" + "'javascript:void(0);'" + ">禁用" + "</a>" +
                        "<a href=" + "'javascript:void(0);'" + ">编辑" + "</a>" +
                        "<a href=" + "'javascript:void(0);'" + ">删除" + "</a>" +
                        "</div>" +
                        "</div>" +
                        "</div>"
                    );
                    $(this).val('保存');
                    $(this).css('padding', '0 65px 0 35px');
                } else {
                    $(this).val('添加二级分类');
                    $(this).css('padding', '0 90px 0 10px');
                    var i = 0;
                    var type = 1;
                    if($(this).parent().parent().parent().find('.typeContentTwo:last input[type="text"]').length<1) type=2;
                    for (i; i < $(this).parent().parent().parent().find('.typeContentTwo:last input[type="text"]').length; i++) {
                        if(!$(this).parent().parent().parent().find('.typeContentTwo:last input[type="text"]').eq(i).val()){
                            type = 0;
                        }
                    }
                    if(type==0){    //如果type的值为0说明有的input里没有内容，移除添加的二级类目及该类目下的所有三级类目
                        $(this).parent().parent().parent().find('.typeContentTwo:last').remove();
                    } else if(type == 1){
                        //如果type的值不为0,说明所有的input里都有内容，保存添加的二级类目及该类目下的所有三级类目并同步到数据库
                        $(this).parent().parent().parent().find('.typeContentTwo:last input[type="text"]')
                            .attr('disabled',true).css('color','#333').css('border','none');
                        if($(this).parent().parent().find('div').eq(0).find('span').find('span').html()){
                            var threeClassNameArr = [];
                            var threeClassSortArr = [];

                            //一级类目名称
                            var oneClass = $(this).parent().parent().find('div').eq(0).find('span').find('span').html();

                            //二级类目名称
                            var twoClass = $(this).parent().parent().parent().children().last().children().first()
                                .children().first().find('input').val();

                            //二级类目id
                            var twoSortId = $(this).parent().parent().parent().children().last().children().first()
                                .children().eq(1).find('span').html();

                            //三级类目名称
                            var threeClassArr =  $(this).parent().parent().parent().children().last()
                                .find('.typeContentThree').find('.col-xs-5.threeTitle').find('input');

                            //三级类目id
                            var threeSortArr =  $(this).parent().parent().parent().children().last()
                                .find('.typeContentThree').find('.col-xs-2').find('span');

                            //自调
                            (function () {
                                var I = 0;
                                for(I;I<threeClassArr.length;I++){
                                    threeClassNameArr.push($(threeClassArr).eq(I).val());
                                }
                                return threeClassNameArr;
                            }());

                            (function () {
                                var i = 0;
                                var arrTemp = [];
                                arrTemp.push(twoSortId);
                                for(i;i<threeSortArr.length;i++){
                                    threeClassSortArr.push($(threeSortArr).eq(i).html());
                                    arrTemp.push($(threeSortArr).eq(i).html());
                                }
                                //更新sortId
                                addSortId(arrTemp);
                                return threeClassSortArr;
                            }());

                            //增加类目数据
                            upDataClass(oneClass,twoClass,threeClassNameArr,'',twoSortId,threeClassSortArr,function () {
                                if($('#addClassOne').html()=="添加一级分类") window.location.reload();
                                alert("插入成功！");
                            });

                        }
                    }

                }

            }
                break;
            // 添加三级类目
            case 'btn btn-success btnClassAdd btnClassAddThree': {
                if ($(this).val() != '保存') {
                    $(this).parent().parent().parent().append(
                        "<div class=" + "'typeContentThree clearfix'" + ">" +
                        "<div class=" + "'col-xs-5 col-sm-5 col-md-5 threeTitle'" + ">" +
                        "<input type=" + "'text'" + "placeholder=" + "'添加三级分类'" + "class=" + "'threeClassIn'" + ">" +
                        "</div>" +
                        "<div class=" + "'col-xs-2 col-sm-2 col-md-2'" + ">" + "<span>" + getRandom() + "</span></div>" +
                        "<div class=" + "'col-xs-3 col-sm-3 col-md-3'" + ">" + "</div>" +
                        "<div class=" + "'col-xs-2 col-sm-2 col-md-2'" + ">" +
                        "<a href=" + "'javascript:void(0);'" + ">禁用" + "</a>" +
                        "<a href=" + "'javascript:void(0);'" + ">编辑" + "</a>" +
                        "<a href=" + "'javascript:void(0);'" + ">删除" + "</a>" +
                        "</div>" +
                        "</div>"
                    );

                    $(this).val('保存');
                    $(this).css('padding', '0 65px 0 35px');
                } else {
                    $(this).val('添加三级分类');
                    $(this).css('padding', '0 90px 0 10px');
                    var type = 1;
                    if(!$(this).parent().parent().parent().find('.typeContentThree:last input[type="text"]').val()) type=0;
                    if($(this).parent().parent().parent().find('.typeContentThree:last input[type="text"]').length==0) type = 2;
                    if(type==0) {
                        $(this).parent().parent().parent().find('.typeContentThree:last').remove();
                        type = 0;
                    } else if(type == 1){
                        $(this).parent().parent().parent().find('.typeContentThree:last input[type="text"]')
                            .attr('disabled', true).css('color', '#333').css('border', 'none');

                        //一级类目名称
                        var oneClass = $(this).parent().parent().parent().parent().children().first().find('.col-xs-5')
                            .find('span').find('span').html();

                        var twoClass = $(this).parent().parent().parent().children().first().find('.col-xs-5')
                            .find('span').eq(1).html();
                        //三级类目名称
                        var threeClassName = $(this).parent().parent().parent().find('.typeContentThree:last')
                            .find('.col-xs-5').find('input').val();

                        //三级类目id
                        var threeClassSortId = $(this).parent().parent().parent().find('.typeContentThree:last')
                            .find('.col-xs-2').find('span').html();

                        //添加三级分类
                         $http.post('/admin/content/updateThreeClass',{oneClass:oneClass,twoClass:twoClass,
                         threeClass:threeClassName,threeSortId:threeClassSortId}).success(function (data) {
                             if(data.result instanceof Object){
                                 //更新sortId
                                 addSortId(threeClassSortId);
                                 if($('#addClassOne').html()=="添加一级分类") window.location.reload();
                                 alert("添加三级分类成功");
                             }
                         }).error(function () {
                             alert("添加三级分类失败");
                         });
                    }
                }
                e.stopPropagation();
            }
                break;
        }
    });


    var globalClassName = '';    //全局变量，用来保存起初的数据
    /**
     * 操作按钮点击代理
     */
    $('.contentManage').delegate('a','click',function () {
        //设置类目管理操作业务
        var that = $(this).html();
        if(that == "禁用") unableBtnEvent(this,'#D3D3D3','#A9A9A9',"禁用","启用",'0','1');  //禁用
        if(that == "启用") unableBtnEvent(this,'white','#333',"禁用","禁用",'1','0');  //启用
        if(that == "编辑") editBtnEvent(this);   //编辑
        if(that == "保存") saveBtnEvent(this);   //保存
        if(that == "删除") deleteBtnEvent(this);   //删除
    });

    /**
     * 添加一级分类
     */
    $('#addClassOne').on('click',function () {
        if($(this).html() == "添加一级分类"){
            $('#typeConent >.typeContentItem').append(
                "<div class="+'"typeContentOneAdd clearfix"'+">"+
                "<div class="+'"clearfix"'+">"+
                "<div class="+'"col-xs-5 col-sm-5 col-md-5"'+">"+
                "<span class="+'"glyphicon glyphicon-menu-hamburger tag"'+">"+"</span>"+
                "<input type="+'"text"'+"placeholder="+'"添加一级分类"'+ "class="+'"oneClassIn"'+">"+
                "</div>"+
                "<div class="+'"col-xs-2 col-sm-2 col-md-2"'+">"+
                "<span class="+'"oneSort"'+">"+getRandom()+"</span>"+
                "</div>"+
                "<div class="+'"col-xs-3 col-sm-3 col-md-3"'+">"+
                "<input type="+'"button"'+ "style="+'"margin: 0 auto"'+
                "value="+'"添加二级分类"'+"class="+'"btn btn-success btnClassAdd btnClassAddTwo"'+">"+
                "</div>"+
                "<div class="+'"col-xs-2 col-sm-2 col-md-2"'+">"+
                "<a href=" + "'javascript:void(0);'" + ">禁用" + "</a>" +
                "<a href=" + "'javascript:void(0);'" + ">编辑" + "</a>" +
                "<a href=" + "'javascript:void(0);'" + ">删除" + "</a>" +
                "</div>" +
                "</div>"+
                "<div class=" + "'typeContentTwo clearfix'" + ">" +
                "<div class=" + "'typeContentItem clearfix'" + ">" +
                "<div class=" + "'col-xs-5 col-sm-5 col-md-5 twoTitle'" + ">" +
                "<span class=" + "'glyphicon glyphicon-menu-hamburger tag'></span>" +
                "<input type=" + '"text"' + "placeholder=" + '"添加二级分类"' + "class=" + "'twoClassIn'" + ">" +
                "</div>" +
                "<div class=" + "'col-xs-2 col-sm-2 col-md-2'" + ">" + "<span class="+'"twoSort"'+">"+getRandom()+"</span>" + "</div>" +
                "<div class=" + "'col-xs-3 col-sm-3 col-md-3'" + ">" + "" +
                "<input type=" + '"button"' + "style=" + '"margin: 0 auto"' + " value=" + '"添加三级分类"' + "class=" + "'btn btn-success btnClassAdd btnClassAddThree'" + ">" + "</div>" +
                "<div class=" + "'col-xs-2 col-sm-2 col-md-2'" + ">" +
                "<a href=" + "'javascript:void(0);'" + ">禁用" + "</a>" +
                "<a href=" + "'javascript:void(0);'" + ">编辑" + "</a>" +
                "<a href=" + "'javascript:void(0);'" + ">删除" + "</a>" +
                "</div>" +
                "</div>" +
                "<div class=" + "'typeContentThree clearfix'" + ">" +
                "<div class=" + "'col-xs-5 col-sm-5 col-md-5 threeTitle'" + ">" +
                "<input type=" + "'text'" + "placeholder=" + "'添加三级分类'" + "class=" + "'threeClassIn'" + ">" +
                "</div>" +
                "<div class=" + "'col-xs-2 col-sm-2 col-md-2'" + ">" + "<span class="+'"threeSort"'+">" + getRandom() + "</span></div>" +
                "<div class=" + "'col-xs-3 col-sm-3 col-md-3'" + ">" + "</div>" +
                "<div class=" + "'col-xs-2 col-sm-2 col-md-2'" + ">" +
                "<a href=" + "'javascript:void(0);'" + ">禁用" + "</a>" +
                "<a href=" + "'javascript:void(0);'" + ">编辑" + "</a>" +
                "<a href=" + "'javascript:void(0);'" + ">删除" + "</a>" +
                "</div>" +
                "</div>" +
                "</div>"
                +"</div>"

            );

            $(this).html("保存");
        }else {
            $(this).html("添加一级分类");
            var i = 0;
            var type = 1;
            var classies = $('.typeContentItem').find('.typeContentOneAdd:last input[type="text"]');
            if(classies.length<1) type = 2;
            for (i; i < classies.length; i++) {
                if(!classies.eq(i).val()){
                    type = 0;
                }
            }
            if(type==1){
                classies.attr('disabled',true).css('color','#333').css('border','none');

                //一级类目名称
                var oneClass = $('#typeConent .typeContentOneAdd').children().first().find('.col-xs-5')
                    .find('input').val();

                //一级类目id
                var oneClassSortId = $('#typeConent .typeContentOneAdd').children().first().find('.col-xs-2')
                    .find('span').html();

                //二级类目名称
                var twoClass = $('#typeConent .typeContentOneAdd').find('.typeContentTwo').find('.typeContentItem')
                    .find('.col-xs-5').find('input');

                //二级类目id
                var twoSortId =  $('#typeConent .typeContentOneAdd').find('.typeContentTwo').find('.typeContentItem')
                    .find('.col-xs-2').find('span');

                //三级类目id
                var threeSortArr = $('#typeConent .typeContentOneAdd').find('.typeContentTwo')
                    .find('.typeContentThree').find('.col-xs-2').find('span');

                var threeClassSortArr = [];
                var twoClassSortArr = [];
                var arrTemp = [];
                arrTemp.push(oneClassSortId);

                (function () {
                    var i = 0;
                    for(i;i<twoSortId.length;i++){
                        twoClassSortArr.push($(twoSortId).eq(i).html());
                        arrTemp.push($(twoSortId).eq(i).html());
                    }
                    return twoClassSortArr;
                }());

                (function () {
                    var I = 0;
                    for(I;I<threeSortArr.length;I++){
                        threeClassSortArr.push($(threeSortArr).eq(I).html());
                        arrTemp.push($(threeSortArr).eq(I).html());
                    }
                    return threeClassSortArr;
                }());

                //检查是否有一级类目
                checkOneClass(oneClass,oneClassSortId,function (data) {
                    if(data.result[0] instanceof Object){
                        createClass();
                        alert("插入数据成功！");
                    }else {
                        $http.post('/admin/content/createOneClass',{oneClass:oneClass,oneSortId:oneClassSortId})
                            .success(function (data) {
                                createClass();
                                //更新界面
                                setTimeout(function () {
                                    window.location.reload();
                                },100);
                                alert("插入数据成功！");
                            }).error(function () {
                            alert('创建一级类目失败');
                        });
                    }
                });

                //添加类目id
                addSortId(arrTemp);

                function createClass() {
                    var i = 0;
                    for(i;i<twoClass.length;i++){
                        var twoClassItem = $(twoClass).eq(i);
                        var twoClassNameItem = $(twoClass).eq(i).val();
                        var twoClassSortItem = $(twoSortId).eq(i).html();
                        var threeClass = $(twoClassItem).parent().parent().parent().find('.typeContentThree');
                        var k = 0;
                        var threeClassNameArr = [];
                        var threeClassSortArr = [];
                        for (k;k<threeClass.length;k++){
                            threeClassNameArr.push($(threeClass).eq(k).find('.col-xs-5').find('input').val());
                            threeClassSortArr.push($(threeClass).eq(k).find('.col-xs-2').find('span').html());
                        }

                        // 添加类目名称
                        upDataClass(oneClass,twoClassNameItem,threeClassNameArr, oneClassSortId,
                            twoClassSortItem,threeClassSortArr);

                    }
                }

            }else {
                $('.typeContentOneAdd:last').remove();
            }
        }

    });


    //获取类目信息数量
    $http.get('/admin/content/totalClassCount').success(function (data) {
        if(!data.result){
            pagination(1);
        }else { pagination(data.result.count);}
    }).error(function () {
        console.log(new Error('信息获取失败'));
    });

    //验证是否有一级分类
    function checkOneClass(oneClass,oneClassSortId,callback) {
        $http.get('/admin/content/checkOneClass',{params:{oneClass:oneClass,oneSortId:oneClassSortId}})
            .success(function (data) {
            callback(data);

        }).error(function () {
            console.log(new Error('信息获取失败'));
        });
    }

    //分页查询
    function pagination(count)
    {
        //分页代码
        $('.M-box3').pagination({
            totalData:count,
            showData:1,
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
                     getPage(++index);
                    break;
                case "上页":
                    getPage(--index);
                    break;
                case "跳转":{
                    index = $('.M-box3').find('span.active').html()-1;
                     getPage(index);
                }
                    break;
                default:{
                    index = parseInt($(this).html())-1;
                     getPage(index);
                }
                    break;
            }
        });
    }

    //切换页面
   function getPage(index) {
       if(!index)index=0;
       $('.cover').css('display', 'block');
       $http.get('/admin/content/totalClass',{params:{index:index}}).success(function (data) {
           $scope.classItems = data.result;
           $('.cover').css('display', 'none');
       }).error(function () {
           console.log(new Error('信息获取失败'));
       });
   }


   //增加类目
    function upDataClass() {
        var params = {};
        var call = "";

        (function (arguments) {
            var i = 0;
            for (i;i<arguments.length;i++){
                 params[i] = arguments[i];
            }
            return params;
        }(arguments));

        $http.post('/admin/content/upDataClass',{
            oneClass:params[0],
            twoClass:params[1],
            threeClass:params[2],
            oneSortId:params[3],
            twoSortId:params[4],
            threeSortId:params[5]
        }).success(function (data) {
            if(data.result.info){
                if(params[6]){
                    call = params[6];
                    call();
                }
            }

        }).error(function () {
            alert('添加失败');
        });
    }


   //增加类目Id
    function addSortId(idArr) {
        var numberArrTemp = [];
        if(typeof idArr == 'string') {
            numberArrTemp.push(idArr);
        }else {
            (function () {
                var i = 0;
                for (i;i<idArr.length;i++ ){
                    numberArrTemp.push(idArr[i]);
                }
                return numberArrTemp;
            }());
        }
        $http.post('/admin/content/addSortId',{number:numberArrTemp}).success(function (data) {

        }).error(function () {
            console.error('数据插入失败');
        });

    }

    //更新类目
    function updateCategory() {
        var argObj = {};
        var args = arguments;
        (function () {
           var i = 0;
            for (i;i<args.length;i++){
                argObj[i] = args[i];
            }
            return argObj;
        }());

        $http.post('/admin/content/updateCategory',{
            oneClass:argObj[0],
            twoClass:argObj[1],
            threeClass:argObj[2],
            type:argObj[3],
            category:argObj[4],
            originallyName:argObj[5]
        }).success(function () {

        }).error(function () {
            alert("操作失败");
        });
    }

    /**
     * 页面禁用按钮事件
     * @param btn   禁用的按钮
     * @param bgColor   背景颜色
     * @param textColor   字体颜色
     * @param text    按钮初始值
     * @param innerText    按钮改变的值
     * @param type1    需要改变的状态1
     * @param type2    需要改变的状态2
     */
    function unableBtnEvent(btn,bgColor,textColor,text,innerText,type1,type2) {
        //如果是三级类目
        if($(btn).parent().parent().hasClass('typeContentThree')){
            if($(btn).parent().parent().parent().find('.typeContentItem').children().last()
                    .find('a').first().html()== text && $('#typeConent').find('.col-xs-2').find('a')
                    .eq(0).html()== text){
                $(btn).html(innerText);

                innerText == "启用"?$(btn).parent().find('a').css('color','#A9A9A9'):
                    $(btn).parent().find('a').css('color','#337ab7');

                //背景变灰
                $(btn).parent().parent().css('backgroundColor',bgColor).css('color',textColor);


                //一级类目
                var oneClass = $(btn).parent().parent().parent().parent().children().first().find('.col-xs-5')
                    .find('span').find('span').html();

                //二级类目
                var twoClass = $(btn).parent().parent().parent().children().first().find('.col-xs-5')
                    .find('span').eq(1).html();

                //某个二级类目下所有的三级类目名称
                var threeClass = $(btn).parent().parent().parent().find('.typeContentThree').find('.col-xs-5')
                    .find('span');

                //某个二级类目下所有的三级类目id
                var threeClassId = $(btn).parent().parent().parent().find('.typeContentThree').find('.col-xs-2')
                    .find('span');

                //某个二级类目下所有的三级类目的状态
                var threeClassTypes = $(btn).parent().parent().parent().find('.typeContentThree').find('.col-xs-2')
                    .find('a:eq(0)');

                //记录点击的三级类目名称
                var threeClassType = $(btn).parent().parent().find('.col-xs-5').find('span').html();

                var threeClassArrTemp = [];

                (function () {
                    var i = 0;
                    for (i;i<threeClass.length;i++){
                        var type = '';
                        var name = $(threeClass).eq(i).html();
                        var sortId = $(threeClassId).eq(i).html();
                        if($(threeClass).eq(i).html() == threeClassType ||$(threeClassTypes).eq(i).html()==innerText){
                            type = type1;
                        }else {
                            type = type2;
                        }

                        threeClassArrTemp.push({name:name,sortId:sortId,type:type});
                    }
                    return threeClassArrTemp;
                }());

                //更新三级类目
                updateCategory(oneClass,twoClass,threeClassArrTemp,type1,3);
            }

        }
        //如果是二级类目
        else if($(btn).parent().parent().hasClass('typeContentItem')){
            if($('#typeConent').find('.col-xs-2').find('a').eq(0).html()=="禁用"){
                $(btn).html(innerText);

                innerText == "启用"?$(btn).parent().find('a').css('color','#A9A9A9'):
                    $(btn).parent().find('a').css('color','#337ab7');

                $(btn).parent().parent().css('backgroundColor',bgColor).css('color',textColor);

                //遍历所有二级分类的子元素中的a标签，找到所有禁用按钮，改变状态
                var threeClassArr = $(btn).parent().parent().parent().find('.typeContentThree')
                    .find('.col-xs-2:eq(1)').find('a:eq(0)');

                if(innerText == "启用"){
                    $(btn).parent().find('a').css('color','#A9A9A9');
                    (function () {
                        var i = 0;
                        for(i;i<threeClassArr.length;i++){
                            $(threeClassArr).eq(i).parent().parent().css('backgroundColor',bgColor)
                                    .css('color',textColor);
                            $(threeClassArr).eq(i).parent().find('a').css('color','#A9A9A9');
                        }
                    }());
                }else{
                    $(btn).parent().find('a').css('color','#337ab7');
                    (function () {
                        var i = 0;
                        for(i;i<threeClassArr.length;i++){
                            if($(threeClassArr).eq(i).html() == "禁用"){
                                $(threeClassArr).eq(i).parent().parent().css('backgroundColor',bgColor)
                                    .css('color',textColor);
                                $(threeClassArr).eq(i).parent().find('a').css('color','#337ab7');
                            }

                        }
                    }());
                }

                //一级类目
                var oneClass = $(btn).parent().parent().parent().parent().children().first().find('.col-xs-5')
                    .find('span').find('span').html();

                //二级类目
                var twoClass = $(btn).parent().parent().parent().children().first().find('.col-xs-5').find('span')
                    .eq(1).html();

                //更新二级类目
                updateCategory(oneClass,twoClass,'',type1,2);
            }

        }
        //如果是一级类目
        else {
            var threeClassArr = $(btn).parent().parent().parent().find('.typeContentTwo').find('.typeContentItem')
                .find('.col-xs-2:eq(1)').find('a:eq(0)');

            $(btn).html(innerText);
            if(innerText=="启用"){
                $(btn).parent().find('a').css('color',textColor);
                (function () {
                    var i = 0;
                    for(i;i<threeClassArr.length;i++){
                        if($(threeClassArr).eq(i).html() == "禁用"){
                            $(threeClassArr).eq(i).parent().parent().parent().css('backgroundColor',bgColor)
                                .css('color',textColor);
                            $(threeClassArr).eq(i).parent().parent().parent().find('a').css('color',textColor);
                        }

                    }
                }());
            }else {
                $(btn).parent().find('a').css('color','#337ab7');
                (function () {
                    var i = 0;
                    for(i;i<threeClassArr.length;i++){
                        if($(threeClassArr).eq(i).html() == "禁用"){
                            $(threeClassArr).eq(i).parent().parent().parent().css('backgroundColor',bgColor)
                                .css('color',textColor);
                            $(threeClassArr).eq(i).parent().parent().parent().find('.typeContentItem')
                                .find('.col-xs-2:eq(1)').find('a').css('color', '#337ab7');
                            var threeClaArr = $(threeClassArr).eq(i).parent().parent().parent().find('.typeContentThree')
                                .find('.col-xs-2:eq(1)').find('a');
                            console.log(threeClaArr);
                            (function () {
                                var i = 0;
                                for (i;i<threeClaArr.length;i++){
                                    if($(threeClaArr).eq(i).html() == "禁用") {
                                        $(threeClaArr).eq(i).parent().parent().parent().css('backgroundColor', bgColor)
                                            .css('color', textColor);
                                        $(threeClaArr).eq(i).parent().find('a').css('color', '#337ab7');
                                    }
                                }
                            }());
                        }

                    }
                }());
            }
            $(btn).parent().parent().css('backgroundColor',bgColor).css('color',textColor);

            //一级类目名称
            var oneClass =  $(btn).parent().parent().find('.col-xs-5').find('span').find('span').html();

            //更新一级类目
            updateCategory(oneClass,'','',type1,1);
        }
    }


    /**
     * 编辑按钮点击事件
     * @param btn 点击的按钮
     */
    function editBtnEvent(btn) {
        //三级分类
        if($(btn).parent().parent().hasClass('typeContentThree')){
            if($(btn).parent().parent().parent().find('.typeContentItem').children().last()
                    .find('a').first().html()== "禁用" && $('#typeConent').find('.col-xs-2').find('a')
                    .eq(0).html()== "禁用"&& $(btn).parent().children().first().html() == "禁用"){
                $(btn).html('保存');
                var threeClass = $(btn).parent().parent().find('.col-xs-5').find('span').html();
                globalClassName = threeClass;
                $(btn).parent().parent().find('.col-xs-5').html('<input type="text" class="threeClassIn"                   value="'+threeClass+'">');
            }
        }
        //二级分类
        else if($(btn).parent().parent().hasClass('typeContentItem')){
            if($('#typeConent').find('.col-xs-2').find('a').eq(0).html()=="禁用"
                && $(btn).parent().children().first().html() == "禁用"){
                $(btn).html('保存');
                var twoClass = $(btn).parent().parent().parent().children().first().find('.col-xs-5')
                    .find('span').eq(1).html();

                //保存当初的二级类目名称
                globalClassName = twoClass;

                $(btn).parent().parent().find('.col-xs-5').find('span:eq(1)').remove();
                $(btn).parent().parent().find('.col-xs-5').append('<input type="text" class="oneClassIn" value="'+twoClass+'">');
            }

        }
        //一级分类
        else {
            if($(btn).parent().children().first().html() == "禁用"){
                $(btn).html('保存');
                var oneClass = $(btn).parent().parent().find('.col-xs-5').find('span').find('span').html();
                globalClassName = oneClass;
                $(btn).parent().parent().find('.col-xs-5').find('.glyphicon').find('span').remove();
                $(btn).parent().parent().find('.col-xs-5')
                    .append('<input type="text" placeholder="添加一级分类" class="oneClassIn" value="'+oneClass+'">');
            }
        }
    }

    /**
     * 保存按钮点击事件
     * @param btn 点击的按钮
     */
    function saveBtnEvent(btn) {
        //三级分类
        if($(btn).parent().parent().hasClass('typeContentThree')) {
            var threeClassTemp = $(btn).parent().parent().find('.col-xs-5').find('input').val();
            $(btn).html('编辑');
            $(btn).parent().parent().find('.col-xs-5').html('<span class="oneClassTittle">' + threeClassTemp + '</span>');
            //一级类目
            var oneClass = $(btn).parent().parent().parent().parent().children().first().find('.col-xs-5')
                .find('span').find('span').html();

            //二级类目
            var twoClass = $(btn).parent().parent().parent().children().first().find('.col-xs-5')
                .find('span').eq(1).html();

            //某个二级类目下所有的三级类目名称
            var threeClass = $(btn).parent().parent().parent().find('.typeContentThree').find('.col-xs-5')
                .find('span');

            //某个二级类目下所有的三级类目id
            var threeClassId = $(btn).parent().parent().parent().find('.typeContentThree').find('.col-xs-2')
                .find('span');

            //某个二级类目下所有的三级类目的状态
            var threeClassTypes = $(btn).parent().parent().parent().find('.typeContentThree').find('.col-xs-2')
                .find('a:eq(0)');
            var threeClassArrTemp = [];

            (function () {
                var i = 0;
                for (i; i < threeClass.length; i++) {
                    var type = '';
                    var name = $(threeClass).eq(i).html();
                    var sortId = $(threeClassId).eq(i).html();
                    if ($(threeClassTypes).eq(i).html() == "启用") {
                        type = "0";
                    } else {
                        type = "1";
                    }

                    threeClassArrTemp.push({name: name, sortId: sortId, type: type});
                }
                return threeClassArrTemp;
            }());

            //如果输入框内有值且不是原来的值，则更新
            if (threeClassTemp&&threeClassTemp!=globalClassName) {
                //更新三级类目
                updateCategory(oneClass, twoClass, threeClassArrTemp, '', 3);
            } else {   //否则保持不变
                $(btn).parent().parent().find('.col-xs-5').find('span').html(globalClassName);
            }
            globalClassName = '';
        }
        //二级分类
        else if($(btn).parent().parent().hasClass('typeContentItem')){
            $(btn).html('编辑');
            var oneClass = $(btn).parent().parent().parent().parent().children().first().find('.col-xs-5')
                .find('span').find('span').html();
            var twoClass = $(btn).parent().parent().parent().children().first().find('.col-xs-5')
                .find('input').val();
            $(btn).parent().parent().find('.col-xs-5').find('input').remove();
            $(btn).parent().parent().find('.col-xs-5').append('<span class="oneClassTittle">'+twoClass+'</span>');
            if(twoClass){
                //更新二级类目
                updateCategory(oneClass, twoClass, '', '', 2,globalClassName);
            }else {
                $(btn).parent().parent().parent().children().first().find('.col-xs-5')
                    .find('span').eq(1).html(globalClassName);
            }
            globalClassName = '';
        }

        //一级分类
        else {
            $(btn).html('编辑');
            var oneClass =  $(btn).parent().parent().find('.col-xs-5').find('input').val();
            $(btn).parent().parent().find('.col-xs-5').find('input').remove();
            $(btn).parent().parent().find('.col-xs-5').find('span')
                .append('<span class="oneClassTittle">'+oneClass+'</span>');

            if(oneClass){
                //更新一级类目
                updateCategory(oneClass, '', '', '', 1,globalClassName);
            }else {
                $(btn).parent().parent().find('.col-xs-5').find('span').find('span').html(globalClassName);
            }

            globalClassName = '';

        }
    }

    /**
     * 删除按钮点击事件
     * @param btn
     */
    function deleteBtnEvent(btn) {
        //如果是三级分类
        if($(btn).parent().parent().hasClass('typeContentThree')) {

            if($(btn).parent().parent().hasClass('typeContentThree')) {
                if($(btn).parent().parent().parent().find('.typeContentItem').children().last()
                        .find('a').first().html()== "禁用" && $('#typeConent').find('.col-xs-2').find('a')
                        .eq(0).html()== "禁用" && $(btn).parent().children().first().html() == "禁用"){
                    //一级类目
                    var oneClass = $(btn).parent().parent().parent().parent().children().first().find('.col-xs-5')
                        .find('span').find('span').html();

                    //二级类目
                    var twoClass = $(btn).parent().parent().parent().children().first().find('.col-xs-5')
                        .find('span').eq(1).html();

                    $(btn).parent().parent().fadeOut(500);
                    setTimeout(function () {

                        globalClassName = $(btn).parent().parent().find('.col-xs-5').find('span').html();

                        //某个二级类目下所有的三级类目名称
                        var threeClass = $(btn).parent().parent().parent().find('.typeContentThree').find('.col-xs-5')
                            .find('span');

                        //某个二级类目下所有的三级类目id
                        var threeClassId = $(btn).parent().parent().parent().find('.typeContentThree').find('.col-xs-2')
                            .find('span');

                        //某个二级类目下所有的三级类目的状态
                        var threeClassTypes = $(btn).parent().parent().parent().find('.typeContentThree').find('.col-xs-2')
                            .find('a:eq(0)');

                        //当前点击的按钮的所属类目id
                        var sortId = $(btn).parent().parent().find('.col-xs-2:eq(0)').find('span').html();

                        var threeClassArrTemp = [];

                        (function () {
                            var i = 0;
                            for (i; i < threeClass.length; i++) {
                                var type = '';
                                var name = $(threeClass).eq(i).html();
                                var sortId = $(threeClassId).eq(i).html();
                                if (globalClassName == name) continue;  //如果遍历到要删除的类目，跳过循环不push到数组里
                                if ($(threeClassTypes).eq(i).html() == "启用") {
                                    type = "0";
                                } else {
                                    type = "1";
                                }

                                threeClassArrTemp.push({name: name, sortId: sortId, type: type});
                            }
                            return threeClassArrTemp;
                        }());

                        //更新三级类目
                        updateCategory(oneClass, twoClass, threeClassArrTemp, '', 3);

                        //删除类目id
                        deleteSortId(sortId);

                        //移除该类目
                        $(btn).parent().parent().remove();

                        //初始化全局变量
                        globalClassName = '';
                    },500);
                }
            }


        }

        //如果是二级分类
        else if($(btn).parent().parent().hasClass('typeContentItem')){

            if($('#typeConent').find('.col-xs-2').find('a').eq(0).html()=="禁用"
                && $(btn).parent().children().first().html() == "禁用"){
                //一级类目名称
                var oneClass = $(btn).parent().parent().parent().parent().children().first().find('.col-xs-5')
                    .find('span').find('span').html();

                //二级类目名称
                var twoClass = $(btn).parent().parent().parent().children().first().find('.col-xs-5')
                    .find('span:eq(1)').html();

                //所有的类目id数组
                var sortIdArrTemp = [];

                //二级类目id
                var twoClassId = $(btn).parent().parent().parent().children().first().find('.col-xs-2:eq(0)').find('span').
                html();

                //三级类目id
                var threeClassId = $(btn).parent().parent().parent().find('.typeContentThree').find('.col-xs-2:eq(0)')
                    .find('span');

                (function () {
                    var i = 0;
                    for (i;i<threeClassId.length;i++){
                        sortIdArrTemp.push($(threeClassId).eq(i).html());
                    }
                    sortIdArrTemp.push(twoClassId);
                    return sortIdArrTemp;
                }());

                $(btn).parent().parent().parent().fadeOut(500);

                setTimeout(function () {
                    //删除类目
                    deleteCategory(oneClass,twoClass,2,function () {

                        //删除对应的id
                        deleteSortId(sortIdArrTemp);

                        //从界面上移除该类目
                        $(btn).parent().parent().parent().remove();
                    });
                },500);
            }

        }

        //如果是一级分类
        else {
            if($(btn).html() == "禁用"){
                var oneClass = $(btn).parent().parent().find('.col-xs-5').find('span').find('span').html();

                //一级类目id
                var oneClassSortId = $(btn).parent().parent().find('.col-xs-2:eq(0)').find('span').html();

                //二级类目id
                var twoSortId =  $(btn).parent().parent().parent().find('.typeContentTwo').find('.typeContentItem')
                    .find('.col-xs-2').find('span');

                //三级类目id
                var threeSortArr = $(btn).parent().parent().parent().find('.typeContentTwo')
                    .find('.typeContentThree').find('.col-xs-2').find('span');

                var threeClassSortArr = [];
                var twoClassSortArr = [];
                var arrTemp = [];
                arrTemp.push(oneClassSortId);

                (function () {
                    var i = 0;
                    for(i;i<twoSortId.length;i++){
                        twoClassSortArr.push($(twoSortId).eq(i).html());
                        arrTemp.push($(twoSortId).eq(i).html());
                    }
                    return twoClassSortArr;
                }());

                (function () {
                    var I = 0;
                    for(I;I<threeSortArr.length;I++){
                        threeClassSortArr.push($(threeSortArr).eq(I).html());
                        arrTemp.push($(threeSortArr).eq(I).html());
                    }
                    return threeClassSortArr;
                }());

                $(btn).parent().parent().parent().fadeOut(500);

                setTimeout(function () {

                    //删除对应的id
                    deleteSortId(arrTemp);

                    //删除类目
                    deleteCategory(oneClass,'',1,function () {
                        //从界面上移除该类目
                        $(btn).parent().parent().parent().remove();
                    });
                },500);
            }

        }
    }


    /**
     * 删除一级二级类目
     * @param oneClass  一级类目名称
     * @param twoClass  二级类目名称
     * @param type  需要更新的类目种类
     * @param call  回调函数
     */
    function deleteCategory(oneClass,twoClass,type,call) {

        //删除类目
        $http.post('/admin/content/deleteCategory',{oneClass:oneClass,twoClass:twoClass,type:type}).
            success(function (data) {
                if(call)call();
        }).error(function () {
            alert('删除失败');
        });
    }


    /**
     * 删除类目id
     * @param sortId  要删除的类目id
     */
    function deleteSortId(sortId) {
        var sortIdArr = [];
        if(typeof sortId == "string"){
            sortIdArr[0] = sortId;
        }else {
            sortIdArr = sortId;
        }

        $http.post('/admin/content/deleateSortId',{sortId:sortIdArr}).success(function () {

        }).error(function () {
            alert("删除类目id失败");
        })
    }

    /**
     * 根据type不同决定显示样式不同
     * @param type
     */
    $scope.setClass = function (type) {
        return type=='0'?'disableStyleOne':'';
    };

    /**
     * 根据type不同决定显示文字不同
     * @param type
     */
    $scope.setText = function (type) {
        return type=='0'?'启用':'禁用';
    };

    //获取随机数
    function getRandom() {
        //产生一个随机数
        var PId = parseInt(Math.random() * 10000);

        //验证这个随机数
        $http.get('/admin/content/checkSortId',{params:{number:PId}}).success(function (data) {

            //检查数据库里是否有这个数 如果有再次执行这个函数
            if(typeof data.result[0] == 'object') getRandom();

        }).error(function () {
            console.error("获取信息失败");
        });

        return PId>1000?PId:getRandom();
    }

}]);

