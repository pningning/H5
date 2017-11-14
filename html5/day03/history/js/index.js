$(function($) {
    // ajax函数
    function render(page) {
        // 发送ajax请求
        $.ajax({
            type: 'get',
            url: 'api/data.php',
            dataType: 'json',
            data: {
                page: page
            },
            success: function(data) {
                $('[data-page]').removeClass('now');
                $('[data-page="' + data.page +'"]').addClass('now');
                //渲染页面
                $('.content').html(data.html);
            }
        });
    }

    // 点击每个a的时候，发送ajax请求，请求数据
    $('a').on('click', function() {
        var page = $(this).parent().data('page');
        render(page);

        //添加地址
        var historyUrl = $(this).attr('href');
        history.pushState(null, null, historyUrl);
        return false;
    });

    // 监听地址改变
    window.onpopstate = function() {
        var pathname =  location.pathname;
        // 设置初始的值
        var page = 'index';
        if(pathname.indexOf('index.php') > -1) {
            page = 'index';
        } else if(pathname.indexOf('my.php') > -1) {
            page = 'my';
        } else if(pathname.indexOf('friend') > -1) {
            page = 'friend';
        }
        render(page);
    }

})
