import Vue from 'vue';
import Router from 'vue-router';
import daily from '@/components/daily';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'daily',
			component: daily
		}
	]
});
