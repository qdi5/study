// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//
import Vue from 'vue';
import App from './App';
import router from './router';
// 当引入的路径是文件夹的时候 引入的是文件夹下名为index的文件(忽略后缀名)
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
