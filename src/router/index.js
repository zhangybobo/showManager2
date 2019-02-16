import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home.vue'
import login from '@/components/login.vue'
import users from '@/components/users.vue'
import rights from '@/components/rights.vue'
import roles from '@/components/Roles.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: home,
      children: [
        {
          name: 'users',
          path: '/users', // <el-menu-item index="users">这里path值得index的值保持一致
          component: users
        },
        {
          name: 'rights',
          path: '/rights',
          component: rights
        },
        {
          name: 'roles',
          path: '/roles',
          component: roles
        }
      ]
    },
    {
      name: "login",
      path: "/login",
      component: login
    }
  ]
});
