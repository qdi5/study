<template>
  <div class="hello">
    <h1 class="title-one vux-1px-l">
		左边框
	</h1>
	<h1 class="title-one vux-1px-r">
		右边框
	</h1>
	<h1 class="title-one vux-1px-t">
		上边框
	</h1>
	<h1 class="title-one vux-1px-b">
		下边框
	</h1>
	<h1 class="title-one vux-1px-tb">
		上下边框
	</h1>
  </div>
</template>

<script>
export default {
  name: 'OnePixel',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '~common/styles/mixin/setOnepx.less';

.title-one {
	position: relative;
	margin: 15px 25px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
