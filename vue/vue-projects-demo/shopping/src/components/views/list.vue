<template>
<div v-show="list.length">
  <div class="list-control">
    <div class="list-control-filter">
      <span>品牌:</span>
      <span class="list-control-filter-item" :class="{on: item === filterBrand}" v-for="item in brands" @click="handleFilterBrand(item)" :key="item">
        {{ item }}
      </span>
    </div>
    <div class="list-control-filter">
      <span>颜色:</span>
      <span class="list-control-filter-item" :class="{on: filterColor.indexOf(item) > -1}" v-for="item in colors" @click="handleFilterColor(item)" :key="item">
        {{ item }}
      </span>
    </div>
    <div class="list-control-order">
      <span>排序：</span>
      <span class="list-control-order-item" :class="{on: order === ''}" @click="handleOrderDefault">默认</span>
      <span class="list-control-order-item" :class="{on: order === 'sales'}" @click="handleOrderSales">
                      销量
        <template v-if="order === 'sales'">↓</template>
      </span>
      <span class="list-control-order-item" :class="{on: order.indexOf('cost') > -1}" @click="handleOrderCost">
                价格
      <template v-if="order === 'cost-asc'">↑</template>
      <template v-if="order === 'cost-desc'">↓</template>
      </span>
    </div>
  </div>
  <Product v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></Product>
  <div class="product-not-found" v-show="!filteredAndOrderedList.length">暂无相关商品</div>
</div>
</template>

<script>
// 导入商品简介组件
import Product from '../product.vue'

export default {
  components: { Product },
  data () {
    return {
      // 排序依据，可选值为： sales(销量)、cost-desc(价格降序)、cost-asc(价格升序)
      order: '',
      // 过滤品牌
      filterBrand: '',
      // 过滤颜色
      filterColor: []
    }
  },
  methods: {
    // 默认排序
    handleOrderDefault () {
      this.order = ''
    },
    // 销量排序
    handleOrderSales () {
      this.order = 'sales'
    },
    // 价格排序(升序或降序)
    handleOrderCost () {
      if (this.order === 'cost-desc') {
        this.order = 'cost-asc'
      } else {
        this.order = 'cost-desc'
      }
    },
    // 筛选品牌
    handleFilterBrand (brand) {
      if (this.filterBrand === brand) {
        this.filterBrand = ''
      } else {
        this.filterBrand = brand
      }
    },
    // 筛选颜色
    handleFilterColor (color) {
      // 如果当前选中了，则从数组里面删除
      let arrayIndex = this.filterColor.indexOf(color)
      if (arrayIndex !== -1) {
        this.filterColor.splice(arrayIndex, 1)
      } else {
        this.filterColor.push(color)
      }
    }
  },
  computed: {
    // 商品列表
    list () {
      // 从Vuex获取商品列表数据
      return this.$store.state.productList
    },
    // 品牌数据
    brands () {
      return this.$store.getters.getBrandsData
    },
    // 颜色数据
    colors () {
      return this.$store.getters.getColorsData
    },
    // 根据order的值判断是否需要过滤和排序
    filteredAndOrderedList () {
      // 复制原有数据(避免影响原有的商品列表数据)
      let list = [...this.list]
      // 按品牌过滤
      if (this.filterBrand !== '') {
        list = list.filter(item => item.brand === this.filterBrand)
      }
      // 按颜色过滤
      if (this.filterColor.length > 0) {
        list = list.filter(item => this.filterColor.indexOf(item.color) !== -1)
      }
      // 排序
      if (this.order !== '') {
        if (this.order === 'sales') {
          list = list.sort((a, b) => b.sales - a.sales)
        } else if (this.order === 'cost-desc') {
          list = list.sort((a, b) => b.cost - a.cost)
        } else if (this.order === 'cost-asc') {
          list = list.sort((a, b) => a.cost - b.cost)
        }
      }
      return list
    }
  },
  mounted () {
    // 初始化时， 通过Vuex的actions请求商品列表数据
    this.$store.dispatch('getProductList')
  }
}
</script>

<style scoped>
  .product-not-found {
    text-align: center;
    padding: 32px;
  }
  .list-control {
    background: #fff;
    border-radius: 6px;
    margin: 16px;
    padding: 16px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  }
  .list-control-filter {
    margin-bottom: 16px;
  }
  .list-control-filter-item,
  .list-control-order-item {
    cursor: pointer;
    display: inline-block;
    border: 1px solid #e9eaec;
    border-radius: 4px;
    margin-right: 6px;
    padding: 2px 6px;
  }
  .list-control-filter-item.on,
  .list-control-order-item.on {
    background: #f2352e;
    border: 1px solid #f2352e;
    color: #fff;
  }
</style>
