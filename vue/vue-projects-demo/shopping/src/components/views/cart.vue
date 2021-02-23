<template>
<div class="cart">
  <div class="cart-header">
    <div class="cart-header-title">购物清单</div>
    <div class="cart-header-main">
      <div class="cart-info">商品信息</div>
      <div class="cart-price">商品单价</div>
      <div class="cart-count">数量</div>
      <div class="cart-cost">小计</div>
      <div class="cart-delete">删除</div>
    </div>
  </div>
  <div class="cart-content">
    <div class="cart-content-main" v-for="(item, index) in cartList" :key="index">
      <div class="cart-info">
        <img :src="productDictList[item.id].image" alt="" />
        <span>{{ productDictList[item.id].name }}</span>
      </div>
      <div class="cart-price">
        &yen;{{ productDictList[item.id].cost }}
      </div>
      <div class="cart-count">
        <span class="cart-control-minus" @click="handleCount(index, -1)">-</span>
        {{ item.count }}
        <span class="cart-control-add" @click="handleCount(index, 1)">+</span>
      </div>
      <div class="cart-cost">
        &yen;{{ productDictList[item.id].cost * item.count }}
      </div>
      <div class="cart-delete">
        <span class="cart-control-delete" @click="handleDelete(index)">删除</span>
      </div>
    </div>
    <div class="cart-empty" v-if="!cartList.length">购物车为空</div>
  </div>
  <div class="cart-promotion" v-show="cartList.length">
    <span>使用优惠码</span>
    <input type="text" v-model="promotionCode" />
    <span class="cart-control-promotion" @click="handleCheckCode">验证</span>
  </div>
  <div class="cart-footer" v-show="cartList.length">
    <div class="cart-footer-desc">
              共计<span>{{ countAll }}</span>件商品
    </div>
    <div class="cart-footer-desc">
            应付总额 <span>&yen;{{ costAll - promotion }}</span>
    <br>
    <template v-if="promotion">
      (优惠<span>&yen;{{ promotion }}</span>)
    </template>
    </div>
    <div class="cart-footer-desc">
      <div class="cart-control-order" @click="handleOrder">现在结算</div>
    </div>
  </div>
</div>
</template>

<script>
import productData from '../../mock/product.js'
export default {
  data () {
    return {
      productList: productData,
      // 优惠码
      promotionCode: '',
      // 优惠金额
      promotion: 0
    }
  },
  methods: {
    handleCount (index, count) {
      // 如果数量为1，则不再减
      if (count < 0 && this.cartList[index].count === 1) return
      this.$store.commit('editCartCount', {
        id: this.cartList[index].id,
        count: count
      })
    },
    handleDelete (index) {
      this.$store.commit('deleteCart', this.cartList[index].id)
    },
    // 验证优惠码，我们用vue.js代表正确的优惠码
    handleCheckCode () {
      if (this.promotionCode === '') {
        window.alert('请输入优惠码')
        return
      }
      if (this.promotionCode !== 'vue.js') {
        window.alert('优惠码验证失败')
      } else {
        this.promotion = 500
      }
    },
    // 通知vuex，完成下单
    handleOrder () {
      this.$store.dispatch('buy').then(() => {
        window.alert('购买成功')
      })
    }
  },
  computed: {
    // 购物车列表
    cartList () {
      let shopCart = this.$store.state.cartList
      if (!shopCart || shopCart.length <= 0) {
        shopCart = JSON.parse(window.localStorage.getItem('shopCart'))
        console.log(shopCart)
        this.$store.commit('updateCart', shopCart)
      }
      // 这里不能返回shopCart,只有返回的是vuex里的数据才是响应式的
      return this.$store.state.cartList
    },
    // 购物车字典(由商品id和商品详情组成)
    productDictList () {
      const dict = {}
      this.productList.forEach(item => {
        dict[item.id] = item
      })
      return dict
    },
    // 计算商品的总数量
    countAll () {
      let count = 0
      this.cartList.forEach(item => {
        count += item.count
      })
      return count
    },
    // 计算总金额
    costAll () {
      let cost = 0
      this.cartList.forEach(item => {
        cost += this.productDictList[item.id].cost * item.count
      })
      return cost
    }
  }
}
</script>

<style>
  .cart {
    margin: 32px;
    background: #fff;
    border: 1px solid #dddee1;
    border-radius: 10px;
  }
  .cart-header-title {
    padding: 16px 32px;
    border-bottom: 1px solid #dddee1;
    border-radius: 10px 10px 0 0;
    background: #f8f8f9;
  }
  .cart-header-main {
    padding: 8px 32px;
    overflow: hidden;
    border-bottom: 1px solid #dddee1;
    background: #eee;
    overflow: hidden;
  }
  .cart-empty {
    text-align: center;
    padding: 32px;
  }
  .cart-header-main div {
    text-align: center;
    float: left;
    font-size: 14px;
  }
  div.cart-info {
    width: 60%;
    text-align: left;
  }
  .cart-price,
  .cart-count,
  .cart-cost,
  .cart-delete {
    width: 10%;
  }
  .cart-content-main {
    padding: 0 32px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-bottom: 1px dashed #e9eaec;
    overflow: hidden;
  }
  .cart-content-main div {
    float: left;
  }
  .cart-content-main img {
    width: 40px;
    height: 40px;
    position: relative;
    top: 10px;
  }
  .cart-control-minus,
  .cart-control-add {
    display: inline-block;
    margin: 0 4px;
    width: 24px;
    height: 24px;
    line-height: 22px;
    text-align: center;
    background: #f8f8f9;
    border-radius: 50%;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    cursor: pointer;
  }
  .cart-control-delete {
    cursor: pointer;
    color: #2d8cf0;
  }
  .cart-promotion {
    padding: 16px 32px;
  }
  .cart-control-promotion,
  .cart-control-order {
    display: inline-block;
    padding: 8px 32px;
    border-radius: 6px;
    background: #2d8cf0;
    color: #fff;
    cursor: pointer;
  }
  .cart-control-promotion {
    padding: 2px 6px;
    font-size: 12px;
    border-radius: 3px;
  }
  .cart-footer {
    padding: 32px;
    text-align: right;
  }
  .cart-footer-desc {
    display: inline-block;
    padding: 0 16px;
  }
  .cart-footer-desc span {
    color: #f2352e;
    font-size: 20px;
  }
</style>
