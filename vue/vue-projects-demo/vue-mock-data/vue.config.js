let path = require('path')

function resolve(dir) {
	let joinDir = path.join(__dirname, dir)
	let resolveDir = path.resolve(__dirname, dir)
	console.log('join:\n', joinDir)
	console.log('resolve:\n', resolveDir)
	return joinDir
}

module.exports = {
	publicPath: 'vue-mock-data',
	chainWebpack: config => {
		const apiClient = process.env.VUE_APP_API_CLIENT
		config.resolve.alias
		.set('utils', resolve('src/utils'))
		.set('mock', resolve('mock'))
		.set('api-client', resolve(`src/api/${apiClient}`))
	},
	devServer: {
			host: "0.0.0.0",
			disableHostCheck: true,
			port: 3007, // 端口号
			https: false, // https:{type:Boolean}
			open: true, //配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar/ 
			hotOnly: true // 热更新
			
		}
}