import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
console.log('process.env.BASE_URL:', process.env.BASE_URL)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
	  // 路由代码分割；会生成一个单独的about.hash.js的文件；当路由访问的时候会延迟加载进来
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
