<template>
	<div>
	    <h1>有赞上传组件</h1>
	    <van-uploader v-model="imgsList" upload-text="文件不能超过200k" :max-size="150" :before-read="beforeRead" :after-read="afterRead" multiple name="avatar" :max-count="3" />
		<!-- <van-uploader>
		  <van-button icon="photo" type="primary">上传图片</van-button>
		</van-uploader> -->
	</div>
	
</template>

<script>
	import axios from 'axios'
	import { Uploader, Button } from 'vant'
	export default {
	  data() {
		return {
			imgsList: []
		}  
	  },
	  methods: {
		beforeRead(file) {
			debugger
			if (file.type !== 'image/jpeg') {
				return false
			}
			return true
		},
	    afterRead(file, nameObj) {
		  debugger
		  // debugger
	      // 此时可以自行将文件上传至服务器
	      console.log(file, name)
		  /* var formData = new FormData()
		  formData.append(nameObj.name, file.file)
		  axios.post('/upload/single', formData, {
			  headers:{'Content-Type':'multipart/form-data'},
			   onUploadProgress: function (progressEvent) {
			      // Do whatever you want with the native progress event
				  console.log('上传进度：', progressEvent)
			    },
		  }).then(result => {
			  console.log('上传结果：', result)
			 /* let imgSrc = result.pic.replace(/\\/g, '/')
			  this.imgsList.push({
				  url: imgSrc
			  }) 
		  }).catch(error => {
			  throw error
		  }) */
	    }
	  },
	  components: {
		  [Uploader.name]: Uploader,
		  [Button.name]: Button
	  }
	}
</script>

<style lang="less" scoped>
	h1 {
		text-align: center;
		font-size: 16px;
		font-weight: normal;
	}
</style>
