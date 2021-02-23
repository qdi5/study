<template>
	<div class="seller-wrapper" ref="sellerWrapper">
		<div class="seller-content">
			<div class="info">
				<div class="title">
					<div class="text">
						{{ datas.seller.name }}
					</div>
					<div class="star-wrapper">
						<rating-star :size="36" :score="datas.seller.score"></rating-star>
						<div class="rate-count">({{ datas.seller.ratingCount }})</div>
						<div class="sell-count">月售{{ datas.seller.sellCount }}单</div>
					</div>
					<div class="collect" @click="show=!show">
						<span class="icon-favorite" :class="{'active': show}"></span>
						<span class="text">{{show?'已收藏':'收藏'}}</span>
					</div>
				</div>
				<div class="remark">
					<div class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="num">{{datas.seller.minPrice}}</span>
						</div>
					</div>
					<div class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="num">{{datas.seller.deliveryPrice}}</span>
						</div>
					</div>
					<div class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="num">{{datas.seller.deliveryPrice}}</span>
						</div>
					</div>
				</div>
				<div class="activities">
					<div class="bulletin">
						<h1>公告与活动</h1>
						<div class="content">{{ datas.seller.bulletin }}</div>
					</div>
				</div>
				<div class="supports">
					<ul>
						<li class="item" v-for="item in datas.seller.supports" :key="item.description">
							<span class="iconMap" :class="icon[item.type]"></span>
							<span class="text">{{ item.description }}</span>
						</li>
					</ul>
				</div>
				<div class="divider"></div>
				<div class="seller-imgs">
					<h1>商家实景</h1>
					<div class="img-wrapper" ref="picsWrapper">
						<div class="picList" ref="pics">
							<img :src="pic" alt="" :key="pic" v-for="pic in datas.seller.pics" width="120" height="90" />
						</div>
					</div>
				</div>
				<div class="divider"></div>
				<div class="seller-info">
					<h1>商家信息</h1>
					<ul class="info-list">
						<li class="info" v-for="info in datas.seller.infos" :key="info">
							{{info}}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ratingStar from './mods/ratingStar';
import Scroll from 'better-scroll';
import commdata from './mods/data.js';
export default {
	props: ['datas'],
	data () {
		return {
			show: false,
			icon: commdata.icons
		};
	},
	mounted () {
		/* eslint-disable no-new */
		new Scroll(this.$refs['sellerWrapper'], {
			click: true
		});
		
		// 初始化横向滚动
		let imgElements = this.$refs['pics'].getElementsByTagName('img');
		let imgNumber = imgElements.length;
		let imgElement = imgElements[0];
		// 获取图片的右边距
		let imgMargin = parseInt(window.getComputedStyle(imgElement, null).getPropertyValue('margin-right'), 10);
		let imgOuterWidth = parseInt(imgElement.getBoundingClientRect().width * imgNumber + imgMargin * imgNumber, 10);
		console.log(imgOuterWidth);
		this.$refs['pics'].style.width = imgOuterWidth + 'px';
		if (!this.scrollPlugin) {
			this.scrollPluginPlugin = new Scroll(this.$refs.picsWrapper, {
				startX: 0,
				click: true,
				scrollX: true,
				scrollY: false,
				eventPassthrough: 'vertical'
			});
		}
	},
	components: {
		'rating-star': ratingStar
	}
};
</script>

<style>
</style>

