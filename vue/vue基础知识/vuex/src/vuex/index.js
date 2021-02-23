import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// vuex保存的数据
const state = {
	age: 12,
	ary: [12, 34, 4533, 343, 5343, 64, 64, 32, 65, 75],
	name: 'wuzhe'
};

// 主要用来操控 state 里面的数据的
const mutations = {
	addAge () {
		state.age++;
	},
	minusAge () {
		state.age--;
	}
};

// 调用 mutations 里的方法(可以进行异步操作)
const actions = {
	// 默认接受了一个参数
	addAgePro ({commit}) {
		commit('addAge');
	}
};

// 相当于 computed 作用域于 state 过滤操作
const getters = {
	filter (state) {
		return state.ary.filter(value => value < 100);
	}
};

// 允许下面的new不赋值
/* eslint-disable no-new */
export default new Vuex.Store({
	// 保存数据
	state,
	mutations,
	actions,
	getters
});
