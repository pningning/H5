// 1.为什么没有用jquery
 //jq兼容性特别好， 对ie浏览器做了兼容处理
 // 更多的代码去做这些事情，体积会增大
 // 移动端浏览器都是高版本浏览器，没有ie、
 // 不需要处理这样额兼容性问题，如果用了，会造成页面加载变慢
 // 最好选择不用，使用h5的方式来解决，或者使用比jq更轻量的库
 // zepto.js
 // $(function(){}) 等页面加载完成
 // 下面的入口函数，是等页面所有都加载完成之后
 window.onload = function() {

 	// 搜索
 	search();
 	// 轮播图
 	banner();
 	// 倒计时
 	downTime();
 }


 var search = function() {
 	// 默认位置在顶部显示透明度0
 	// 在轮播图位置滑动的时候，透明度改变
 	// 在轮播图以外滚动额时候透明度保持不变
 	var searchBox = document.querySelector('.jd_search_box');
 	var banner = document.querySelector('.jd_banner');
 	var height = banner.offsetHeight;

 	// 监听页面滚动事件

 	window.onscroll = function() {
 		// 获取页面卷曲的距离
 		var top = window.pageYoffset || document.documentElement.scrollTop ||document.body.scrollTop;

 		if(top < height) {
 			// 轮播图内
 			opacity = top / height * 0.85;
 		}else {
 			opacity = 0.85
 		}

 		searchBox.style.backgroundColor = 'rgba(201, 21, 35, '+ opacity +')';
 	}
 }
/*
	touch事件
	touchstart 当手指触摸时触发
	touchmove 当手机触摸屏幕然后来回的滑动时触发
	touchend 当手指离开屏幕的时候触发

	下面是被迫中止了滑动
	touchcancel 被迫终止了滑动，系统终止滑动，
*/

/*
	触摸点集合
	changedTouches 改变后的触摸点集合（从无到右，滑动过程，从有到无）
	trangetTouches 目标元素的触摸点集合
	touches 页面上所有的触摸点集合
	注意：如果在touchend事件需要使用触摸点坐标时需要使用changedTouches集合

	做滑动的坐标
	pageX
	pageY
	相对页面的坐标
	clientX
	clientY
	相对视口的坐标，视口大小跟页面大小一致
	screenX
	screenY
	相对屏幕的坐标

	总结： 使用坐标来监听位置的改变多少，用一组

*/
  var banner = function() {
  	/*
		1.自动轮播 用到定时器，动画c3过渡，转换，判断索引实现
		2.点随着轮播图变换 也是判断索引，改变当前样式，classList
		3。能随着手指来回滑动 tauch触摸相关事件
		4.滑动的时候，如果距离不足，吸附效果，(过渡)
			如果距离足够，图片切换，上一张或下一张 (过渡)
  	*/
  	var banner = document.querySelector('.jd_banner');
  	var width = banner.offsetWidth;
  	console.log(width);
  	var imageBox = banner.querySelector('ul:first-child');
  	var pointBox = banner.querySelector('ul:last-child');
  	var points = pointBox.querySelectorAll('li');
  	//函数封装
  	// 添加过渡
  	function addTransition() {
  		imageBox.style.transition = 'all 0.2s';
  		imageBox.style.webkitTransition = 'all 0.2s';
  	}
  	// 移除动画
  	function removeTransition() {
  		imageBox.style.transition = 'none';
  		imageBox.style.webkitTransition = 'none';
  	}
  	// 添加定位
  	function setTranslateX(translateX) {
  		imageBox.style.transform = 'translateX('+ translateX +'px)';
  		imageBox.style.webkitTransform = 'translateX('+ translateX +'px)';
  	}

  	// 索引，当前的
  	var index = 1;
  	var timer = setInterval(function() {
  		index++;
  		// 在移动开发js功能的时候处理兼容性问题，使用方法如下
  		addTransition();
  		// 设置图片容器的定位
  		setTranslateX(-index * width);
  	}, 3000)
  	// 等动画结束之后再去判断索引，动画的连贯性
  	imageBox.addEventListener('transitionend',function() {
  		// 自动轮播的无缝处理
  		if(index >= 9) {
  			index = 1;
  			// 清除之前加的过渡，瞬间过
  			removeTransition();
  			// 做定位
  			setTranslateX(-index * width);
  		}else if(index <= 0) {
  			// 瞬间定位到第八张，保证图片滑动无缝处理
  			index = 8;
  			// 清过渡
  			removeTransition();
  			// 做定位
  			setTranslateX(-index * width);
  		}
  		setPoint();
  	});

  	var setPoint = function() {
  		// 对应的点所有为0-7;
  		for(var i = 0; i < points.length; i++) {
  			var obj = points[i];

  			obj.classList.remove('now');
  		}
  		points[index - 1].classList.add('now');
  	}

  	// 监听触摸事件
  	// 触摸到屏幕
  	var startX = 0;//触摸时的坐标
  	var distanceX = 0; //移动位置的改变
  	var isMove = false;//是否移动了

  	imageBox.addEventListener('touchstart', function(e){
  		startX = e.touches[0].clientX;
  		// 清除定时器
  		clearInterval(timer);
  	})

  	// 触摸移动
  	imageBox.addEventListener('touchmove', function(e){
  		isMove = true;
  		var moveX = e.touches[0].clientX;
  		distanceX = moveX - startX;

  		// 根据移动位置的改变让轮播图改变
  		addTransition();
  		// 当前要移动的距离，等于之前移动的距离，加上位置发生改变的距离
  		translateX = -index * width + distanceX;
  		setTranslateX(translateX);
  	})
  	// 触摸离开
  	imageBox.addEventListener('touchend', function(){
  		// 移动的距离，以轮播图宽度的1/3做参考
  		if(Math.abs(distanceX) < width / 3) {
  			// 吸附，以动画的形式，变回原来的定位
  			addTransition();
  			setTranslateX(-index * width);

  		}else {
  			// 切换
  			if(distanceX > 0) {
  				//右滑，上一张
  				// 先加动画。，在移动
  				index--;
  			}else{
  				// 左滑，下一张
  				index++;
  			}
  		}
  		addTransition();
  		setTranslateX(-index * width);

  		// 初始化变量
  		startX = 0;
  		distanceX = 0;
  		inMove = false;
  		clearInterval(timer);
  		// 开启定时器
  		var timer = setInterval(function() {
  			index++;
  			addTransition();
  			setTranslateX(-index * width);
  		},3000)
  	})

 }

  var downTime = function() {

  	// 假设倒计时
    var time = 3 * 60 * 60;
    var span = document.querySelectorAll('.sk_time span');
  	var timer = setInterval(function(){
      time--;
      var h = Math.floor(time / 3600);
      var m = Math.floor(time % 3600 / 60);
      var s = Math.floor(time % 60);
      span[0].innerHTML = Math.floor(h / 10);
      span[1].innerHTML = h % 10;

      span[3].innerHTML = Math.floor(m / 10);
      span[4].innerHTML = m % 10;

      span[6].innerHTML = Math.floor(s / 10);
      span[7].innerHTML = s % 10;

      if(time <= 0) {
        clearInterval(timer);
      }
    }, 1000)
 }