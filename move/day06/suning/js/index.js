/**
 * Created by Administrator on 2017/11/26.
 */
//轮播图
// 使用zepto.js插件 跟jquery库很类似的库，
$(function() {

    var $snBanner = $('.sn_banner');
    var width = $snBanner.width();
    var $imageBox = $snBanner.find('ul:first');
    var $pointBox = $snBanner.find('ul:last');


//    动画函数封装
    var animateFuc = function() {
        $imageBox.animate({transform: 'translateX('+ (-index*width)+'px)'}, 200, 'easing', function() {
            if(index >= 9) {
                index = 1;
                $imageBox.css({transform: 'translateX('+ (-index*width)+'px)'});
            }else if(index <= 0){
                index = 8;
                $imageBox.css({transform: 'translateX('+ (-index*width)+'px)'});
            }

        //    点容器的样式,先清除所有的，在给当前的加上
            $pointBox.find('li').removeClass('now').eq(index-1).addClass('now');
        })
    }
    var index = 1;
    var timer = setInterval(function() {
        index++;
        animateFuc();
    }, 2000);

//    手势切换 用到轮播图的插件swipe
    $snBanner.on('swipeLeft', function() {
        index++;
        animateFuc();
    }).on('swipeRight', function() {
        index--;
        animateFuc();
    })

})