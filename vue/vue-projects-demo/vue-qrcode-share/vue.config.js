module.exports = {
		devServer: {
			host: "0.0.0.0",
			disableHostCheck: true,
			port: 9000, // 端口号
			https: false, // https:{type:Boolean}
			open: true, //配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar/ 
			hotOnly: true // 热更新
			/* proxy: { //配置自动启动浏览器
				'/weixin': {
					// 本地测试服务器地址
					target: 'https://119.23.74.74:8282', // 接口的域名	
					changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
					ws: false
				}
			} */
		}
}