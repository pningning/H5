//思路：
/**
第一屏：有两个公共布局，更多和购物中心，其他都是偏移
第二屏：1.当滚到某一屏的时候再执行当前这屏的动画，用到插件的回调函数，
		2.搜索框，先从右侧运动到中间，搜索文字出现，停留，运动到原点，商品出现，
		3.沙发，当离开第二屏的时候开始显示，并运动到第三屏的位置，用到插件离开的回调函数
第三屏：1.调整滚动时间和运动时间一致，用到插件属性
		2.当运动第三屏，沙发尺码和购物车显示
		3.当离开第三屏的时候，沙发开始运动到第四瓶
第四屏：1.沙发运动到四屏的购物车，四屏的沙发显示，并跟随购物车一起运动
		2.购物车运动完之后，文字显示，收货地址显示，用到c3的属性，监听运动完之后
*/
$(function($) {
	//初始化插件
	$('#container').fullpage({
		//1.设置背景颜色
		sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
		//2.设置导航栏
		navigation: true,
		//3.设置文字不垂直居中
		verticalCentered: false,
		//设置滚动条滚动时间
		scrollingSpeed: 1000,
		// 3.插件加载完之后，封装往下滚动属性
		afterRender: function() {
			$('.more').on('click', function() {
				$.fn.fullpage.moveSectionDown();
			});
			//
			$('.screen04.load .cart').on('animationend', function() {
				$('.screen04 .address').fadeIn(1000).find('img:last').fadeIn(2000);
				$('.screen04 .text').addClass('show');
			})
		},
		//4.滚动某一个页面的时候的回调
		afterLoad: function(link, index) {
			$('.more').fadeIn();
			$('.section').eq(index-1).addClass('load');
			//监听c3运动完的事件
		},
		//5.离开某个屏的时候
		onLeave: function(index, nextindex, direction) {
			$('.more').fadeOut();
			//从第二屏离开到第三屏
			if(index == 2 && nextindex == 3) {
				$('.section').eq(index-1).addClass('leaved');
			} else if(index == 3 && nextindex == 4) {
				$('.section').eq(index-1).addClass('leaved');
			} else if(index == 5 && nextindex == 6) {
				$('.section').eq(index-1).addClass('leaved');
				$('.box').addClass('show');
			} else if(index == 6 && nextindex == 7) {
				// $('.screen07 .star').addClass('show');
				$('.screen07 .star img').each(function(i, item) {
					// $(item) == $(this);
					$(this).delay(i * 0.5 *1000).fadeIn();
				})
			}
		}

	})



})