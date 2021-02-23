// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Routers from './router'
import iView from 'iview'
import 'ivew-css'
import './less/style.less'


Vue.use(VueRouter)
Vue.use(iView)

const RouterConfig = {
	routes: Routers 
}

const router = new VueRouter(RouterConfig);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
