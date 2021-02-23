<template>
	<transition name="move">
		<div class="detailWrapper" ref="detailWrapper" v-show="show">
			<div class="foodDetail">
				<div @click="show=!show" class="back">
					<i class="icon-arrow_lift"></i>
				</div>
				<img :src="foodDetails.image" height="425" width="100%" alt="" />
				<div class="info">
					<div class="title">{{ foodDetails.name }}</div>
					<div class="desc">
						<span class="">月售{{ foodDetails.sellCount }}</span>
						<span class="">好评率{{ foodDetails.rating }}%</span>
					</div>
					<div class="price">{{ foodDetails.price }}</div>
					<div v-show="foodDetails.count === 0 || foodDetails.count == undefined" @click="add($event)" class="shopCart">
						<div class="text">加入购物车</div>
					</div>
					<cart-control ref="cartControl" :food="foodDetails"></cart-control>
				</div>
				<div class="divider"></div>
				<div class="desc">
					<div class="title">商品介绍</div>
					<div class="content">{{ foodDetails.info }}</div>
				</div>
				<div class="divider"></div>
				<div class="evaluation">
					<div class="title">商品评论</div>
					<div class="classify">
						<span v-for="(item, index) in classify" :key="item.name" @click="classifyClick(item)" class="item" :class="{'active': item.active, 'bad': index ===2, 'badActive': index===2&&item.active}">
							{{ item.name }}
							<span class="count">{{ item.count }}</span>
						</span>
					</div>
					<div class="switch">
						<span class="icon-check_circle" :class="{'on': flag}" @click="flag = !flag"></span>
						<span class="text">只看有内容的评价</span>
					</div>
					<div class="evel-list">
						<ul>
							<li class="evel" v-for="item in getCommonts" :key="item.rateTime">
								<div class="userInfo">
									<div class="time">
										{{ item.rateTime }}
									</div>
									<div class="user">
										<span>{{ item.username }}</span>
										<img :src="item.avatar" alt="" width="12" />
									</div>
								</div>
								<div class="content">
									<span class="icon" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
									<span class="text">{{ item.text }}</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import Scroll from 'better-scroll';
import cartControl from './cartControl.vue';
export default {
	props: ['foodDetails'],
	data () {
		return {
			show: false,
			classify: [
				
				{name: '全部', count: 0, commont: [], active: true},
				{name: '推荐', count: 0, commont: [], active: false},
				{name: '吐槽', count: 0, commont: [], active: false}
			],
			
			// 保存评论数据
			commonts: [],
			// 标识是否只看有内容的评价
			flag: true
		};
	},
	methods: {
		add (event) {
			this.$refs['cartControl'].addCart(event);
		},
		foodShow () {
			this.show = true;
			
			this.$nextTick(() => {
				this.commonts = this.foodDetails.ratings;
				// 将不同类型的评论数据保存到不同的对象里
				this.foodDetails.ratings.forEach(val => {
					this.classify[0].count++;
					this.classify[0].commont.push(val);
					if (val.rateType) {
						this.classify[2].count++;
						this.classify[2].commont.push(val);
					} else {
						this.classify[1].count++;
						this.classify[1].commont.push(val);
					}
				});
			});
			
			
			if (!this.scrollPlugin) {
				this.$nextTick(() => {
					this.scrollPlugin = new Scroll(this.$refs['detailWrapper'], {
						click: true
					});
				});
			} else {
				this.scrollPlugin.refresh();
			}
		},
		classifyClick (item) {
			this.commonts = item.commont;
			this.classify.forEach(val => {
				val.active = false;
			});
			item.active = true;
		},
		
		// 刷新滚动插件
		refreshScrollPlugin () {
			this.$nextTick(() => {
				if (typeof this.scrollPlugin !== 'undefined') {
					this.scrollPlugin.refresh();
				}
			});
		}
	},
	computed: {
		
		// 评价筛选
		getCommonts () {
			let arr = [];
			// 1、注册一个$nextTick 2、更新dom 3、检测到dom更新完，执行回调
			this.refreshScrollPlugin();
			if (this.flag) {
				this.commonts.forEach(val => {
					if (val.text.length > 0) {
						arr.push(val);
					}
				});
			} else {
				arr = this.commonts;
			}
			return arr;
		}
	},
	components: {
		'cart-control': cartControl
	}
};
</script>
<style>
</style>
