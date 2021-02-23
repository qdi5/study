/* (function (root, docElm) {
	let html = docElm.documentElement
	let dpr = window.devicePixelRatio
	// 设置根元素的fontSize
	function setRootFontSize (designWidth) {
		debugger
		let deviceWidth = html.clientWidth
		let size = (deviceWidth / designWidth) * 100
		console.log('设置根元素的font-size：', size)
		setFontSize (html, size)
	}
	function setFontSize (elem, size) {
		elem.style.fontSize = size + 'px'
	}
	function setBodyFontSize () {
		let body = docElm.body
		let size = dpr * 12
		if (body) {
			setFontSize (body, size)
		}
	}
	
	var handleResizeEvent = _.debounce(function (dw) {
		    console.log('dw:', dw)
			var timer = setTimeout(function () {
				setRootFontSize (dw)
				clearTimeout(timer)
			}, 20)
		}, 20)
		
	function adapter (designWidth) {
		let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
		docElm.addEventListener('DOMContentLoaded', function () { 
			setRootFontSize(designWidth) 
			setBodyFontSize ()
		}, false)
		root.addEventListener(resizeEvt, function (e) { 
			console.log('触发resize事件', e)
			handleResizeEvent(designWidth) 
		}, false)
		root.addEventListener('pageshow', function (e) {
			console.log('persisted:', e.persisted)
			if (e.persisted) {
				setTimeout(function () {
					setRootFontSize (designWidth)
				})
			}
		}, false)
	}
	// 如果dpr大于2
	
	root.adapter = adapter
})(window, document) */
let adapter = (function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	function setRemUnit (designWidth) {
		var clientWidth = docEl.clientWidth;
		if (!clientWidth) return;
		docEl.style.fontSize = 100 * (clientWidth / designWidth) + 'px';
	}	
    var recalc = function(designWidth) {
		setRemUnit (designWidth)
		win.addEventListener(resizeEvt, function () {
			setRemUnit(designWidth) 
		}, false)
		
		doc.addEventListener('DOMContentLoaded',  function () {
			setRemUnit(designWidth) 
		}, false)
    };
	return recalc
})(document, window);