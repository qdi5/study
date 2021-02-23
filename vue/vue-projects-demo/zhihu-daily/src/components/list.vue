<template>
	<a class="daily-item">
		<div class="daily-img" v-if="data.images">
			<img :src="imgPath + data.images[0]" alt="" />
		</div>
		<div class="daily-title" :class="{ noImg: !data.images}">
			{{ data.title }}
		</div>
	</a>
</template>

<script>
import $ from '../libs/util';
import '../less/list.less';
export default {
	props: {
		data: {
			type: Object
		}
	},
	data () {
		return {
			imgPath: $.apiUrl.imgPath
		};
	}
};
</script>

<style>
</style>
