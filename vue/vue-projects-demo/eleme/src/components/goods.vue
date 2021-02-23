<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li class="menu-item" v-for="item in datas.goods" :key="item.name" @click="scrollToElements('#' + item.name)">
					<span class="text">
						<span v-show="item.type > 0" class="iconMap" :class="icon[item.type]"></span>
						{{ item.name }}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in datas.goods" :key="item.name" class="food-list food-list-hook">
					<h1 class="title" :id="item.name" @tap="tap()">
						{{ item.name }}
					</h1>
					<ul>
						<li v-for="food in item.foods" :key="food.name" class="food-item" @click="showDetail(food)">
							<div class="icon">
								<img width="57" height="57" :src="food.icon" alt="" />
							</div>
							<div class="content">
								<h2 class="name">{{ food.name }}</h2>
								<div class="description">{{ food.description }}</div>
								<div class="sell-info">
									<span class="sellCount" @tap="tap()">
										月售{{ food.sellCount }}份
									</span>
									<span class="rating">好评率{{ food.rating }}%</span>
									<div class="price">
										<span class="newPrice">
											&yen;{{ food.price }}
										</span>
									</div>
									<div class="cartcontrol-wrapper">
										<cart-control :food="food"></cart-control>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shop-cart :food="food" :deliveryPrice="datas.seller.deliveryPrice" :minPrice="datas.seller.minPrice"></shop-cart>
		<food-detail :foodDetails="foodDetails" ref="foodDetail"></food-detail>
	</div>
</template>

<script>
import commData from './mods/data.js';
// 引入滚动插件
import Scroll from 'better-scroll';
import shopCart from './mods/shopCart.vue';
import cartControl from './mods/cartControl.vue';
import foodDetail from './mods/foodDetail.vue';
export default {
	props: ['datas'],
	data () {
		return {
			icon: commData.icons,
			foodDetails: {}
		};
	},
	mounted () {
		// dom更新完之后
		// dom更新完 => new Scroll() => ajax获取数据后 => dom再次更新了
		this.$nextTick(() => {
			if (!(this.foodListScroll && this.menuScroll)) {
				this.scroll();
			}
		});
	},
	methods: {
		scroll () {
			/* eslint-disable no-new */
			this.foodListScroll = new Scroll(this.$refs['foodsWrapper'], {
				// 滚动时，允许点击
				click: true
			});
			this.menuScroll = new Scroll(this.$refs['menuWrapper'], {
				click: true
			});
		},
		showDetail (food) {
			this.$refs['foodDetail'].foodShow();
			this.foodDetails = food;
		},
		scrollToElements (id) {
			// better-scroll滚动到指定元素位置
			this.foodListScroll.scrollToElement(id, 500);
		},
		tap () {
			alert('tap啊');
		}
	},
	computed: {
		// 实时计算加入购物车的物品对象
		food () {
			let arr = [];
			this.datas.goods.forEach(goods => {
				goods.foods.forEach(foods => {
					if (typeof foods.count !== 'undefined' && foods.count > 0) {
						arr.push(foods);
					}
				});
			});
			return arr;
		}
	},
	components: {
		'shop-cart': shopCart,
		'cart-control': cartControl,
		'food-detail': foodDetail
	}
};
</script>

<style>
</style>
