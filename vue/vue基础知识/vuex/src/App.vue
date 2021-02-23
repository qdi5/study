<template>
  <div id="app">
	<img src="./assets/logo.png">
		<v-header></v-header>
		<!-- 获取vuex的数据 -->
		<p>获取vuex保存的数据对象：{{ $store.state }}</p>
		<p>获取vuex里面的姓名：{{ name }}</p>
		<p>
				获取vuex里面的年龄：{{ age }}
				<button @click="addAge()">增加年龄</button>
				<button @click="addAgePro()">增加年龄pro版</button>
				<button @click="minusAge()">减小年龄</button>
		</p>
		<p>过滤出来的年龄数据： {{ filter }}</p>
		
		<button @click="alert()">methods获取vuex里面的数据</button>
		<router-view></router-view>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';
import header from './components/header';
export default {
	name: 'App',
	methods: {
		alert () {
			alert(this.age);
		},
		...mapMutations(['addAge', 'minusAge']),
		...mapActions(['addAgePro'])
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
