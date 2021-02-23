<template>
	<div class="star" :class="'star-' + size">
		<span v-for="(rate, index) in calcRating" :key="index" class="star-item" :class="rate"></span>
	</div>
</template>

<script>
export default {
	props: ['score', 'size'],
	computed: {
		// 计算评分
		calcRating () {
			// 获取整数部分 向下取整
			let _int_ = Math.floor(this.score);
			// 获取小数部分
			let	_float_ = this.score - _int_;
			let	isAddOneStar = (_float_ >= 0.5);
			// 保存星星的class名
			let	arry = [];
			
			for (let i = 0; i < (_int_ > 5 ? 5 : _int_); i++) {
				arry.push('on');
			}
			if (isAddOneStar) {
				arry.push('half');
			}
			while (arry.length < 5) {
				arry.push('off');
			}
			return arry;
		}
	}
};
</script>

<style>
</style>
