$(function($) {
	// 轮播图
	banner();
	// 标签页
	taps();

	// 初始化提示框
	 $('[data-toggle="tooltip"]').tooltip();

})


// 轮播图函数
var banner = function() {
	// 思路
	/**
		1.发送ajax获取到数据
		2.得到数据，渲染页面
			引入模板
		  2.1.准备模板
		  2.2.准备数据
		  2.3.根据浏览器的窗口的宽度显示轮播图（window.outerWidth()）
		  2.4.把内容动态渲染到页面上（html()）
		3.开发者测试（window.resize事件）
		4.移动端手势滑动（touch事件）

	*/
	// ajax封装
	var getData = function(callback) {
		if(window.data) {
			callback && callback(window.data);
			return;
		}
		$.ajax({
			type: 'get',
			url: 'js/data.json',
			data: {},
			dataType: 'json',
			success: function(data) {
				window.data = data;
				callback && callback(window.data);
			}
		})
	}
	var render = function() {
		getData(function(data) {
			// 判断现在的屏幕大小
			var isMoble = $(window).width() < 768 ? 1 : 0;
			// 小圆点
			var pointHtml = template('point', {list: data});
			// 轮播的图片
			var imageHtml = template('image', {list:data, isM: isMoble});
			$('.carousel-indicators').html(pointHtml);
			$('.carousel-inner').html(imageHtml);
		})
	}
	render();
	// 测试
	$(window).on('resize', function() {
		render();
	})

	// 移动端手势滑动
	var isMove = false;
	var startX = 0;
	var distanceX = 0;
	$('.wjs_banner').on('touchstart', function(e) {
		startX = e.originalEvent.touches[0].clientX;
	}).on('touchmove', function(e) {
		isMove = true;
		moveX = e.originalEvent.touches[0].clientX;
		distanceX = moveX - startX;
	}).on('touchend', function(e) {
		if(isMove && Math.abs(distanceX) > 50) {
			if(distanceX > 0) {
				// 上一张
				$('.carousel').carousel('prev');
			}
			$('.carousel').carousel('next');
		}

		// 重置参数
		isMove = false;
		startX = 0;
		distanceX = 0;
	})
}

// 标签页
var taps = function() {
// 思路：当屏幕时小屏设备的时候让标签做区域滚动
	// 使用inscoll插件
	// 引入插件
	// 获取到标签的长度，动态添加给子盒子
	var $navTab = $('.nav-tabs-parent .nav-tabs');
	var $lis = $navTab.find('li');

	var widthNum = 0;
	$lis.each(function(index, item) {
		widthNum += $(this).outerWidth(true);
	})

	$navTab.width(widthNum);
	console.log($navTab.width());

	// 初始化插件，使用的DOM元素

	new IScroll($('.nav-tabs-parent')[0], {
		scrollX: true,
		scrollY: false
	})

}