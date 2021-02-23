// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// 直接查找node_modules目录下的文件
import Router from 'vue-router';

// 变量名固定死的
import store from 'vuex';

Vue.config.productionTip = false;

/*
 路由传参方式:
 */
const App = {
	template: `<div>
						默认显示的内容
						<button @click="$router.go(-1)">返回</button>
						<button @click="$router.go(1)">前进</button>
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
						    	<router-link :to="{ name: 'c', params: { id: 456 }}">/c</router-link>
						    </li>
						    <li>
						    	<router-link :to="{ path: '/d', query: { id: 789 }}">/d</router-link>
						    </li>
						    <li>
						    	<router-link :to="{ path: '/e', query: { id: 1000 }}">/e</router-link>
						    </li>
						    <li>
						    	<router-link to="/f">/f</router-link>
						    </li>
						    <li>
						    	<router-link to="/g">/g</router-link>
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

const g = {
	template: `
		<div>这里是g</div>
	`,
	
	// 模板内容显示之前
	beforeRouteEnter () {
		console.log(arguments);
	}
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
	},
	
	// 类似后端'重定向',但不是真正的跳转;
	// 直接跳转地址
	{
		path: '/d',
		redirect: '/c'
	},
	
	// 通过name跳转
	{
		path: '/e',
		redirect: {name: 'c'}
	},
	
	// 通过回调函数筛选后跳转
	{
		path: '/f',
		redirect: (res) => {
			// 获取路由传递过来的参数
			console.log(res.query.id);
			
			return '/a';
		}
	},
	
	{
		path: '/g',
		component: g,
		// 触发的时间：访问这个地址之后 加载模板之前
		// 去哪里、从哪里来、是否继续执行(如果不继续执行，对应的模板就不会显示出来)
		beforeEnter (to, from, next) {
			console.log(arguments);
			setTimeout(() => {
				next();
			}, 2000);
		}
	}
	]
});

// 使用路由
Vue.use(Router);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});
