

function support (feature) {
	Modernizr.on('audio', function( result ) {
	  console.log('result:', result) 
	  if (result) {
	    alert(feature)
	  } else {
	    alert(feature)
	  }
	});
}
if (Modernizr.hasEvent('devicelight')) {
	alert('支持click事件')
} else {
	alert('不支持click事件')
}
let query = Modernizr.mq('(max-width: 375px)')
if (query) {
	alert('浏览器窗口宽度小于375px')
}
console.log('Modernizr: \n', Modernizr)