<template>
		<div class="page-wrapper">
			<el-pagination
				background
				layout="prev, pager, next"
				:total="total"
				:page-size="pageSize"
				:current-page="currentPage"
				@current-change="changePage"
		>
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'pagination',
		props: ['total', 'pageSize', 'currentPage', 'changePage']
	}
</script>

<style>
	
</style>