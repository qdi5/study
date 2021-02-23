import axios from 'axios'

const Util = {
  url: {
    apiURL: {
      baseURL: 'http://127.0.0.1:8080'
    }
  },
  // 命名空间函数
  namespace: function (name, currentSpace) {
    var current = currentSpace || {}
    var parts = name.split('.')
    for (let i = 0; i < parts.length; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {}
      }
      current = current[parts[i]]
    }
  }
}
Util.namespace('ajax', Util)
Util.ajax = axios.create({
  baseURL: Util.url.apiURL.baseURL
})
Util.ajax.interceptors.response.use(res => {
  return res.data
})
Util.namespace('array', Util)
Util.array.getUniqueArray = function (array) {
  const res = []
  const json = {}
  for (let i = 0; i < array.length; i++) {
    const _self = array[i]
    if (!json[_self]) {
      res.push(_self)
      json[_self] = 1
    }
  }
  return res
}
export default Util
