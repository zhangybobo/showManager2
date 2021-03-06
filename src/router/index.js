import Vue from "vue";
import { Message } from "element-ui";
import Router from "vue-router";
import home from "@/components/home.vue";
import login from "@/components/login.vue";
import users from "@/components/users.vue";
import rights from "@/components/rights.vue";
import roles from "@/components/roles.vue";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      name: "home",
      path: "/",
      component: home,
      children: [
        {
          name: "users",
          path: "/users", // <el-menu-item index="users">这里path值得index的值保持一致
          component: users
        },
        {
          name: "rights",
          path: "/rights",
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
      name: 'login',
      path: '/login',
      component: login
    }
  ]
})
router.beforeEach((to, from, next) => {
  // console.log("路由守卫执行-----");

  // ...
  // console.log(to, from)
  if (to.name === 'login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      Message.warning('请先登录')
      // alert("")
      router.push({
        name: 'login'
      })
      return
    }
    next()
  }
})
export default router
