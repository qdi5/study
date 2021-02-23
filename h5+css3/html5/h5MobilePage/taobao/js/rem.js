/*
  rem适配的原理：
  使根元素的fontSize设置为设备独立像素与设计稿之间的比值，用rem作为单位，由于rem是相对于html的fontsize的值，相当于将设计稿进行等比例缩放;设计稿里的px指无需转换；
 * 
 * */
var __DESIGN_WIDTH__ = 750; // 默认设计稿宽度
var adapator = (function(){
	
	/**
	 * 
	 * @param {Number} designWidth: 设计稿宽度
	 */
	function setFontSize (designWidth) {
		// 获取设备浏览器的可视宽度
		var htmlElement = document.documentElement;
		var viewport = htmlElement.getBoundingClientRect().width;
		var fontSize = viewport / designWidth;
		htmlElement.style.fontSize = 100 * fontSize + 'px';
	}
	
	return {
		setFontSize: setFontSize
	}
})();
document.addEventListener('DOMContentLoaded', function() {
	adapator.setFontSize(__DESIGN_WIDTH__);
}, false);

var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
window.addEventListener(resizeEvt, function(){
	// 防止resize事件太快，来不及改变字体
	var time = setTimeout(function() {
		adapator.setFontSize(__DESIGN_WIDTH__);
		clearTimeout(time);
	}, 50);
}, false);

// 页面初始化，以及重新加载同一个页面会触发pageshow事件
window.addEventListener('pageshow', function(e){
	console.log(e.persisted);
	// 如果是缓存状态， 则重新计算
	if (e.persisted) {
		var timer = setTimeout(function() {
			adapator.setFontSize(__DESIGN_WIDTH__);
		}, 50);
	}
}, false);

// 禁止多指网页缩放
window.onload = function () { 
	document.addEventListener("touchstart", function (event) { 
			if (event.touches.length > 1) { 
				event.preventDefault(); 
			}
		}
	);
};