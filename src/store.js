import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    menusdata: {}, //用来存放菜单 
  },
  getters: {
    getmenudata: state => state.menusdata
  },

  mutations: {
    increment(state, data) { //更换状态
      state.menusdata = data
    }
  },
  actions: { //存数据方法
    savemenu({
      commit
    }, data) {
      commit('increment', data)
    }

  }

})
