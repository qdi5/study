<template>
	<div>
		<van-image-preview ref="imgPreview"
		  v-model="show"
		  :images="images"
		  :startPosition="1"
		  @change="onChange"
		>
		  <template v-slot:index>第{{ index + 1 }}页</template>
		</van-image-preview>
		<button @click="open">打开</button>
	</div>
	
	
</template>

<script>
	import Vue from 'vue'
	import { ImagePreview } from 'vant'
	import img01 from './1.png'
	import img03 from './3.jpg'
	Vue.use(ImagePreview)
	export default {
	  data() {
	    return {
	      show: false,
	      index: 0,
	      images: [
	        img01,
	        img03
	      ]
	    };
	  },
	  methods: {
		open() {
			this.show = true
			// 3秒过后关闭
			/* let previewRef = this.$refs['imgPreview']
			previewRef && setTimeout(() => {
				previewRef.close()
			}, 3000) */
		},
	    onChange(index) {
	      this.index = index;
	    }
	  }
	}
</script>

<style>
</style>
