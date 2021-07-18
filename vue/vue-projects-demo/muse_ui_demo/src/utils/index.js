const env = process.env.NODE_ENV
const UA = window.navigator.userAgent.toLowerCase()
export const deviceIsWindowsPhone = UA.indexOf("Windows Phone") >= 0
export const deviceIsAndroid = UA.indexOf('Android') > 0 && !deviceIsWindowsPhone
export const deviceIsIOS = /ip(ad|hone|od)|ios/i.test(UA) && !deviceIsWindowsPhone

export default {
	// 环境变量（区分开发模式）
	env,
	// 后端请求根路径
	backendBaseUrl: env === 'development' ? '/' : 'http://136.wuzhe.online'
}
