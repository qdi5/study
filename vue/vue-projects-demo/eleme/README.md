# lesson07

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

#代码规范
1、注释和内容之间一定要有个空格
2、对象属性的后面要有空格
3、函数两边都是要有空格 for if
4、定义的变量必须要使用
5、不能加分号
6、缩进是2个空格

#src目录说明
1、components
goods.vue: 商品组件(商品展示页面);
ratings.vue: 商品组件(评价展示页面);
seller.vue: 商家组件(商家展示页面);

components>mods目录：
cartControl.vue: 购物车加减按钮组件;
foodDetail.vue: 商品详情页组件;
header.vue: 弹框(弹出商家信息的组件);
ratingStar: 评分组件(五星好评组件);
shopCart.vue: 商品页面底部的购物车组件;
data.js: 公共数据(这里主要是商家优惠图标数据);

2、static: 存放静态资源目录



