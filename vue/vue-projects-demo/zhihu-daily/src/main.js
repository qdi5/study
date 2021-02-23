// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import util from './libs/util.js';
import './less/style.less';


Vue.config.productionTip = false;
// 自定义指令v-time转换时间为相对时间
Vue.directive('time', {
	bind: function (el, binding) {
		el.innerHTML = util.dates.time.getFormatTime(binding.value);
		el.__timeout__ = setInterval(function () {
			el.innerHTML = util.dates.time.getFormatTime(binding.value);
		}, 60000);
	},
	unbind: function (el) {
		clearInterval(el.__timeout__);
		delete el.__timeout__;
	}
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
});
