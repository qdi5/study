import Vue from 'vue';
import Router from 'vue-router';

// @代表的是src目录
import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
	routes: [
	  {
	    path: '/',
	    name: 'HelloWorld',
	    component: HelloWorld
	  }
	]
});
