import http from "./http";
import getFormattedValueAndUnit from "@/utils/getFormattedValueAndUnit";
import getCompletedTimeValueList from '@/utils/getCompletedTimeValueList'

function getFormattedSummaryData(response, context) {
  var data = response.data && response.data.data;
  if (!!data) {
    // console.log("map summary data", data);
    var {
      days15ChargeInfo,
      days30IncomeInfo,
      months12ChargeInfo,
      todayChargePowerInfo
    } = data;
    var {
      basicInfo,
      chargeInfo
    } = data;
    if (!!basicInfo) {
      Object.keys(basicInfo).forEach(key => {
        if (!!basicInfo[key] && basicInfo[key].value) {
          basicInfo[key] = getFormattedValueAndUnit({
            data: basicInfo[key]
          });
        }
      });
    }
    if (!!chargeInfo) {
      Object.keys(chargeInfo).forEach(key => {
        if (!!chargeInfo[key] && chargeInfo[key].value) {
          chargeInfo[key] = getFormattedValueAndUnit({
            data: chargeInfo[key]
          });
        }
      });
    }
    if (!!todayChargePowerInfo) {
      let {
        chargeKwhList,
        dischargeKwhList,
        // powers
      } = todayChargePowerInfo;

      formatDataList({
        beginTime: moment().startOf('day'),
        endTime: moment().endOf('day'),
        // dateType: 'day',
        chargeKwhList,
        dischargeKwhList
      })
      console.log("chargeKwhList, dischargeKwhList+++++", chargeKwhList, dischargeKwhList)

      // if (!!powers && powers.length) {
      //   let maxValue = 1
      //   let result = getCompletedTimeValueList({
      //     dataList: powers,
      //     dateType: 'day'
      //   })
      //   if (maxValue < result.maxValue) {
      //     maxValue = result.maxValue
      //   }
      //   let {
      //     exponent,
      //     unit
      //   } = getFormattedValueAndUnit({
      //     data: maxValue,
      //     baseUnit: 'w'
      //   });
      //   powers.forEach(item => {
      //     let value = [item.time, (item.value / Math.pow(10, exponent)).toFixed(2)]
      //     item['value'] = value
      //     item['unit'] = unit
      //   });
      // }
    }
    if (!!days15ChargeInfo) {
      let {
        chargeKwhList,
        dischargeKwhList
      } = days15ChargeInfo;
      formatDataList({
        chargeKwhList,
        dischargeKwhList,
        beginTime: moment().add(-14, 'days'),
        endTime: moment(),
        formatStr: "YYYY-MM-DD",
        period: 1,
        periodType: 'days'
      })
    }

    if (!!days30IncomeInfo) {
      let {
        incomeList
      } = days30IncomeInfo;
      if (!!incomeList && incomeList.length) {
        let maxValue = 1
        let result = getCompletedTimeValueList({
          dataList: incomeList,
          beginTime: moment().add(-29, 'days'),
          endTime: moment().add(-1, 'days'),
          formatStr: 'YYYY-MM-DD',
          period: 1,
          periodType: 'days'
        })
        if (maxValue < result.maxValue) {
          maxValue = result.maxValue
        }
        let {
          exponent,
          unit
        } = getFormattedValueAndUnit({
          data: maxValue,
          baseUnit: '￥'
        });
        incomeList.forEach(item => {
          let value = [item.time, (item.value / Math.pow(10, exponent)).toFixed(2)]
          item['value'] = value
          item['unit'] = unit
        });
      }
    }
    if (!!months12ChargeInfo) {
      let {
        chargeKwhList,
        dischargeKwhList
      } = months12ChargeInfo;
      formatDataList({
        chargeKwhList,
        dischargeKwhList,
        beginTime: moment().add(-11, 'months'),
        endTime: moment(),
        formatStr: "YYYY-MM",
        period: 1,
        periodType: 'months'
      })
    }
  } else {
    data = {
      basicInfo: null,
      chargeInfo: null,
      eventInfo: null,
      stationStaus: null,
      days15ChargeInfo: null,
      days30IncomeInfo: null,
      months12ChargeInfo: null,
      todayChargePowerInfo: null
    }
  }

  console.log("todayChargePowerInfo+++++++++++++++++++++++", todayChargePowerInfo)
  // Object.assign(data, {
  //   days15ChargeInfo,
  //   days30IncomeInfo,
  //   months12ChargeInfo,
  //   todayChargePowerInfo
  // })
  return data;
}

