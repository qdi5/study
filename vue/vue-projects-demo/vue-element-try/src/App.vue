<template>
  <div id="app">
  	<!-- 工具栏  end -->
  	<router-view/>
  </div>
</template>

<script>

</script>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
html {
	font: 12px/1.5 "\5FAE\8F6F\96C5\9ED1", "Microsoft Yahei", "Hiragino Sans GB", tahoma, arial, "\5B8B\4F53";
  -webkit-font-smoothing: antialiased;
}
#app:after {
	content: '';
	clear: both;
	display: table;
	
}
body {
	padding: 0 0 100px 0;
}	
h1,h2,h3,h4,h5,h6 {
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	text-transform: none;
}
.icon-search {
	position: absolute;
	width: 16px;
	height: 16px;
	left: 10px;
	top: 0;
	bottom: 0;
	margin: auto;
}
.container {
	width: 980px;
	margin: 0 auto;
	padding-top: 50px;
}
.row-margin-bottom {
	margin-bottom: 50px;
}
.row-search-wrap {
	line-height: 40px;
}
.text-align-right {
	text-align: right;
}
.table-header {
	text-align: center;
	background: red;
}
.page-wrapper {
	margin: 25px 0 0 0;
	text-align: center;
}
.title {
	padding: 70px 80px;
	background: #444;
	color: #fff;
	font-size: 36px;
	line-height: 42px;
	font-weight: 100
}
small {
	font-size: 80%;
}
@media (min-width: 768px) {
	.title {
		font-size: 52px;
		line-height: 64px;
		
	}
}
.choose-wrap {
	color: #999;
	font-size: 18px;
	line-height: 40px;
	font-weight: normal;
}
.highlight {
	font-weight: bold;
}
.search-input-wrap {
	position: relative;
}
.search-input {
		height: 30px;
}
.search-input > input {
	height: 100%;
}
.search-input > input:focus {
	border-color: #99baca;
  outline: 0;
  background: #f5fbfe;
  color: #444;
}
.btn-square {
	padding: 8px 11px;
}
.search-input .el-icon-search {
	font-size: 18px;
	font-weight: bold;
	color: #999;
}
</style>
