<template>
	<div class="home">
		首页
		<i class="iconfont icon-github"></i>
		<mu-container>
			<router-link :to="{name: 'login'}">
				<mu-button color="primary">
					登录
				</mu-button>
			</router-link>
		</mu-container>
	</div>
</template>

<script>
</script>

<style lang="less" scoped>
.home {
	i {
		font-size: 20px;
		color: red;
	}
}
</style>
