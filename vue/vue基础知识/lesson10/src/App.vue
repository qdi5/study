<template>
  <div id="app">
	<img src="./assets/logo.png">
		<v-header></v-header>
		<!-- 获取vuex的数据 -->
		{{ $store.state }}
		<button @click="add()"></button>
		{{ name }}
		<router-view/>
  </div>
</template>
<script>
import {mapState, mapMutations, mapGetters} from 'vuex';
import header from './components/header';
export default {
	name: 'App',
	methods: {
		alert () {
			alert(this.name);
		},
		...mapMutations(['addAge'])
	},
	computed: {
		...mapState(['name', 'age']),
		...mapGetters(['filter'])
	},
	components: {
		'v-header': header
	}
};
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
</style>
