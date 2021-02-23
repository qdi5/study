import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  // 地理定位
  {
    path: '/geolocation',
    name: 'geolocation',
    component: () => import( /* webpackChunkName: "geolocation" */ '../views/geolocation.vue')
  },
  // 微信分享
  {
    path: '/share',
    name: 'share',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "share" */ '../views/share.vue')
  },
  // 上传图片
  {
    path: '/uploader',
    name: 'uploader',
    component: () => import( /* webpackChunkName: "uploader" */ '../views/uploader.vue')
  },
  // 下载网络资源
  {
    path: '/downloader',
    name: 'downloader',
    component: () => import( /* webpackChunkName: "downloader" */ '../views/downloader.vue')
  },
  // ajax
  {
    path: '/xhr',
    name: 'xhr',
    component: () => import( /* webpackChunkName: "xhr" */ '../views/xhr.vue')
  },
  // 扫码
  {
    path: '/barcode',
    name: 'barcode',
    component: () => import( /* webpackChunkName: "barcodescan" */ '../views/barcode.vue')
  },
  // 支付
  {
    path: '/payment',
    name: 'payment',
    component: () => import( /* webpackChunkName: "payment" */ '../views/payment.vue')
  },
  // 设备通讯功能
  {
    path: '/messaging',
    name: 'messaging',
    component: () => import( /* webpackChunkName: "messaging" */ '../views/messaging.vue')
  },
  // 摄像头
  {
    path: '/camera',
    name: 'camera',
    component: () => import( /* webpackChunkName: "camera" */ '../views/camera.vue')
  },
  // 地图
  {
    path: '/maps',
    name: 'maps',
    component: () => import( /* webpackChunkName: "maps" */ '../views/maps.vue')
  }


]

const router = new VueRouter({
  routes
})

export default router