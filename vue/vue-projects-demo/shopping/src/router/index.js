import Vue from 'vue'
import VueRouter from 'vue-router'
import Routers from './router'

Vue.use(VueRouter)

const RouterConfig = {
  // 使用HTML5的History路由模式
  mode: 'history',
  routes: Routers
}
const router = new VueRouter(RouterConfig)
// 跳转路由时，更换页面标题
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

// 跳转路由后，页面自动滚动到顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
export default router
