const initState = {
  activeTabName: 'summary',
  summaryData: {
    basicInfo: null,
    chargeInfo: null,
    statusOptions: null,
    eventOptions: null,
    days15ChargeInfo: null,
    days30IncomeInfo: null,
    months12ChargeInfo: null,
    todayChargePowerInfo: null
  },
  stationListData: {
    dataList: [],
    total: 0
  },
  stationListConfig: {
    start: 0,
    size: 5,
    orderCol: "name",
    orderType: "asc",
    keyword: ""
  },
  searchStationList: [],
  showDetails: false,
  stationId: "",
  stationDetails: {
    basicData: null,
    energyData: null,
    powerData: null,
    deviceData: null
  },
  carouselStations: [],
  carouselAlarmEvents: [],
  stationScatterConfig: {
    level: 2, //1-省，2-市，3-区/县，4-镇/办事处，5-电
    leftBtmlng: 59.1231,
    leftBtmlat: 10.867139,
    rightToplng: 149.849809,
    rightToplat: 57.228578,
  },
  stationScatterList: {
    todayDischargeKwhDataList: [],
    todayChargeKwhDataList: [],
    batteryCapacityDataList: [],
    stationCountDataList: [],
  }
};

export default initState;