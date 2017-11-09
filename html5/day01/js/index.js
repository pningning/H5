$(function($) {
    //全屏初始化，传入参数
        $(".container").fullpage({
            //1.设置每页的北京颜色
            sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
            //2.不设置垂直居中,默认为true，垂直居中
            verticalCentered: false,
            //3，显示导航栏，默认不显示
            navigation: true,
            //滚动的速度设置跟图片动画的速度一致
            scrollingSpeed: 1000,
            //4.滚到某一屏的回调函数，参数index，是这一屏的序号
            afterLoad: function(link, index) {
                //当滚到某一屏的时候，给需要做动画的元素加上一个类
                $('.section').eq(index-1).addClass('load');

            },
            //5.离开某一屏的的回调函数
            onLeave: function(index, nextindex, direction) {
                //如果是从第
                if(index == 2 && nextindex == 3) {
                    $('.section').eq(index-1).addClass('leaved');
                } else if(index == 3 && nextindex == 4) {
                    $('.section').eq(index-1).addClass('leaved');
                }
            }
        })
})