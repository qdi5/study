<template>
	<div ref="ratingsWrapper" class="ratingsWrapper">
		<div class="ratings-content">
			<div class="info">
				<div class="mark">
					<div class="num">
						{{ datas.seller.score }}
					</div>
					<div class="text" @tap="tap">
						综合评分
					</div>
					<div class="contrast">
						高于周边商家{{ datas.seller.rankRate }}%
					</div>
				</div>
				<div class="stars">
					<div class="serviceScore">
						<span class="text">服务态度</span>
						<rating-star :size="36" :score="datas.seller.serviceScore"></rating-star>
						<span class="num">{{ datas.seller.serviceScore }}</span>
					</div>
					<div class="serviceScore">
						<span class="text">商品评分</span>
						<rating-star :size="36" :score="datas.seller.serviceScore"></rating-star>
						<span class="num">{{ datas.seller.serviceScore }}</span>
					</div>
				</div>
			</div>
			<div class="divider"></div>
			<div class="evaluation">
				<div class="classify">
					<span class="item" :class="{'active': item.active, 'bad': index == 2, 'badActive': index == 2 && item.active}" @click="evel(item)" v-for="(item, index) in classify" :key="index">
						{{ item.name }}
						<span class="count">{{ item.count }}</span>
					</span>
				</div>
				<div class="switch">
					<span class="icon-check_circle" @click="show=!show" :class="{'on': show}"></span>
					<span class="span text">只看有内容评价</span>
				</div>
				<div class="evel-list">
					<ul>
						<li class="evel" :key="index" v-for="(item, index) in getComment">
							<div class="avatar">
								<img :src="item.avatar" alt="" width="28" height="28" />
							</div>
							<div class="content">
								<div class="user">
									<span class="name">{{ item.username }}</span>
									<span class="rateTime">{{ item.rateTime }}</span>
								</div>
								<div class="star-wrapper">
									<rating-star :size="24" :score="item.score"></rating-star>
									<span class="deliveryTime">{{ item.deliveryTime }} 分钟送达</span>
								</div>
								<div class="text">
									{{ item.text }}
								</div>
								<div class="recommend" v-if="item.recommend.length">
									<span class="icon" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
									<span class="dish" v-for="dish in item.recommend" :key="dish">{{ dish }}</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import ratingStar from './mods/ratingStar';
import Scroll from 'better-scroll';
export default {
	props: ['datas'],
	data () {
		return {
			ratings: [],
			classify: [
				// 是否选中、评论个数、评价内容数组
				{name: '全部', active: true, count: 0, comment: []},
				{name: '推荐', active: false, count: 0, comment: []},
				{name: '吐槽', active: false, count: 0, comment: []}
			],
			show: true,
			// 用来保存每次点击的类型下的评论
			comments: []
		};
	},
	mounted () {
		// 获取评价数据
		axios.get('/static/data.json').then(res => {
			/*
			 注册了nextTick => 更新了dom => 触发了 nextTick => new 滚动 => 计算属性里的执行 => 更新dom =>
			this.$nextTick(() => {
				this.$nextTick(() => {
					this.scrollPlugin = new Scroll();
				});
			});
			  */
			
			
			this.ratings = res.data.ratings;
			// 初始化评论的数据(在循环的时候使用的是计算属性计算出来的值)
			this.comments = res.data.ratings;
			this.ratings.forEach(val => {
				this.classify[0].count++;
				this.classify[0].comment.push(val);
				if (val.rateType) {
					this.classify[2].count++;
					this.classify[2].comment.push(val);
				} else {
					this.classify[1].count++;
					this.classify[1].comment.push(val);
				}
			});
			// 这里是刚刚把评论归类好  => 注册一个$nextTick => 计算属性里执行 => 触发了$nextTick => new 滚动插件
			this.$nextTick(() => {
				this.scrollPlugin = new Scroll(this.$refs['ratingsWrapper'], {
					click: true
				});
			});
		});
	},
	activated () {
		// 不管组件有木有缓存,都会执行;当想缓存组件，而不想缓存ajax的时候，可以在这里执行ajax操作
		// 组件缓存、数据更新
		console.log('activated');
	},
	methods: {
		// 点击不同评论类型的事件
		evel (item) {
			this.classify.forEach(val => {
				val.active = false;
			});
			this.comments = item.comment;
			item.active = true;
		},
		tap () {
			alert(666);
		}
	},
	computed: {
		getComment () {
			// 保存筛选出来的评论数据
			let arr = [];
			if (this.show) {
				this.comments.forEach(val => {
					if (val.text.length > 0) {
						arr.push(val);
					}
				});
			} else {
				arr = this.comments;
			}
			return arr;
		}
	},
	components: {
		'rating-star': ratingStar
	}
};
</script>

<style>
</style>


