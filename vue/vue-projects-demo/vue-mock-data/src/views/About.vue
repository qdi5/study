<template>
  <div class="about">
    <h1>使用mockjs模拟数据</h1>
	<div class="container">
		<ul v-for="item in list" :key="item.id">
			<li>
				<span>id: {{ item.id }}</span>
			</li>
			<li>
				<span>用户名: {{ item.author_name }}</span>
			</li>
			<li>
				<span>标题: {{ item.title }}</span>
			</li>
			<li>
				<span>缩略图: <img :src="item.thumbnail_pic_s" /></span>
			</li>
			<li>
				<span>时间: {{ item.date }}</span>
			</li>
		</ul>
	</div>
  </div>
</template>
<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		mounted() {
			this.$http.get('/api/test').then(response => {
				console.log('模拟的数据：\n', response)
				this.list = response.data.data
			})

			this.$http.get('/api/list').then(response => {
				debugger
				var data = response.data && response.data.list
				console.log('获取自增的数值数据：\r\n', data)
			})
		}
	}
</script>
<style lang="stylus" scoped>
	// 横向布局
	.flex-layout-h {
		flex-direction: row;
		.flex-item {
			flex: 1 1 auto;
		}
	}
	// 纵向布局
	.flex-layout-v {
		flex-direction: column;
		.flex-item {
			flex: 1 1 auto;
		}
	}
</style>
