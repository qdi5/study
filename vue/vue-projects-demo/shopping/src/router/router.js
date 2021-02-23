
const Routers = [
  {
    path: '/list',
    meta: {
      title: '商品列表'
    },
    // 这里是动态加载list.vue组件？
    component: (resolve) => require(['../components/views/list.vue'], resolve)
  },
  {
    path: '/product/:id',
    meta: {
      title: '商品详情页'
    },
    component: (resolve) => require(['../components/views/productDetail.vue'], resolve)
  },
  {
    path: '/cart',
    meta: {
      title: '购物车'
    },
    component: (resolve) => require(['../components/views/cart.vue'], resolve)
  },
  {
    path: '/',
    redirect: '/list'
  }
]
export default Routers
