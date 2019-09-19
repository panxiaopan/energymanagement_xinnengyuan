const initState = {
  carouselSetting: null,
  touDataList: [], //分时计费方案
  areaList: {
    country: [],
    province: [],
    city: [],
    county: [],
    town: [],
  },
  selectedAreaObj: {
    country: {},
    province: {},
    city: {},
    county: {},
    town: {},
  },
  stationFormData: {
    stationName: '',
    dtuSerialNum: '',
    ratedPower: '',
    batteryCapacity: '',
    latLng: '',
    area: {
      country: '',
      province: '',
      city: '',
      county: '',
      town: ''
    },
    remark: '',
    installedCompany: '',
    installedDate: '',
    touEnabled: '',
    touId: '',
    pics: [],
  },
  stationDeviceList: {
    total: 0,
    dataList: []
  },
  stationDeviceListConfig: {
    start: 0,
    size: 10,
    keyword: '',
    orderCol: '',
    orderType: 'asc'
  },
  dtuDeviceList: [],
  deviceTypeList: [],
  deviceNameList: [],

  //用户权限管理
  userTreeList: [],
  maintenanceStaffBasePropertyPage: {
    userList: {
      total: 0,
      url: '',
      json: null
    }
  }
}


export default initState