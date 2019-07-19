import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/pages/Login/Login' //登录页面
import realTimeMain from '@/pages/realTime/realTimeMain' //实时监控页面,
import realTimeDeal from '@/pages/realTime/realTimeDeal' //实时监控详情页面
import accountManagement from '@/pages/accountManagement/accountManagement' //账户管理



Vue.use(Router)



export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
      children: [{
          path: 'realTimeMain',
          name: '登录页面',
          component: realTimeMain
        },
        {
          path: 'realTimeDeal',
          name: '实时监控页面',
          component: realTimeDeal,

        },
        {
          path: 'accountManagement',
          name: '账户管理',
          component: accountManagement,
        }
      ]
    },
    {
      path: '/Login',
      name: '登录',
      component: Login
    },

  ]
})
