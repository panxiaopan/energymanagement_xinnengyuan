import initState from './initState.js'
const mutations = {
  updateUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo
  },
  updateAccountInfo(state, newAccountInfo) {
    state.accountInfo = newAccountInfo
  },
  updatePermissionList(state, newPermissionList) {
    state.permissionList = newPermissionList
  },
  updateCustomSetting(state, newCustomSetting) {
    state.customSetting = newCustomSetting
  },
  // updateRegisterState(state, newState) {
  //   state.showRegister = newState
  // },
  // updateRestPasswordState(state, newState) {
  //   state.showResetPassword = newState
  // },
  resetState(state) {
    Object.assign(state, initState)
  }
}

export default mutations