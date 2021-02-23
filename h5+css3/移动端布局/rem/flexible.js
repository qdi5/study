(function flexible (window, document) {
	// 获取文档的根元素（这里是html）
	let docEl = document.documentElement
	// 设备像素比
	let dpr = window.devicePixelRatio || 1
	// 设置body的fontSize
	function setBodyFontSize () {
		if (document.body) {
			document.body.style.fontSize = (12 * dpr) + 'px'
		} else {
			document.addEventListener('DOMContentLoaded', setBodyFontSize)
		}
	}
	// 设置 1rem的px大小
	function setRemUnit () {
		let rem = docEl.clientWidth / 10
		docEl.style.fontSize = rem + 'px'
	}
	setRemUnit()
	window.addEventListener('resize', setRemUnit)
	window.addEventListener('pageShow', function (e) {
		// 表示网页是否来自缓存
		if (e.persisted) {
			setRemUnit()
		}
	})
	if (dpr >= 2) {
		let fakeBody = document.createElement('body')
		let testElement = document.createElement('div')
		testElement.style.border = '.5px solid transparent'
		fakeBody.appendChild(testElement)
		docEl.appendChild(fakeBody)
		// offsetHeight 返回元素的像素高度（包括垂直padding和border）
		if (testElement.offsetHeight === 1) {
			docEl.classList.add('hairlines')
		}
		docEl.removeChild(fakeBody)
	}
})(window, document)