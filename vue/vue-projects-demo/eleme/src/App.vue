<template>
  <div id="app">
  	<v-header :seller="datas.seller" v-if="flag"></v-header>
  	<div class="tab">
  		<div class="tab-item">
  			<router-link to="/goods">商品</router-link>
  		</div>
  		<div class="tab-item">
  			<router-link to="/ratings">评价</router-link>
  		</div>
  		<div class="tab-item">
  			<router-link to="/seller">商家</router-link>
  		</div>
  	</div>
  	<!-- 把加载过的组件缓存起来 -->
  	<!--<keep-alive></keep-alive>-->
  	<keep-alive>
  		<!-- 这里的v-if='flag' 保证了异步加载的数据完成后，显示子组件;确保后续子组件获取父组件数据时不为空 -->
  		<router-view :datas="datas" ref="abc" v-if="flag"></router-view>
  	</keep-alive>
  </div>
</template>

<script>
import vheader from './components/mods/header.vue';
import axios from 'axios';
export default {
	name: 'App',
	mounted () {
		axios.get('/static/data.json').then(res => {
			this.datas.seller = res.data.seller;
			this.datas.goods = res.data.goods;
			this.datas.ratings = res.data.ratings;
			this.flag = true;
			// $nextTick作用是等dom更新完之后再执行的函数
			this.$nextTick(() => {
				if (typeof this.$refs.abc.scroll !== 'undefined') {
					this.$refs.abc.scroll();
				}
			});
		});
	},
	data () {
		return {
			datas: {
				// 商户信息
				seller: {},
				// 商品数据
				goods: [],
				// 评论
				ratings: []
				
			},
			// 用于标识异步数据加载完成
			flag: false
		};
	},
	components: {
		'v-header': vheader
	}
};
</script>
<style>
.router-link-active {
	color: red!important;
}
</style>
