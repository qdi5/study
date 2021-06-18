import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/page1-1.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "page1-2" */ './views/page1-2.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
