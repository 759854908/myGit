// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './routes'
import Vuerouter from 'vue-router'
import elementUI from 'element-ui'
import Vuex from 'vuex'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'
import Mock from './mock/mock'
Mock.bootstrap()

Vue.use(Vuerouter)
Vue.use(elementUI)
Vue.use(Vuex)

const router = new Vuerouter({
  routes
})

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path === '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
