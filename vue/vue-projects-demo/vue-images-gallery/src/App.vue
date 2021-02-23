<template>
  <div id="app">
	  <div class="container">
		  <div class="button-wrapper">
			  <div class="btn" @click="searchUnsplash('Autumn')">Autumn</div>
		  </div>
		  <stack
			:column-min-width="300"
			:gutter-width="15"
			:gutter-height="15"
			monitor-images-loaded
		  >
			  <stack-item v-for="(image, i) in images" :key="i" style="transition: transform 300ms">
				  <img :src="image.urls.small" :alt="image.alt_description">
			  </stack-item>
		  </stack>
	  </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Stack, StackItem } from 'vue-stack-grid'
export default {
  name: 'app',
  data: () => ({images:[]}),
  methods: {
	searchUnsplash(topic) {
		this.images = []
		axios.get(`https://api.unsplash.com/search/photos?query=${topic}&per_page=20`, {
			headers: {
				Authorization: "Client-ID c06def0f7384ce6a9ef8576ad630a3a6d3b9b7234619bf08d91adeb6b38ee3e6", 
				"Accept-Version": "v1" 
			}
		}).then(response => {
			console.log('response.data:', response.data)
			this.images = response.data.results
		}).catch(() => {
			this.images = []
		})
	}  
  },
  components: {
	// Stack组件用于设置每一列的宽度以及每个图片之间的间距
	// StackItem组件用于展示每一个图片的父容器
	Stack,
	StackItem
  }
}
</script>

<style>
.container {
	width: 80vw;
	margin: 0 auto;
}
.button-wrapper {
	display: flex;
	justify-content: center;
	margin-bottom: 25px;
}
.btn {
	font-size: 18px;
	background-color: #42b983;
	color: white;
	padding: 10px 20px;
}
</style>
