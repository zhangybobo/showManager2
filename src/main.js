// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'
import moment from 'moment'
import CusBread from '@/components/cusBread.vue'
import HttpServer from '@/components/httpServer.js'
Vue.use(HttpServer)
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
Vue.filter('fmtdat', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
Vue.component(CusBread.name, CusBread)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
