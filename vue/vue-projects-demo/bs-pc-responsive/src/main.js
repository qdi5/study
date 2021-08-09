import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import "@/common/js/veevalidate.js"
import "swiper/css/swiper.css"
import "@/common/sass/theme/custom.scss"
import "@/common/sass/index.scss";
import 'element-ui/lib/theme-chalk/index.css';
import TbUI from "@/base";
Vue.use(TbUI);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
