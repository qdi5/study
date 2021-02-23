// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// 直接查找node_modules目录下的文件
import Router from 'vue-router';


Vue.config.productionTip = false;

/*
 路由传参方式:
 1、通过网址传递，在路由里获取
 2、同上，直接 :to="{ path: '/b/bb', query: { id: 123 }}",传递方式是明文的 在网址后面会添加?arg='xxx'
 3、params传值方式，必须是通过name去寻找对应的路由，才可以获取到数据
 */
const App = {
    template: `<div>
						默认显示的内容
						<ul>
						    <li>
						        <router-link to="/">首页</router-link>
						    </li>
						    <li>
						        <router-link to="/a">a</router-link>
						        <ul>
						            <li>
						            		<router-link to="/a/aa">aa</router-link>
						            </li>
						            <li>
						            		<router-link to="/a/aaa">aaa</router-link>
						            </li>
						        </ul>
						    </li>
						    <li>
						    	<router-link :to="{ path: '/b/bb', query: { id: 123 }}">/b/bb</router-link>
						    </li>
						    <li>
						    	<router-link :to="{ name: 'c', params: { id: 123 }}">/c</router-link>
						    </li>
						</ul>
						<router-view></router-view>
					</div>`
};

const a = {
    template: `<div>这里是a
    					     <router-view></router-view>		
    					 </div>
    					 `
};

const aa = {
	  template: `<div>这里是a下面的子路由aa{{ $route.params }}</div>`
};

const aaa = {
	  template: `<div>这里是a下面的子路由aaa{{ $route.params }}</div>`
};

const b = Vue.component('b', {
	  template: `<div>这里是b</div>`,
	  mounted () {
	  	console.log(this.$route.params);
	  }
});

const c = {
    template: `<div>{{ $route.params }}</div>`
};
const index = {
    template: `<div>
						这里是index
					</div>`
};

// 定义路由
const router = new Router({
    routes: [{
	      path: '/',
		    component: index
    },
    {
    	path: '/a',
    	component: a,
    	// 子路由不需要'/'
    	// 子路由显示的地方 父级路由模板里的第一个 router-view 标签里
    	children: [{
    		path: 'aaa',
    		component: aaa
    	},
    	{
    		path: ':id',
    		component: aa
    	}]
    },
    {
    	path: '/b/:id',
    	component: b
    },
    {
    	path: '/c',
    	name: 'c',
    	component: c
    }
    ]
});

// 使用路由
Vue.use(Router);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