function getFormattedStationListData(response, context) {
  var data = response.data && response.data.data;
  var dataList = [],
    total = 0;
  if (!!data) {
    total = data.total || context.state.stationListData.total;
    // console.log("map station list data", data);
    dataList = data.rows || context.state.stationListData.dataList;
    var valueKeyArr = [
      "activePower",
      "availableChargeCapacity",
      "availableDischargeCapacity",
      "batteryCapacity",
      "ratedPower",
      "todayChargeKwh",
      "todayDischargeKwh",
      "todayIncome",
      "totalChargeKwh",
      "totalDischargeKwh"
    ];
    dataList.forEach(item => {
      item &&
        Object.keys(item).forEach(key => {
          if (valueKeyArr.includes(key)) {
            item[key] = getFormattedValueAndUnit({
              data: item[key]
            });
          }
        });
    });
    // console.log("dataList, dataList);
  }
  return {
    dataList,
    total
  };
}

function getFormattedCarouselStations(response, context) {
  var data = response.data && response.data.data;
  var carouselStations = []
  // console.log("data carousel api", data)
  if (!!data) {
    // console.log("carousel station data", data);
    let valueKeyArr = [
      "activePower",
      "availableChargeCapacity",
      "availableDischargeCapacity",
      "batteryCapacity",
      "ratedPower",
      "todayChargeKwh",
      "todayDischargeKwh",
      "todayIncome"
    ];
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (valueKeyArr.includes(key)) {
          item[key] = getFormattedValueAndUnit({
            data: item[key]
          });
        }
        if (key === "totalSOH") {
          item[key] = getFormattedValueAndUnit({
            data: item[key],
            percent: true
          });
        }
      });
    });
    carouselStations = data;
  }
  return carouselStations
}

function getFormattedCarouselAlarmEvents(response, context) {
  var data = response.data && response.data.data;
  var newAlarmEvents = []
  if (!!data && data.length) {
    newAlarmEvents = data
  }
  return newAlarmEvents
}

