<template>
	
	<div>
		<image-preview ref="imgPreview"
		  v-model="show"
		  :images="images"
		  :startPosition="1"
		  @change="onChange"
		>
		  <template v-slot:index>第{{ index + 1 }}页</template>
		</image-preview>
		<button @click="open">打开</button>
	</div>
	
</template>

<script>
import ImagePreview from '@/base/imagePreview/image-preview/index.vue'
//console.log('ImagePreview:', ImagePreview)
export default {
	data() {
		return {
			show: false,
			images: [
				'https://i.loli.net/2019/10/23/Rxa8hJsBpVlFcHf.jpg',
				'https://i.loli.net/2019/10/23/6kVo43tJmY5KSIZ.png'
			]
		}
	},
	methods: {
		open() {
			this.show=true
		},
		onChange(index) {
		  this.index = index;
		}
	},
	components: {
		ImagePreview
	}
}
</script>

<style>
</style>
