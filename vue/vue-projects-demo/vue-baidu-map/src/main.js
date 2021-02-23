import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BaiduMap from 'vue-baidu-map'
import 'normalize.css'
import '../common/fonts/iconfont.css'

Vue.config.productionTip = false
Vue.use(BaiduMap, {
  ak: '81cBGuZfSCsA47PRXnXTW3ihYTVpiGvn'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
