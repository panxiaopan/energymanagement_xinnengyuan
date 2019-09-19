import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
// import http from "@/api/httpQuery";
Vue.use(Vuex)

const state = {
  stationId: '',
  stationName: '',
  hjSystemStyle: 'whiteStyle',
  hjLanguage: 'zh',
  hjAudioToken: '24.90f6fd87eef6f92dd6f7e110dee8af44.2592000.1544597603.282335-14769140',
  hjAudioPlayingMode: true,
  // showDialog: false,

  // 系统应用权限 auth--显示或隐藏
  hjSystemAuthObj: {
    // 雲平台视图
    mapAnalysisAuth: {
      auth: true,
      name: "map_analysis_group"
    },
    // 实时监控
    stationListAuth: {
      auth: true,
      name: "realtime_monitoring_group"
    },
    // 隐患管理
    alarmListAuth: {
      auth: true,
      name: "risk_manage_group"
    },
    // 运维管理
    operationManagementAuth: {
      auth: true,
      name: "operation_manage_group"
    },
    inspectionPlanAuth: {
      auth: true,
      name: "inspection_plan"
    },
    // 运维管理-工单管理
    workOrderManagementAuth: {
      auth: true,
      name: "operation_manage_work_order_manage_group"
    },
    // 运维管理-任务管理
    taskManagementAuth: {
      name: 'operation_manage_task_manage_group',
      auth: true
    },

    viewInspectionPlanAuth: {
      name: 'operation_manage_patrol_plan_group',
      auth: true
    },
    addInspectionPlanAuth: {
      name: 'operation_manage_patrol_plan_update',
      auth: true
    },
    // 分析诊断
    analysisDiagnosisAuth: {
      auth: true,
      name: 'analysis_diagnosis_group'
    },
    // 系统设置
    systemSettingAuth: {
      auth: true,
      name: "system_setting_group"
    },
    socialUnitManagementAuth: {
      auth: true,
      name: "system_setting_social_unit_device_manage_group"
    },
    // 用户权限管理
    userRightsManagementAuth: {
      auth: true,
      name: "system_setting_user_permission_manage_group"
    },
    // 人工上报
    manuallyReportAuth: {
      auth: true,
      name: 'risk_manage_manual_report'
    },

    // 派单入口
    workOrderAddAuth: {
      name: "risk_manage_start_work_order",
      auth: true
    },
    // 查看隐患详情
    viewHazardAuth: {
      name: 'risk_manage_risk_detail_view',
      auth: true
    },
    // 意见处理
    addAdviceAuth: {
      name: 'risk_manage_add_handling_opinions',
      auth: true
    },
    // 添加维保
    addMaintenanceAuth: {
      name: 'risk_manage_start_maintenance_order',
      auth: true
    },

    // 工单处理
    workOrderOperateAuth: {
      name: "work_order_manage_work_order_operate",
      auth: true
    },
    // 添加修改电站
    addAndUpdateStationAuth: {
      name: 'system_setting_social_unit_device_manage_social_unit_update',
      auth: true
    },
    // 删除电站
    deleteStationAuth: {
      name: 'system_setting_social_unit_device_manage_social_unit_delete',
      auth: true
    },

    // 添加修改设备
    addAndUpdateDeviceAuth: {
      name: 'system_setting_social_unit_device_manage_device_update',
      auth: true
    },
    deleteDeviceAuth: {
      name: 'system_setting_social_unit_device_manage_device_delete',
      auth: true
    },
    paramsSetttingAuth: {
      name: 'system_setting_social_unit_device_manage_device_param_setting',
      auth: false
    },
    remoteControlAuth: {
      name: 'realtime_monitoring_single_social_unit_detail_device_control',
      auth: false
    },
    // 账户设置 任务 任务处理
    accountSettingAuth: {
      name: 'account_manage_group',
      auth: false
    },

    // 用户权限关联
    // --添加修改用户等 包括删除社会单位 指定用户
    addAndUpdateUserAuth: {
      name: 'system_setting_user_permission_manage_user_social_unit_manage_user_social_unit_update',
      auth: true
    },
    // --删除运维人员
    deleteOpsUserAuth: {
      name: 'system_setting_user_permission_manage_user_social_unit_manage_maintainer_delete',
      auth: true
    },
    // --转换用户角色(终端-运维)
    transformUser2OpsUserAuth: {
      name: 'system_setting_user_permission_manage_user_social_unit_manage_identity_transform',
      auth: true
    },
    // --重置密码
    resetPasswordAuth: {
      name: 'system_setting_user_permission_manage_user_social_unit_manage_user_password_reset',
      auth: true
    },
    // --添加用户组
    addUserGroupAuth: {
      name: 'system_setting_user_permission_manage_group_manage_group_add',
      auth: true
    },
    // --删除用户组
    deleteUserGroupAuth: {
      name: 'system_setting_user_permission_manage_group_manage_group_delete',
      auth: true
    },
    // --添加用户组是否显示集团用户组
    addUserGroupShowGroupAuth: {
      name: 'system_setting_user_permission_manage_group_manage_group_user_group_add',
      auth: true
    },
    enterpriseUserSettingAuth: {
      name: 'system_setting_group_user_setting_group',
      auth: true
    }

  }

}
const mutations = {
  updateStationId(state, newStationId) {
    state.stationId = newStationId;
  },
  updateStationName(state, newStationName) {
    state.stationName = newStationName;
  },
  updateHjSystemStyle(state, newHjSystemStyle) {
    state.hjSystemStyle = newHjSystemStyle
  },
  updateHjSystemAuthArr(state, newHjSystemAuthArr) {

    var authObj = state.hjSystemAuthObj
    console.log("newHjSystemAuthArr", newHjSystemAuthArr, "authObj", authObj)
    Object.keys(authObj).forEach(key => {
      if (typeof authObj[key].name !== 'undefined' && typeof authObj[key].auth !== 'undefined') {

        if (newHjSystemAuthArr.includes(authObj[key].name)) {
          authObj[key].auth = true
        } else {
          authObj[key].auth = false
        }
      }
    })
    state.hjSystemAuthObj = authObj
  },
  updateHjLanguage(state, newHjLanguage) {
    state.hjLanguage = newHjLanguage
  },
  updateHjAudioPlayingMode(state, newPlayingMode) {
    state.hjAudioPlayingMode = newPlayingMode
  },
  updateHjAudioToken(state, newToken) {
    state.hjAudioToken = newToken
  },
  resetState(state) {
    console.log("root state", state)
    // state.showDialog = false
  }
}
const actions = {
  setHjSystemStyle(context, newHjSystemStyle) {
    context.commit("updateHjSystemStyle", newHjSystemStyle)
  },
  setHjSystemAuthArr(context, newHjSystemAuthArr) {
    context.commit("updateHjSystemAuthArr", newHjSystemAuthArr)
  },
  // queryEventList(context, playload){
  //   http({
  //     url
  //   })
  //   context.commit("updateEventList", newEventList)
  // },
  setHjAudioPlayingMode(context, newPlayingMode) {
    context.commit("updateHjAudioPlayingMode", newPlayingMode)
  },
  setHjAudioToken(context, newToken) {
    context.commit("updateHjAudioToken", newToken)
  },
  resetState(context, playload) {
    console.log("context root", context)
    context.commit('resetState')
  }
}
const getters = {}

import modules from './modules'
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules,
  // 引入数据持久化插件，解决页面刷新数据丢失问题
  plugins: [(new VuexPersistence({
    key: 'HjStore',
    storage: window.sessionStorage,
    reducer: state => ({
      ...state
      // alarmList: state.alarmList
    }),
    // filter: mutation => (mutation.type == 'addNavItem')
  })).plugin]
})

export default store

const initialStateCopy = JSON.parse(JSON.stringify(store.state))
console.log("initialStateCopy++++++++++++++++", initialStateCopy)
export function resetState() {
  console.log("initialStateCopy++++++++++++++++", initialStateCopy)
  store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)))
}