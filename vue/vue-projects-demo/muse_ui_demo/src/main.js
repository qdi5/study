import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import Fastclick from 'fastclick'
import 'normalize.css'
import '@/styles/comm.less'
// import 'material-design-icons'
import MuseUI from 'muse-ui'
import request from '@/utils/request.js'
import 'muse-ui/dist/muse-ui.css'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
// 自动消失的提示信息组件
import Toast from 'muse-ui-toast'

Vue.config.productionTip = false
Vue.use(MuseUI)
Vue.use(Toast)
Vue.use(request)
Vue.use(Viewer, {
  defaultOptions: {
    "button": false, 
	"navbar": false, 
	"title": false, 
	"toolbar": true, 
	"tooltip": false, 
	"movable": false, 
	"zoomable": true, 
	"rotatable": false, 
	"scalable": false, 
	"transition": true, 
	"fullscreen": true, 
	"keyboard": false,
	"toolbar": false
  }
})
Fastclick.attach(document.body)
new Vue({
	router,
	store,
  render: h => h(App)
}).$mount('#app')
