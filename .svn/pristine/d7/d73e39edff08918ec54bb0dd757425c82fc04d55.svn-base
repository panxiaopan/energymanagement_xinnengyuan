import systemSetting from '@/api/systemSetting.js'
const actions = {

  queryTouDataList(context, playload) {
    systemSetting.getTouDataList(context, playload, (newDataList, response) => {
      context.commit("updateTouDataList", newDataList)
    })
  },
  queryStationFormData(context, playload) {
    systemSetting.getStationFormData(context, playload, (newStationFormData, response) => {
      context.commit("updateStationFormData", newStationFormData)
    })
  },
  querySelectedAreaObj(context, playload) {
    systemSetting.getSelectedAreaObj(context, playload, (newAreaObj, response) => {
      context.commit("updateSelectedAreaObj", newAreaObj)
    })
  },
  queryAreaList(context, playload) {
    systemSetting.getAreaList(context, playload, (newAreaList, response) => {
      context.commit("updateAreaList", newAreaList)
    })
  },
  // updateDtuDeviceData(context, playload) {
  //   systemSetting.updateDtuDeviceData(playload)
  // },
  setStationDeviceListConfig(context, playload) {
    var config = Object.assign(context.state.stationDeviceListConfig, playload)
    context.commit('updateStationDeviceListConfig', config)
  },
  queryStationDeviceList(context, playload) {
    systemSetting.getStationDeviceList(context, playload, (newStationDeviceList, response) => {
      context.commit("updateStationDeviceList", newStationDeviceList)
    })
  },
  // removeStation(context, playload) {
  //   systemSetting.removeStationDevice(context, playload, (newStationDeviceList, response) => {
  //     context.commit("updateStationDeviceList", newStationDeviceList)
  //   })
  // },
  queryDtuDeviceList(context, stationId) {
    systemSetting.getDtuDeviceList(context, stationId, (newDtuDeviceList, response) => {
      context.commit("updateDtuDeviceList", newDtuDeviceList)
    })
  },
  queryDeviceTypeList(context, playload) {
    systemSetting.getDeviceTypeList(context, (newDeviceTypeList, response) => {
      context.commit("updateDeviceTypeList", newDeviceTypeList)
    })
  },
  queryDeviceNameList(context, playload) {
    systemSetting.getDeviceNameList(context, playload, (newDeviceNameList, response) => {
      context.commit("updateDeviceNameList", newDeviceNameList)
    })
  },
  removeDtuDevice(context, playload) {
    systemSetting.removeDtuDevice(context, playload, (newDtuDeviceList, response) => {
      context.commit("updateDtuDeviceList", newDtuDeviceList)
    })
  },
  submitStationForm(context, playload) {
    systemSetting.submitStationDeviceForm(context, playload, (status, response) => {
      // context.commit()  // update stationId
    })
  },
  // submitStationDeviceForm(context, playload) {
  //   systemSetting.submitStationDeviceForm(context, playload, (status, response) => {
  //     // context.commit("updateDtuDeviceList", newDtuDeviceList)
  //     // 提交成功后更新左侧DTU设备树
  //     if (status === 'success') {
  //       var {
  //         stationId
  //       } = playload
  //       systemSetting.getDtuDeviceList(context, stationId, (newDtuDeviceList, response) => {
  //         context.commit("updateDtuDeviceList", newDtuDeviceList)
  //       })
  //       context.commit('updateShowDialog', false, {
  //         root: true
  //       })
  //     }
  //   })
  // },
  resetState(context, playload) {
    context.commit("resetState")
  }
}

export default actions