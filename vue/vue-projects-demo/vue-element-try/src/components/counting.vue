<template>
	<span class="choose-wrap">
	    共有<span class="highlight">{{ totalNum }}</span>本图书
		<span v-show="checkedNum > 0">&nbsp;已选中<span class="highlight">{{ checkedNum }}</span>本图书</span>
	</span>
</template>
<script>
	export default {
		name: 'counting',
		props: ['totalNum', 'checkedNum'],

	}
</script>
<style>
	
</style>
