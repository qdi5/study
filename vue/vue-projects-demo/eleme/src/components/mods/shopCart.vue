<template>
	<div class="shopCart">
		<div class="content" >
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo active" @click="showShopCart">
						<i class="icon-shopping_cart"></i>
					</div>
					<div class="badge" v-show="totalCount > 0">{{ totalCount }}</div>
				</div>
				<div class="price" :class="{'active': totalPrice}">&yen;{{ totalPrice||0 }}</div>
				<div class="desc" v-show="totalPrice < 100">另需配送费&yen;{{ deliveryPrice }}元</div>
			</div>
			<div class="content-right" :class="{'enough': totalPrice >= minPrice}">
				<div class="pay">{{ payDesc | unescapeHtml }}</div>
			</div>
		</div>
		<transition name="transHeight">
			<div v-show="totalCount > 0 && show" class="shopcart-list">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="clear">清空</span>
				</div>
				<div ref="listContent" class="list-content">
					<ul>
						<li class="food" v-for="item in food" :key="item.name">
							<span class="name">{{ item.name }}</span>
							<div class="price">
								<span>
									{{ item.price }}
								</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cart-control :food="item"></cart-control>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
// 必须等到dom更新完之后再 new 才可以	
import Scroll from 'better-scroll';
import cartControl from './cartControl.vue';
export default {
	// 配送费   最低消费(起步价)   购物车里的商品
	props: ['deliveryPrice', 'minPrice', 'food'],
	data () {
		return {
			show: false
		};
	},
	methods: {
		// 清空商品
		clear () {
			this.food.forEach(food => {
				food.count = 0;
			});
			
			// 清空购物车后，隐藏购物车dom结构
			this.show = false;
			return null;
		},
		
		// 显示购物车
		showShopCart () {
			this.show = !this.show;
			
			// 等待dom更新完之后，初始化滚动插件
			this.$nextTick(() => {
				if (!this.scrollPlugin) {
					this.scrollPlugin = new Scroll(this.$refs['listContent'], {
						click: true
					});
				} else {
					// 滚动插件重新计算高度
					this.scrollPlugin.refresh();
				}
			});
		}
	},
	computed: {
		// 计算总价
		totalPrice () {
			let total = 0;
			this.food.forEach(food => {
				total += food.price * food.count;
			});
			return total;
		},
		// 计算总数量
		totalCount () {
			let count = 0;
			this.food.forEach(food => {
				count += food.count;
			});
			return count;
		},
		// 还剩多少钱起送
		payDesc () {
			let result = '';
			if (this.totalPrice === 0) {
				result = `&yen;${this.minPrice}`;
			} else if (this.totalPrice < this.minPrice) {
				 result = `还差${this.minPrice - this.totalPrice}`;
			} else {
				result = '去结算';
			}
			return result;
		}
	},
	filters: {
		// 将字符串中的 &yen; 反转义为人民币符号
		unescapeHtml (str) {
			let spanElement = document.createElement('span');
 			spanElement.innerHTML = str;
 			
 			return spanElement.childNodes.length === 0 ? '' : spanElement.childNodes[0].nodeValue;
		}
	},
	components: {
		'cart-control': cartControl
	}
};
</script>

<style>
</style>
