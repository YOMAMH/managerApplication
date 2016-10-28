/**
 * Created by renminghe on 16-8-24.
 */
//按钮点击事件
$(function () {

    $('input[type="submit"]').click(function () {
        var userName = $.trim($('#userName').val());
        var password = $.trim($('#password').val());
        //登陆验证
        $.ajax({
            url:'/admin/checkUser',
            type:'POST',
            timeout:3000,
            data:{userName:userName,pwd:password},
            beforeSend:function () {
                if(!userName || !password){
                    $('.login_fields__msg > span').text("用户名和密码不能为空").css('color','red');
                    return false;
                }
                $('.login').addClass('test');
                setTimeout(function () {
                    $('.login').addClass('testtwo');
                    $('.login_fields__submit>input').val('登录中...');
                }, 300);
                setTimeout(function () {
                    $('.authent').show().animate({ right: -320 }, {
                        easing: 'easeOutQuint',
                        duration: 600,
                        queue: false
                    });
                    $('.authent').animate({ opacity: 1 }, {
                        duration: 200,
                        queue: false
                    }).addClass('visible');
                }, 500);
                setTimeout(function () {
                    $('.authent').show().animate({ right: 90 }, {
                        easing: 'easeOutQuint',
                        duration: 600,
                        queue: false
                    });
                    $('.authent').animate({ opacity: 0 }, {
                        duration: 200,
                        queue: false
                    }).addClass('visible');
                    $('.login').removeClass('testtwo');
                }, 1500);
                setTimeout(function () {
                    $('.login').removeClass('test');
                    $('.login div').fadeOut(123);
                    $('#userName').val('');
                    $('#password').val('');
                }, 1800);
            },
            success:function (data) {
                if(data.statusCode == 200){
                    setTimeout(function () {
                        $('.success').find('span').text('认证成功').css('fontSize','25px');
                        $('.success').find('p').text('欢迎回来').css('color','white');
                        $('.success').fadeIn();

                    }, 2200);
                    setTimeout(function () {
                        $('.success').fadeOut();
                        //验证session
                        location.href='/';
                    }, 2800);
                }



            },
            error:function (data) {
                setTimeout(function () {
                    $('.success').find('span').text('认证失败').css('fontSize','25px');
                    $('.success').find('p').text('请重新登陆').css('color','white');
                    $('.success').fadeIn();

                }, 2200);
                setTimeout(function () {
                    $('.success').fadeOut();
                    $('.login_fields__submit>input').val('登录');
                    $('.login div').fadeIn(123);
                    $('.success').find('h2').text('');
                    $('.success').find('p').text('');
                    $('.authent').fadeOut();
                    $('.success').find('span').text('');
                    $('.success').find('p').text('');
                }, 2800);
            }
        });

    });
    $('body').keydown(function (e) {
        if(e.keyCode == 13){
            $('input[type="submit"]').click();
        }
    });
    $('input[type="text"],input[type="password"]').focus(function () {
        $(this).prev().animate({ 'opacity': '1' }, 200);
    });
    $('input[type="text"],input[type="password"]').blur(function () {
        $(this).prev().animate({ 'opacity': '.5' }, 200);
    });
    $('input[type="text"],input[type="password"]').keyup(function () {
        if (!$(this).val() == '') {
            $(this).next().animate({
                'opacity': '1',
                'right': '30'
            }, 200);
        } else {
            $(this).next().animate({
                'opacity': '0',
                'right': '20'
            }, 200);
        }
    });
    var open = 0;
    $('.tab').click(function () {
        $(this).fadeOut(200, function () {
            $(this).parent().animate({ 'left': '0' });
        });
    });

});

