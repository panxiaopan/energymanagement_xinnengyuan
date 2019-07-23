// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui' //UI 框架
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
import 'font-awesome/css/font-awesome.css' // 图标库
import md5 from 'js-md5';
import store from './store'
import VCharts from 'v-charts' // 图表echarts的封装
Vue.use(VCharts)
Vue.prototype.$md5 = md5; //加密

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
// import '@/assets/css/commom.scss'
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.path == '/Login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.stringify(sessionStorage.getItem('user'))
  console.log(user == 'null')
  if (user == 'null' && to.path != '/Login') {
    next({
      path: '/Login'
    })
  } else {
    next()
  }
})
window.app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
