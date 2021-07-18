import Vue from 'vue'
import App from './App.vue'
import {
  Slider,
  Cascader
} from 'element-ui'
Vue.config.productionTip = false

Vue.use(Slider)
Vue.use(Cascader)
new Vue({
  render: h => h(App)
}).$mount('#app')
