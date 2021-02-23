import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from 'utils/request'

console.log('环境变量VUE_APP_API_CLIENT：', process.env.VUE_APP_API_CLIENT)
process.env.VUE_APP_Mock && require('mock/mock')

Vue.config.productionTip = false

Vue.use(request)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
