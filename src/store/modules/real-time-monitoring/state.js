const state = {

  socialUnit: {
    id: NaN,
    name: '--',
    address: '--'
  },
  device: {
    id: NaN,
    name: '--',
    address: '--'
  },
  activeTabName: 'socialUnitDetails',
  stationList: {
    dataList: [{
      socialUnit: '1#华杰电气技术有限公司',
      address: '深圳市南山区',
      deviceCount: '17',
      onlineCount: '15',
      offlineCount: '2',
      todoHazard: '8',
      doingHarad: '5'
    }],
    total: 0,
  },
  stationListConfig: {
    start: 0,
    size: 7,
    keyword: '',
    deviceStatus: "",
    chargeStatus: "",
    batCapacityLowerLimit: "",
    batCapacityHigherLimit: ""
  }
}
export default state