function getFormattedStationDetails(response, {
  state
}) {
  var data = response.data && response.data.data;
  var basicData = null, //基本信息
    energyData = null, //电量
    powerData = null, //功率
    deviceData = null; //设备树
  if (!!data) {
    console.log("map station details data", data);
    let {
      basicInfo,
      deviceStatusTree,
      energys,
      powers
    } = data;
    let valueKeyArr = [
      "activePower",
      "reactivePower",
      "availableChargeCapacity",
      "availableDischargeCapacity",
      "batteryCapacity",
      "ratedPower",
      "todayChargeKwh",
      "todayDischargeKwh",
      "batteryMaxTemperature"
    ];
    basicInfo &&
      Object.keys(basicInfo).forEach(key => {
        if (key === 'conversionEff') {
          basicInfo['transformRate'] = getFormattedValueAndUnit({
            data: basicInfo[key],
            percent: true
          });
        }
        if (valueKeyArr.includes(key)) {
          basicInfo[key] = getFormattedValueAndUnit({
            data: basicInfo[key]
          });
        }
      });
    basicData = basicInfo;
    // console.log("basicData", basicData);
    if (!!energys) {
      let {
        chargeKwhList,
        dischargeKwhList
      } = energys;
      let maxValue = 1
      if (!!chargeKwhList && chargeKwhList.length > 0) {
        let result = getCompletedTimeValueList({
          beginTime: moment().add(-15, 'days'),
          endTime: moment().add(-1, 'days'),
          dataList: chargeKwhList,
          period: 1,
          periodType: 'day',
          formatStr: 'YYYY-MM-DD'
        })
        if (maxValue < result.maxValue) {
          maxValue = result.maxValue
        }
      }
      if (!!dischargeKwhList && dischargeKwhList.length > 0) {
        let result = getCompletedTimeValueList({
          beginTime: moment().add(-15, 'days'),
          endTime: moment().add(-1, 'days'),
          dataList: dischargeKwhList,
          period: 1,
          periodType: 'day',
          formatStr: 'YYYY-MM-DD'
        })
        if (maxValue < result.maxValue) {
          maxValue = result.maxValue
        }
      }
      let {
        exponent,
        unit
      } = getFormattedValueAndUnit({
        data: maxValue,
        baseUnit: 'kwh'
      });
      if (!!chargeKwhList && chargeKwhList.length > 0) {
        chargeKwhList.forEach(item => {
          let value = [item.time, (item.value / Math.pow(10, exponent)).toFixed(2)]
          item['value'] = value
          item['unit'] = unit
        });
      }
      if (!!dischargeKwhList && dischargeKwhList.length > 0) {
        dischargeKwhList.forEach(item => {
          let value = [item.time, (item.value / Math.pow(10, exponent)).toFixed(2)]
          item['value'] = value
          item['unit'] = unit
        });
      }
      energyData = energys;
    }
    if (!!powers) {
      let {
        activePowerList,
        reactivePowerList
      } = powers;
      let maxValue = 1
      if (!!activePowerList && activePowerList.length > 0) {
        let result = getCompletedTimeValueList({
          dataList: activePowerList,
          dateType: 'day'
        })
        if (maxValue < result.maxValue) {
          maxValue = result.maxValue
        }
      }
      if (!!reactivePowerList && reactivePowerList.length > 0) {
        let result = getCompletedTimeValueList({
          dataList: reactivePowerList,
          dateType: 'day'
        })
        if (maxValue < result.maxValue) {
          maxValue = result.maxValue
        }
      }
      let {
        exponent,
        unit
      } = getFormattedValueAndUnit({
        data: maxValue,
        baseUnit: 'w'
      });
      if (!!activePowerList && activePowerList.length > 0) {
        activePowerList.forEach(item => {
          let value = [item.time, (item.value / Math.pow(10, exponent)).toFixed(2)]
          item['value'] = value
          item['unit'] = unit
        });
      }
      if (!!reactivePowerList && reactivePowerList.length > 0) {
        reactivePowerList.forEach(item => {
          let value = [item.time, (item.value / Math.pow(10, exponent)).toFixed(2)]
          item['value'] = value
          item['unit'] = unit
        });
      }
      powerData = powers;
    }
    if (!!deviceStatusTree && deviceStatusTree.length > 0) {
      let nodeKey = 0;
      deviceStatusTree.forEach(item => {
        item.nodeKey = ++nodeKey;
        if (item.subNodes) {
          item.subNodes.forEach(subItem => {
            subItem.nodeKey = ++nodeKey;
          });
        }
      });
      deviceData = deviceStatusTree;
    }
  }
  return {
    basicData,
    energyData,
    powerData,
    deviceData
  };
}

function formatDataList({
  chargeKwhList,
  dischargeKwhList,
  beginTime,
  endTime,
  // dateType = 'month',
  formatStr = "YYYY-MM-DD HH:mm:ss",
  period = 15 * 60 * 1000,
  periodType = 'ms'
}) {

  let maxValue = 1
  if (!!chargeKwhList && chargeKwhList.length) {
    let result = getCompletedTimeValueList({
      dataList: chargeKwhList,
      beginTime,
      endTime,
      period,
      periodType,
      formatStr
    })
    if (maxValue < result.maxValue) {
      maxValue = result.maxValue
    }
  }
  if (!!dischargeKwhList && dischargeKwhList.length) {
    let result = getCompletedTimeValueList({
      dataList: dischargeKwhList,
      beginTime,
      endTime,
      period,
      periodType,
      formatStr
    })
    if (maxValue < result.maxValue) {
      maxValue = result.maxValue
    }
  }
  let {
    exponent,
    unit
  } = getFormattedValueAndUnit({
    data: maxValue,
    baseUnit: 'kwh'
  });
  if (!!chargeKwhList && chargeKwhList.length) {
    chargeKwhList.forEach(item => {
      let value = [item.time, (item.value / Math.pow(10, exponent)).toFixed(2)]
      item['value'] = value
      item['unit'] = unit
    });
  }
  if (!!dischargeKwhList && dischargeKwhList.length) {
    dischargeKwhList.forEach(item => {
      let value = [item.time, (item.value / Math.pow(10, exponent)).toFixed(2)]
      item['value'] = value
      item['unit'] = unit
    });
  }
  // console.log("chargeKwhList, dischargeKwhList+++++", chargeKwhList, dischargeKwhList)
  return maxValue
}

