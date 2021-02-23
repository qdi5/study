import axios from 'axios'
import global from './index'

// 基本配置
const options = {
  baseUrl: global.backendBaseUrl
}
console.log('options.baseUrl:', options.baseUrl)
// ajax通用配置
let request = axios.create({
  baseURL: options.baseUrl,
	timeout: 1000 * 60,
  withCredentials: true
})

// 添加响应拦截器
request.interceptors.response.use(res => {
  return res.data
}, error => {
  return Promise.reject(error)
})
export { request, axios }
export default (Vue, options) => {
  Vue.prototype.$http = {
    get: request.get,
    post: request.post,
    put: request.put,
    delete: request.delete
		// 直接使用axios的方法，不会触发拦截器???
  }
}
