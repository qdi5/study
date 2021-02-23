<template>
  <div>
    <h1>测试上传组件</h1>
    <uploader v-viewer v-model="fileList" upload-text="不能超过2M" :max-count="3" :after-read="afterRead" name="avatar" multiple></uploader>
	<button @click="execUpload">上传</button>
	<!-- <uploader>
		<mu-button color="primary">上传</mu-button>
	</uploader>
	<mu-form ref="testForm" label-position="left" :model="testForm">
		<mu-form-item label="添加附件">
		    <mu-text-field v-model="testForm.attachment"></mu-text-field>	
		</mu-form-item>
		<uploader>
			<mu-button color="primary">添加附件</mu-button>
		</uploader>
	</mu-form> -->
	
  </div>
</template>

<script>
import Uploader from '@/base/h5Upload.vue'
export default {
  data() {
    return {
      fileList: [],
	  testForm: {
	      attachment: ''
	  }
    }
  },
  methods: {
	afterRead(fileObj, detail) {
		// debugger
		/* let formData = new FormData()
		formData.append('files', fileObj.file)
		this.$http.post('/upload/multiple', formData, {
			headers: {'Content-Type':'multipart/form-data'}
		}).then(result => {
			console.log('diy uploader上传结果：', result)
		}) */
	},
	execUpload() {
		
	}
  },
  components: {
    Uploader
  }
}
</script>

<style>

</style>