function getFormattedStationScatterList(response) {
  var data = response.data && response.data.data;
  var todayDischargeKwhDataList = [],
    todayChargeKwhDataList = [],
    batteryCapacityDataList = [],
    stationCountDataList = []
  if (!!data) {
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        var result, value = ''
        switch (key) {
          case "batteryCapacity":
            result = getFormattedValueAndUnit({
              data: item[key]
            });
            value = [item.lng, item.lat, (result && result.value) || "--", (result && result.unit) || "--", item.status && item.status.value || 4];
            // name = item.name || '--'
            item[key] = result
            batteryCapacityDataList.push({
              ...item,
              value
            });
            break;
          case "todayChargeKwh":
            result = getFormattedValueAndUnit({
              data: item[key]
            });
            value = [item.lng, item.lat, (result && result.value) || "--", (result && result.unit) || "--", item.status && item.status.value || 4];
            // name = item.name || '--'
            item[key] = result
            todayChargeKwhDataList.push({
              ...item,
              value
            });
            break;
          case "todayDischargeKwh":
            result = getFormattedValueAndUnit({
              data: item[key]
            });
            value = [item.lng, item.lat, (result && result.value) || "--", (result && result.unit) || "--", item.status && item.status.value || 4];
            // name = item.name || '--'
            item[key] = result
            todayDischargeKwhDataList.push({
              ...item,
              value
            });
            break;
          case "stationCount":
            value = [item.lng, item.lat, item[key] || "--", "count", item.status && item.status.value || 4];
            // name = item.name || '--'
            stationCountDataList.push({
              ...item,
              value
            });
            break;
          default:
            break;
        }
      });
    });
  }
  console.log("get stationScatterList api+++++++++++")
  return {
    todayDischargeKwhDataList,
    todayChargeKwhDataList,
    batteryCapacityDataList,
    stationCountDataList
  }
}

export default {
  getSummaryData(context, cb) {
    var url = "./map/summary";
    http({
      url
    }).then(response => {
      // (status, response) => {
      let newSummaryData = getFormattedSummaryData(response, context);
      cb(newSummaryData, status, response);
      // }
    });
  },
  getStationListData(context, cb) {
    var url = "./stations/navigation";
    var {
      start,
      size,
      orderCol,
      orderType,
      keyword
    } = context.state.stationListConfig;
    var json = {
      start,
      size,
      orderCol,
      orderType,
      keyword
    };
    http({
      url,
      json
    }).then(response => {
      let newStationListData = getFormattedStationListData(response, context);
      cb(newStationListData, status, response);
    });
  },
  getSearchStationList(context, cb) {

  },
  getStationDetails(context, cb) {
    const stationId = context.state.stationId;
    var url = `./stations/navigation/${stationId}/detail`;
    http({
      url
    }).then(response => {
      let newStationDetails = getFormattedStationDetails(response, context);
      cb(newStationDetails, status, response);
    });
  },
  getCarouselStations(context, cb) {
    var url = "./stations/carousel"
    http({
      url
    }).then(response => {
      let newCarouselStations = getFormattedCarouselStations(response, context);
      cb(newCarouselStations, status, response);
    });
  },
  getCarouselAlarmEvents(context, cb) {
    var url = "./events/carousel";
    http({
      url
    }).then(response => {
      let newCarouselAlarmEvents = getFormattedCarouselAlarmEvents(response, context);
      cb(newCarouselAlarmEvents, status, response);
    });
  },
  getStationScatterList(context, cb) {
    var url = "./map/stations";
    var json = { ...context.state.stationScatterConfig
    }
    http({
      url,
      json
    }).then(response => {
      let newStationScatterList = getFormattedStationScatterList(response, context);
      cb(newStationScatterList, status, response);
    });
  }
};