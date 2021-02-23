// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'

Vue.use(ElementUI);

// 为指定字段定义对应的错误文字提示
const dict = {
	custom: {
		name: {
			required: '书名不能为空'
		},
		isbn: {
			required: '书号不能为空',
			regex: '请输入正确的书号格式'
		},
		price: {
			required: '售价不能为空',
			regex: '售价只能是正整数'
		},
		published: {
			required: '出版日期不能为空',
			regex: '请输入正确的日期格式(例如：2018-07-26)'
		},
		stat: {
			required: '请勾选上市销售'
		},
		pages: {
			required: '页数不能未空',
			regex: '页数只能是正整数'
		},
		authors: {
			required: '作者不能为空',
			regex: '作者只能是中文名或者英文名(中文不得少于2个字符，多个作者以英文逗号隔开)'
		},
		summary: {
			required: '摘要不能为空'
		}
	}
};

// 语言本地化
Validator.localize('zh_CN', zh_CN);
Validator.localize('zh_CN', dict);
// 解决vee-vlidate与vue的字段冲突
const config = {
	// 这里相当于修改了原来的errors对象，之后需要使用errorBags来代替errors对象
	errorBagName: 'errorBags',
	fieldsBagName: 'fieldBags'
}
Vue.use(VeeValidate, config);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
