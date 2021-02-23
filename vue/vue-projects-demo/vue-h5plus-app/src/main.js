import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'common/js/fastclick'
import 'common/stylus/base.stylus'
import 'common/fonts/iconfont.css'
import 'common/stylus/common.css'
import PlusReady from 'common/js/h5plusReady'

window.FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.use(PlusReady)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')