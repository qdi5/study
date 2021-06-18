import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/page2-1.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/page2-2',
    name: 'page2-2',
    component: () => import(/* webpackChunkName: "page2-2" */ './views/page2-2.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
