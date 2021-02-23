import productData from '../mock/product.js'

// 这里也是添加一个功能函数，一般用于处理异步任务
export default {
  // 请求商品列表
  getProductList (context) {
    // 真实环境通过Ajax获取， 这里用异步模拟
    setTimeout(() => {
      context.commit('setProductList', productData)
    })
  },
  // 购买
  buy (context) {
    // 真实环境下应该通过Ajax提交购买请求后再清空购物车列表
    return new Promise(resolve => {
      setTimeout(() => {
        context.commit('emptyCart')
        resolve()
      }, 500)
    })
  }
}
