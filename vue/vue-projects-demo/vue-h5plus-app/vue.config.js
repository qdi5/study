const CompressionPlugin = require('compression-webpack-plugin')
const vConsolePlugin = require('vconsole-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	// 前端静态资源服务地址
	publicPath: process.env.BASE_URL,
	// 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
	assetsDir: 'static',
	// 生产环境是否生成 sourceMap 文件，一般情况不建议打开
	productionSourceMap: false,
	// 如果这个值是一个函数，则会接收被解析的配置作为参数。也可以返回一个被克隆或合并过的配置版本
	configureWebpack: config => {
		//生产and测试环境
		let pluginsPro = [
			new CompressionPlugin({ //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
				filename: '[path].gz[query]',
				algorithm: 'gzip',
				test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$', ),
				threshold: 8192,
				minRatio: 0.8,
			}),
			//	Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
			new BundleAnalyzerPlugin()
		]

		//开发环境
		let pluginsDev = [
			//移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
			new vConsolePlugin({
				filter: [], // 需要过滤的入口文件
				enable: true // 发布代码前记得改回 false
			})
		]

		if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
			// 去掉console
			// config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
			config.plugins = [...config.plugins, ...pluginsPro];
		} else {
			// 为开发环境修改配置...
			config.plugins = [...config.plugins];
		}
		// 为开发环境修改配置...
		// config.plugins = [...config.plugins, ...pluginsDev];
	},
	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('common', resolve('src/common'))
			.set('utils', resolve('src/utils'))
			.set('api', resolve('src/api'))
	},
	devServer: {
		host: "0.0.0.0",
		disableHostCheck: true,
		port: 3001, // 端口号
		https: false, // https:{type:Boolean}
		open: true, //配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar/ 
		hotOnly: true, // 热更新
		proxy: { //配置自动启动浏览器
			'/api': {
				// 本地测试服务器地址
				target: 'http://192.168.1.168:3000', // 接口的域名
				changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
				ws: false,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}