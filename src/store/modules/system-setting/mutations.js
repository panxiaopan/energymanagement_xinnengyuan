import initState from './initState.js'

function checkChildArr(arr) {
  if (!arr || !arr.length) {
    return;
  }
  arr.forEach(item => {
    if (!item.subTrees) {
      return;
    }
    // item.id=item.id+''
    if (!item.subTrees.length) {
      item.subTrees = undefined;
      return;
    }
    checkChildArr(item.subTrees);
  });
}
const mutations = {
  updateCarouselSetting(state, newCarouselSetting) {
    state.carouselSetting = newCarouselSetting
  },
  updateStationFormData(state, newStationFormData) {
    state.stationFormData = newStationFormData
  },
  updateAreaList(state, newAreaList) {
    state.areaList = newAreaList
  },
  updateSelectedAreaObj(state, newAreaObj) {
    state.selectedAreaObj = newAreaObj
  },
  updateStationDeviceListConfig(state, newStationDeviceListConfig) {
    state.stationDeviceListConfig = newStationDeviceListConfig
  },
  updateStationDeviceList(state, newStationDeviceList) {
    state.stationDeviceList = newStationDeviceList
  },
  updateDtuDeviceList(state, newDtuDeviceList) {
    state.dtuDeviceList = newDtuDeviceList
  },
  updateDeviceTypeList(state, newDeviceTypeList) {
    state.deviceTypeList = newDeviceTypeList
  },
  updateDeviceNameList(state, newDeviceNameList) {
    state.deviceNameList = newDeviceNameList
  },
  resetState(state) {
    Object.assign(state, initState)
  },
  updateUserTreeList(state, newUserTreeList) {
    state.userTreeList = newUserTreeList;
    checkChildArr(state.userTreeList);
  },
  updateMaintenanceEditePage(state, newUserList) {
    state.maintenanceStaffBasePropertyPage.userList = newUserList;
  },
  updateTouDataList(state, newTouDataList) {
    state.touDataList = newTouDataList
  }
}

export default mutations