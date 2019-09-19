// import login from '@/api/login.js'

const actions = {

  setUserInfo(context, playload) {
    context.commit("updateUserInfo", playload)
  },
  setCustomSetting(context, playload) {
    context.commit("updateCustomSetting", playload)
  },
  resetState(context, playload) {
    context.commit("resetState")
  }
}

export default actions