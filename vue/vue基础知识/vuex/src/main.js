// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//
import Vue from 'vue';
import App from './App';
import router from './router';
// 引入的变量名是固定死的
import store from './vuex';
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
});
