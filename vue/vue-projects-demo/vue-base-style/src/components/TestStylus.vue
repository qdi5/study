<template>
	<div class="stylus-wrapper">
		测试下stylus的函数功能
	</div>
</template>

<script>
export default {
	name: 'TestStylus'
}
</script>

<style lang="stylus" scoped>
	/* 函数定义，设置默认值 */
	add(a, b = a)
		b
	
	/* 返回多个值 */
	sizes = 15px 10px
	fs = sizes[0]
		
	
		
	.stylus-wrapper
		position: relative
		padding: add(b: 10px, a: 1px)
		background-color: red
		border: 1px solid green
		border-radius: fs
		transform: unquote('translate3d('+sizes[0] + ',' + sizes[1] +',' +  sizes[0] +')')
		transform: unquote('skew('+unit(sizes[0], deg) + ',' + unit(sizes[1], deg) + ')')
		&:after
			content: '' + s('bar()') + ''
</style>
