import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	age: [
		{name: 'wz', age: 12},
		{name: 'wz', age: 14},
		{name: 'wz', age: 16},
		{name: 'wz', age: 18}
	],
	name: 'abc'
];

// 相当于 computed 作用于 state过滤操作
const getters = {
	filter (state) {
		return state.age.filter( function (i) {
			return i.age > 14;
		});
	}
};


// 主要是用来操控 state 里面的数据
const mutations = {
	addAge () {
		state.age++;
	},
	minusAge () {
		state.age--;
	}
};

// 来调用 mutations 里的方法(在执行之前，可以做一些拦截处理)
// 可以进行异步操作
const actions = {
	addAgePro ({commit}) {
		console.log(commit('addAge'));
	}
};
// 取消eslint的规则(new的时候不赋值，eslint不让编译通过)
/* eslint-disable no-new */
export default new Vuex.Store({
	state,
	mutations
});
