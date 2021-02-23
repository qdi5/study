import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/goods'
  },
  {
    name: 'user',
    component: () => import('./view/user'),
    meta: {
      title: '会员中心'
    }
  },
  {
    name: 'cart',
    component: () => import('./view/cart'),
    meta: {
      title: '购物车'
    }
  },
  {
    name: 'goods',
    component: () => import('./view/goods'),
    meta: {
      title: '商品详情'
    }
  },
  {
	  name: 'upload',
	  component: () => import('./view/upload'),
	  meta: {
		  title: '上传组件'
	  }
  },
  {
  	  name: 'date-time-picker',
  	  component: () => import('./view/datetimepicker'),
  	  meta: {
  		  title: '时间选择器'
  	  }
  },
  {
	  name: 'image-preview',
	  component: () => import('./view/imagePreview'),
	  meta: {
		  title: '图片查看器'
	  }
  },
  {
	  name: 'number-keyboard',
	  component: () => import('./view/numberKeyboard'),
	  meta: {
		  title: '数字键盘'
	  }
  },
  {
  	  name: 'area',
  	  component: () => import('./view/area'),
  	  meta: {
  		  title: '省市区选择'
  	  }
  },
  {
    name: 'count-down',
    component: () => import('./view/countDown'),
    meta: {
      title: '倒计时'
    }
}
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
