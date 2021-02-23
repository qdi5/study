<template>
  <div id="app">
      <product-list-one></product-list-one>
			<product-list-two></product-list-two>
  </div>
</template>

<script>
import productListOne from './components/ProductListOne.vue'
import productListTwo from './components/ProductListTwo.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
	components: {
		'product-list-one': productListOne,
		'product-list-two': productListTwo
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
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
