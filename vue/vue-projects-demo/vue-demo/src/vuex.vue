<template>
	<div>
		<ul>
			<li v-for="item in shop" v-bind:key="item.title">
				<p>{{ item }}</p>
				<p>购买数量 <button @click="addCart(item)">购买</button></p>
				<p>
					<button @click="addCart(item)">+</button>
					<button @click="minusCart(item)">-</button>
				</p>
			</li>
		</ul>
		<shop-cart :cart="calcCart"></shop-cart>
	</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import shopCart from './shopCart';
export default {
	data () {
		return {
			shop: [
				{
					title: '电脑',
					price: 10000
				},
				{
					title: '手机',
					price: 3000
				},
				{
					title: '冰箱',
					price: 2800
				}
			],
			cart: null
		};
	},
	computed: {
		...mapState(['vxcart']),
		calcCart () {
			// 购物车里面的数据
			let cartAry = [];
			this.shop.forEach((val) => {
				if (val.num > 0) {
					cartAry.push(val);
				}
			});
			return cartAry;
		}
	},
	methods: {
		...mapMutations(['vxAddCart']),
		addCart (item) {
			if (typeof item.num === 'undefined') {
				// 添加一个数量属性
				this.$set(item, 'num', 0);
			}
			this.vxAddCart(item);
			item.num++;
		},
		minusCart (item) {
			if (typeof item.num !== 'undefined' && item.num > 0) {
				item.num--;
			}
		}
	},
	components: {
		'shop-cart': shopCart
	}
};
</script>
<style>
</style>

