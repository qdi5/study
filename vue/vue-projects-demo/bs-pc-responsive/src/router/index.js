import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/swiper",
    name: "Swiper",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "swiper" */ "../views/Swiper.vue"),
  },
  {
    path: "/login",
    component: () => import(/* webpackChunkName: "login" */ "../views/login/Login.vue"),
    children: [{
      path: "",
      name: "LoginPwdOrPhone",
      component: () => import(/* webpackChunkName: "phoneOrPwdLogin" */ "../views/login/PhoneOrPwdLogin.vue"),
    },
    {
      path: "wechat",
      name: "WechatLogin",
      component: () => import(/* webpackChunkName: "wechatLogin" */ "../views/login/WechatLogin.vue")
    },
    {
      path: "app",
      name: "AppLogin",
      component: () => import(/* webpackChunkName: "appLogin" */ "../views/login/AppLogin.vue")
    }]
  },
  {
    path: "/forgetPwd",
    name: "ForgetPwd",
    component: () => import(/* webpackChunkName: "forgetPwd" */ "../views/ForgetPwd.vue")
  },
  {
    path: "/register/wechat",
    name: "WechatRegister",
    component: () => import(/* webpackChunkName: "wechatRegister" */ "../views/WechatRegister.vue")
  },
  {
    path: "/userbind/wechat",
    name: "UserbindWechat",
    component: () => import(/* webpackChunkName: "userbindWechat" */ "../views/UserbindWechat.vue")
  }
];

const router = new VueRouter({
  routes,
});

export default router;
