<template>
  <div id="app">
	<OnePixel msg="移动端1像素测试"/>
	<test-stylus></test-stylus>
  </div>
</template>

<script>
import OnePixel from './components/OnePixel.vue'
import TestStylus from './components/TestStylus.vue'
import 'normalize.css'
import 'common/styles/index.less'
export default {
  name: 'app',
  components: {
    OnePixel,
	TestStylus
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
