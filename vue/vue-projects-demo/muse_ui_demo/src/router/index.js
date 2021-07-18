import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/views/404'
import Index from '@/views/index'
import Login from '@/views/login'
import LoadMore from '@/views/loadMore'
import H5Upload from '@/views/testUpload'
import NumberInput from '@/views/testNumberInput'
import Stepper from '@/views/stepper'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/loadMore",
      name: "loadMore",
      component: LoadMore
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/upload/h5",
      name: "h5Upload",
      component: H5Upload
    },
    {
      path: "/numberinput",
      name: "numberinput",
      component: NumberInput
    },
    {
      path: "/stepper",
      name: "stepper",
      component: Stepper
    },
    {
      path: "/imagePreview",
      name: "imagePreview",
      component: () => import("@/views/testImagePreview.vue")
    },
    {
      path: "/slidePicker",
      name: "slidePicker",
      component: () => import("@/views/slidePicker/slidePicker.vue")
    },
    {
      path: "/form",
      name: "form",
      component: () => import("@/views/form")
    },
    {
      path: "/cascadeSelect",
      name: "cascadeSelect",
      component: () => import("@/views/testCascadeSelect.vue")
    },
    {
      path: "/feedbackHealth",
      name: "feedbackHealth",
      component: () => import('@/views/work/feedbackHealth.vue')
    },
    {
      path: "*",
      name: "404",
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  
  next()
})
export default router
