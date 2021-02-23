import axios from 'axios'

const request = axios.create({
  baseURL: "/", // 因为我本地做了反向代理
  timeout: 10000,
  responseType: "json",
  withCredentials: true // 是否允许带cookie这些
})

export {request, axios}
// 匿名插件？？？
export default (Vue, optins) => {
	Vue.prototype.$http = request
}