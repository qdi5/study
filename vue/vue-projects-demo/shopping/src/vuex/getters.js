import Util from '../libs/util'

export default {
  // 获取品牌数据
  getBrandsData: state => {
    const brands = state.productList.map(item => item.brand)
    return Util.array.getUniqueArray(brands)
  },
  // 获取颜色数据
  getColorsData: state => {
    const colors = state.productList.map(item => item.color)
    return Util.array.getUniqueArray(colors)
  }/* ,
  // 保存购物车数据到本地
  saveLocalCart: state => {
    let cartList = state.cartList
    let cart = window.localStorage.getItem('cart')
    let storage = window.localStorage
    let localCartList = []
    console.log('保存到本地')
    // 如果vuex里有购物车数据，则显示vuex里的购物车数据
    if (cartList.length > 0) {
      storage.setItem('cart', JSON.stringify(cartList))
      return cartList
    } else if (cart) {
      localCartList = JSON.parse(cart)
      this.$store.commit('updateCart', localCartList)
      return localCartList
    } else {
      return []
    }
  } */
}
