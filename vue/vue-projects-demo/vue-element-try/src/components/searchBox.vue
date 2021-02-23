<template>
	<div class="search-input-wrap">
	    <el-input prefix-icon="el-icon-search" class="search-input" :value="keywords" @input="handleChange" :placeholder="placeholder"></el-input>
	</div>
</template>

<script>
	export default {
		name: 'SearchBox',
		// keywords、placeholder是从父组件传递过来的值
		props: ['keywords','placeholder'],
		methods: {
			handleChange(value) {
				// 触发父组件上定义的自定义事件search，并将当前input的值传递过去
				this.$emit('search', value)
			}
		}
	}
</script>

<style>
</style>