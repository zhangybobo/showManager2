import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home.vue'
import login from '@/components/login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
       name:'home',
       path:'/',
       component:home
    },
    {
      name:'login',
      path:'/login',
      component:login
   }
  ]
})
