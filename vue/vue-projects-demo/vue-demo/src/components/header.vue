<template>
	<div>
		这里是头部
		<ul>
			<li v-for="item in nav" v-bind:key="item">
				<router-link :to="item.path">{{ item.title }}</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	props: ['aaaa'],
	data () {
		return {
			nav: [
				{title: '首页', path: '/'},
				{title: 'a', path: '/a'},
				{title: 'b', path: 'b'}
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
