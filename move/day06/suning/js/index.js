/**
 * Created by Administrator on 2017/11/26.
 */
//�ֲ�ͼ
// ʹ��zepto.js��� ��jquery������ƵĿ⣬
$(function() {

    var $snBanner = $('.sn_banner');
    var width = $snBanner.width();
    var $imageBox = $snBanner.find('ul:first');
    var $pointBox = $snBanner.find('ul:last');


//    ����������װ
    var animateFuc = function() {
        $imageBox.animate({transform: 'translateX('+ (-index*width)+'px)'}, 200, 'easing', function() {
            if(index >= 9) {
                index = 1;
                $imageBox.css({transform: 'translateX('+ (-index*width)+'px)'});
            }else if(index <= 0){
                index = 8;
                $imageBox.css({transform: 'translateX('+ (-index*width)+'px)'});
            }

        //    ����������ʽ,��������еģ��ڸ���ǰ�ļ���
            $pointBox.find('li').removeClass('now').eq(index-1).addClass('now');
        })
    }
    var index = 1;
    var timer = setInterval(function() {
        index++;
        animateFuc();
    }, 2000);

//    �����л� �õ��ֲ�ͼ�Ĳ��swipe
    $snBanner.on('swipeLeft', function() {
        index++;
        animateFuc();
    }).on('swipeRight', function() {
        index--;
        animateFuc();
    })

})