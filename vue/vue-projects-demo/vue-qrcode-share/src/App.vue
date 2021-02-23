<template>
  <div id="app">
    <div id="nav">
	  <div id="canvas"></div>
	  <button @click="makeScreenshot">screenshot</button>
	  <button @click="wxShare">分享</button>
    </div>
    <router-view/>
  </div>
</template>
<script>
	import QRcode from './utils/qrcode/qrcode'
	import html2canvas from 'html2canvas'
	import axios from 'axios'
	let wx = require('weixin-js-sdk')
	let url = 'https://xcx.szwoku.com'
	export default {
		data() {
			return {}
		},
		created() {
			axios.get('/weixin/sign',
			    {
			      params:{
			        url
			      }
			    }).then((res) => {
					console.log('微信登录成功了么？', res)
					var map = res.map;
					wx.config({
					  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					  appId: 'wx6a2c20af85a588d6', // 必填，公众号的唯一标识
					  timestamp: map.timestamp, // 必填，生成签名的时间戳
					  nonceStr: map.nonceStr, // 必填，生成签名的随机串
					  signature: map.signature,// 必填，签名
					  jsApiList: ['scanQRCode','chooseImage','previewImage','uploadImage','updateAppMessageShareData'] // 必填，需要使用的JS接口列表
					})
			  })
		},
		mounted() {
			console.log('QRcode:\n',QRcode)
			this.QRcode =new QRcode(document.getElementById("canvas"), {
			text: "http://appwx.szwoku.com/#/login?uid=123456",
			width: 128,
			height: 128,
			colorDark : "#000000",
			colorLight : "#ffffff",
			correctLevel : QRcode.CorrectLevel.H
			});
			wx.ready(function() {
				console.log('微信公众号配置成功')
			})
		},
		methods: {
			makeScreenshot() {
				html2canvas(document.body).then(function(canvas) {
				    document.body.appendChild(canvas);
				});
			},
			// 
			wxShare() {
				wx.updateAppMessageShareData({ 
				    title: '什么鬼', // 分享标题
				    desc: '哈哈哈哈', // 分享描述
				    link: 'https://xcx.szwoku.com/#/login', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				    imgUrl: 'https://xcx.szwoku.com/static/img/head.jpg', // 分享图标
				    success: function () {
				      // 设置成功
					  console.log('分享成功回调')
				    }
				})
			}
		}
	}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
