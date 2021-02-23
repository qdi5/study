// 添加一些功能函数
export default {
  // 添加商品列表
  setProductList (state, data) {
    state.productList = data
  },
  // 添加到购物车
  addCart (state, id) {
    // 先判断购物车是否已有，如果有，数量+1
    const isAdded = state.cartList.find(item => item.id === id)
    if (isAdded) {
      isAdded.count++
    } else {
      state.cartList.push({
        id: id,
        count: 1
      })
    }
    window.localStorage.setItem('shopCart', JSON.stringify(state.cartList))
  },
  // 修改商品数量
  editCartCount (state, payload) {
    const product = state.cartList.find(item => item.id === payload.id)
    product.count += payload.count
    window.localStorage.setItem('shopCart', JSON.stringify(state.cartList))
  },
  // 删除商品
  deleteCart (state, id) {
    const index = state.cartList.findIndex(item => item.id === id)
    state.cartList.splice(index, 1)
    window.localStorage.setItem('shopCart', JSON.stringify(state.cartList))
  },
  // 更改购物车的数据
  updateCart (state, shopCart) {
    state.cartList = shopCart
  },
  // 清空购物车
  emptyCart (state) {
    state.cartList = []
    window.localStorage.removeItem('shopCart')
  }
}
