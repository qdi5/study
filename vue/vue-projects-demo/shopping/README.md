# shopping

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

一、src目录说明
1、components
views>list.vue 列表组件
views>productDetail.vue 商品详情页组件
views>cart.vue 购物车组件
product.vue  商品简介组件  
2、libs
util.js 常用工具库
3、mock
product.js 模拟的本地商品数据
4、router
路由目录
index.js 路由全局配置
router.js 路由的跳转具体配置
5、vuex
vuex配置目录，管理组件间的数据状态与传输
index.js 实例化vuex组件，配置vuex
state.js 存储数据的vuex对象
mutations.js 操作state.js里面的数据
getters.js 可以类比于vue里面的computed实时计算(这里计算的是vuex里面的数据)
actions.js 操作mutations.js里面的方法(常常用于操作异步的任务)
二、vuex使用的情况
Vuex的getters和组件内的computed很相似。那么到底什么时候把数据存在Vuex中恰当呢，可以结合以下几点综合考虑：
1、如果数据还有其他组件复用，建议放在Vuex。
2、如果需要跨多级组件传递数据，建议放在Vuex。
3、需要持久化的数据（如登录后用户的信息），建议放在Vuex。
将数据放在组件内维护的情况：
4、跟当前业务组件强相关的数据(只在当前组件有用)，可以放在组件内。
