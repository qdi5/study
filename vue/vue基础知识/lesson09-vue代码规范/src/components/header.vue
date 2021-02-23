<template>
	<div>
		
		<!-- 引用图片方式1 -->
		<img src="../assets/vue-transition.png" alt="" />
		
		<!-- 引用图片方式2，静态资源目录 -->
		<img src="/static/vue-transition.png" alt="" />
		获取app.vue的数据 {{ aaaa }}
		
		<ul>
			<!-- 循环导航 -->
			<li v-for="item in nav" v-bind:key="item">
				
				<router-link :to="item.path">{{ item.title }}</router-link>
				<!-- 动态拼接链接地址 -->
				<router-link :to="`/xxx/${item.id}.html`">{{ item.title }}</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
//导出一个vue实例配置对象
export default {
	props: ['aaaa'],
	data () {
		return {
			nav: [
				{title: '首页', path: '/', id: 1},
				{title: 'a', path: '/a', id: 2},
				{title: 'b', path: 'b', id: 3}
			]
		};
	}
};
</script>
<style>
	body {
		background: black;
	}
</style>
