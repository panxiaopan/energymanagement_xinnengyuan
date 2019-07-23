import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/pages/Login/Login' //登录页面

import realTimeMain from '@/pages/realTime/realTimeMain' //实时监控详情页面
import accountManagement from '@/pages/accountManagement/accountManagement' //账户管理
import alarmlist from '@/pages/alarmList/alarmlist'
import mapPages from '@/pages/mapPages/mapPages'
import operationManagement from '@/pages/operationManagement/operationManagement'
import systemSetting from '@/pages/systemSetting/systemSetting'


//实时监控页面,//两个菜单.有单独配了一个不通的不布局
import realTimeDeal from '@/Energycompany/realTimeDeal'

import collect from '@/Energycompany/collect/collect'

Vue.use(Router)
export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
      children: [{
          path: '/realTimeMain',
          name: '实时监控',
          component: realTimeMain
        },

        {
          path: '/accountManagement',
          name: '账户管理',
          component: accountManagement,
        },
        {
          path: '/alarmlist',
          name: '报警列表',
          component: alarmlist,
        },
        {
          path: '/mapPages',
          name: '地图首页',
          component: mapPages,
        },
        {
          path: '/operationManagement',
          name: '运维管理',
          component: operationManagement,
        },
        {
          path: '/systemSetting',
          name: '系统设置',
          component: systemSetting,
        },



      ]
    },
    {
      path: '/',
      name: '实时监控页面详情',
      component: realTimeDeal,
      children: [{
        path: '/collect/:id',
        name: "能源汇总",
        component: collect
      }]
    },



    {
      path: '/Login',
      name: '登录',
      component: Login
    },

  ]
})
