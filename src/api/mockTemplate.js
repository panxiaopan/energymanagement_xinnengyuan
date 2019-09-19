const Mock = require("mockjs");
const Random = Mock.Random;

import timeValueGenerator from './timeValueGenerator'
// 社会单位 设备名称 执行人 列表模板{id, name}
const template1 = {
  head: {
    code: 0
  },
  "data|5-10": [{
    "id|+1": '@increment()',
    name: Random.ctitle(5)
  }],
  // total: Random.natural(5, 10)
  // }
};

//隐患详情
const template2 = {
  head: {
    code: 0
  },
  data: {
    "basicInfo": {
      "socialUnit": {
        "id": '@integer(1,100)',
        "name": '@cword(3, 5)',
        "address": '@county(true)',
        "addrjson": {
          "country": "中国",
          "province": '@province()',
          "city": '@city()',
          "county": '@county()',
          "town": 'town',
          "remark": "remark"
        },
        "city": '@city()',
        "manResponsibleForFireSecurity": {
          "name": '@cname()',
          "tel": "13378956412"
        }
      },
      "device": {
        "id": '@integer(1,100)',
        "name": "@cword(3,5)",
        "address": '@county(true)',
      },
      "deviceStatus": {
        "value": 30,
        "desc": "报警"
      }
    },
    "riskGrade": {
      "value": 30,
      "desc": "报警"
    },
    "riskDesc": {
      "description": function () {
        let desc = ['电流超上限', '电压超上限', '剩余电流超上限']
        let randomNumber = Math.round(Math.random() * 2)
        return desc[randomNumber]
      },
      // "alarmData": {
      //   "time": '@datetime("yyyy-MM-dd HH:mm:ss")',
      //   "value": '@float(60, 100, 2)',
      //   "unit": 'A',
      //   'measureName': '剩余电流',
      //   'dataId': 1
      // }
      "alarmDataMeasureNames": function () {
        return ['电压1', '电压2']
      },
      "alarmValueUnit": {
        "value": 48.26874,
        "unit": 'v'
      },
      "alarmTime": moment().format("YYYY-MM-DD 08:03:20")
    },
    // "realtimeData": [{
    //   'name': '剩余电流',
    //   'value': [{
    //     "dataId": 4,
    //     "unit": "mA",
    //     "value": "@float(60, 100, 3, 5)",
    //     "type": 1,
    //   }]
    // }, {
    //   'name': '温度',
    //   'value|1-5': [{
    //     "dataId": 133,
    //     "unit": "℃",
    //     "value": "@float(60, 100, 3, 5)",
    //     "type": 1
    //   }]
    // }, {
    //   "name": '电压',
    //   'value|1-5': [{
    //     "dataId": 30,
    //     "unit": "V",
    //     "value": '@float(60, 100, 3, 5)',
    //     "type": 1
    //   }]
    // }, {
    //   "name": '电流',
    //   'value|1-5': [{
    //     "dataId": 30,
    //     "unit": "A",
    //     "value": '@float(60, 100, 3, 5)',
    //     "type": 1
    //   }]
    // }],
    "realtimeData": {
      "residualCurrents|1-5": [{
        "dataId": 4,
        "unit": "mA",
        "value": "@float(60, 100, 3, 5)",
        "type": 1,
        "measureName": '剩余电流' + '@increment()'
      }],
      "temperatures|1-5": [{
        "dataId": 133,
        "unit": "℃",
        "value": "@float(60, 100, 3, 5)",
        "type": 1,
        "measureName": '温度' + '@increment()'
      }],
      "voltages|1-5": [{
        "dataId": 30,
        "unit": "V",
        "value": '@float(60, 100, 3, 5)',
        "type": 1,
        "measureName": '电压' + '@increment()'
      }],
      "currents|1-5": [{
        "dataId": 33,
        "unit": "A",
        "value": "@float(60, 100, 3, 5)",
        "type": 1,
        "measureName": '电流' + '@increment()'
      }]
    },
    "alarmDataTimeValues": function () {
      let timeValue = []
      let randomNumber = Math.round((Math.random()) * 2 + 1)
      for (let i = 0; i < 2; i++) {
        // 返回报警前后3天的数据
        timeValue.push(timeValueGenerator({
          beginTime: moment().add(-1, 'days').format("YYYY-MM-DD 00:00:00"),
          endTime: moment().add(1, 'days').format("YYYY-MM-DD 23:59:59"),
          valueMax: 2000
        }))
      }
      return {
        logsList: timeValue,
        interval: {
          unit: "MINUTE",
          value: 15
        }
      }
    }


  }
}
//隐患管理
const template4 = {
  head: {
    code: 0,
  },
  data: {
    "rows|5-8": [{
      "id": '@integer(1,100)',
      "eventTime": '@datetime("yyyy-MM-dd HH:mm:ss")',
      "socialUnit": {
        "id": 32,
        "name": "康和盛大厦光伏电站",
        "address": "深圳市南山区西丽街道办事处新能源创新产业园",
        "addrjson": {
          "country": "中国",
          "province": "广东省",
          "city": "深圳市",
          "county": "南山区",
          "town": "西丽街道办事处",
          "remark": "新能源创新产业园"
        },
        "city": "深圳市"
      },
      "device": {
        "id": 165,
        "name": "1#电气火灾探测器-1",
        "address": ""
      },
      "riskGrade": {
        "value": '@integer(1,3)' + '0',
        "desc": function () {
          let status = {
            '10': '信息',
            '20': '预警',
            '30': '报警',
          }
          return status[this.value]
        }
      },
      "riskState": {
        "value": '@integer(1,3)' + '0',
        "desc": function () {
          let status = {
            '10': '待处理',
            '20': '处理中',
            '30': '完成',
          }
          return status[this.value]
        }
      },
      "description": "{'desc': '剩余电流超限'}",
      "attachedWorkOrderId": '@integer(1,20)',
      "solution": {
        "dealer": {
          "id": 1,
          "name": "超级管理员"
        },
        "time": '@datetime("yyyy-MM-dd HH:mm:ss")',
        "desc": "无问题，直接关闭"
      },
      "attachedOverLimitReturnId": "",
      "attachedOverLimitReturnTime": ""
    }],
    "total": function () {
      return this.rows.length
    }
  }
}
// 单个社会单位隐患列表
const template7 = {
  head: {
    code: 0,
  },
  data: {
    "total": '@integer(1,50)',
    "rows": [{
      "id": '@integer(1,100)',
      "eventTime": '@datetime("yyyy-MM-dd HH:mm:ss")',
      "device": {
        "id": '@integer(1,100)',
        "name": "电气火灾探测器#2",
        "address": "4楼"
      },
      "riskGrade": {
        "value": 30,
        "desc": "报警"
      },
      "riskState": {
        "value": 30,
        "desc": "完成"
      },
      "description": "{}",
      "attachedWorkOrderId": 10,
      "solution": {
        "dealer": {
          "id": 1,
          "name": "超级管理员"
        },
        "time": '@datetime("yyyy-MM-dd HH:mm:ss")',
        "desc": "无问题，直接关闭"
      },
      "attachedOverLimitReturnId": "",
      "attachedOverLimitReturnTime": ""
    }]
  }
}
const template8 = {
  head: {
    code: 0,
  },
  data: {
    "total": 3,
    "rows": [{
      "id": 13,
      "eventTime": '@datetime("yyyy-MM-dd HH:mm:ss")',
      "riskGrade": {
        "value": '@integer(1,3)' + '0',
        "desc": function () {
          let status = {
            '10': '信息',
            '20': '预警',
            '30': '报警',
          }
          return status[this.value]
        }
      },
      "riskState": {
        "value": '@integer(1,3)' + '0',
        "desc": function () {
          let status = {
            '10': '待处理',
            '20': '处理中',
            '30': '完成',
          }
          return status[this.value]
        }
      },
      "description": "{}",
      "attachedWorkOrderId": "",
      "solution": {
        "dealer": "",
        "time": "",
        "desc": ""
      },
      "attachedOverLimitReturnId": "",
      "attachedOverLimitReturnTime": ""
    }]
  }
}

//社会单位详情
const template3 = {
  head: {
    code: 0
  },
  data: {
    "basicInfo": {
      "id": '@integer(1,100)',
      "name": '@cword(3, 5)',
      "address": '@county(true)',
      "addrjson": {
        "country": "中国",
        "province": '@province()',
        "city": '@city()',
        "county": '@county()',
        "town": 'town',
        "remark": "remark"
      },
      "city": '@city()',
      "manResponsibleForFireSecurity": {
        "name": '@cname()',
        "tel": "13378956412"
      }
    },
    'deviceStatusWithCounts': [{
      "value": 10,
      "desc": "正常",
      "count": '@integer(5,50)'
    }, {
      "value": 20,
      "desc": "通信中断",
      "count": '@integer(5,50)'
    }, {
      "value": 30,
      "desc": "报警",
      "count": '@integer(5,50)'
    }, {
      "value": 40,
      "desc": "故障",
      "count": '@integer(5,50)'
    }],

    "deviceRiskStatistic": {
      "leftRiskCount": '@integer(5,50)',
      "totalAlarmRiskCount": '@integer(5,50)',
      "totalEarlyWarningRiskCount": '@integer(20,50)',
      "riskTimeCounts": timeValueGenerator({
        precision: 0
      })
    }
  }
};
// 社会单位名称列表
const template6 = {
  head: {
    code: 0
  },
  data: {
    "total": '@integer(10,50)',
    "rows|5-8": [{
      "id": '@integer(10,50)',
      "name": '@cword(3,5)' + "有限公司",
      "address": "深圳市南山区西丽街道办事处新能源创新产业园",
      "addrjson": {
        "country": "中国",
        "province": "广东省",
        "city": "深圳市",
        "county": "南山区",
        "town": "西丽街道办事处",
        "remark": "新能源创新产业园"
      },
      "city": "深圳市",
      "status": {
        "value": '@integer(1,4)' + '0',
        "desc": function () {
          let status = {
            '10': '正常',
            '20': '离线',
            '30': '告警',
            '40': '故障',
          }
          return status[this.value]
        },
      },
      "updateTime": '@datetime("yyyy-MM-dd HH:mm:ss")'
    }]
  }
}
// 社会单位列表
const template5 = {
  head: {
    code: 0
  },
  data: {
    "total": '@integer(10,50)',
    "rows|5-10": [{
      "id": '@integer(10,50)',
      "name": "华杰电气技术有限公司",
      "addrjson": {
        "country": "中国",
        "province": "广东省",
        "city": "深圳市",
        "county": "南山区",
        "town": "西丽街道办事处",
        "remark": "新能源创新产业园"
      },
      "address": "深圳市南山区西丽街道办事处新能源创新产业园",
      "city": "深圳市",
      "totalDeviceCount": '@integer(20, 50)',
      "offlineDeviceCount": '@integer(0, 10)',
      "onlineDeviceCount": '@integer(20, 40)',
      "pendingRiskCount": '@integer(10, 30)',
      "processingRiskCount": '@integer(50, 100)',

      "status": {
        "value": '@integer(1,4)' + '0',
        "desc": function () {
          let status = {
            '10': '正常',
            '20': '离线',
            '30': '告警',
            '40': '故障',
          }
          return status[this.value]
        },
      },
      "updateTime": '@datetime("yyyy-MM-dd HH:mm:ss")'
    }]
  }
}

// 社会单位下的设备列表
const template9 = {
  head: {
    code: 0
  },
  data: {
    "total": '@integer(10,50)',
    "rows|1-7": [{
      "id": '@integer(1,50)',
      "name": function () {
        return "电气火灾探测器#" + Math.round(Math.random() * 100)
      },
      "address": function () {
        // let floor = Math.round(Math.random() * 100)
        return "康和盛大厦406"
      },
      "status": {
        "value": '@integer(1,4)' + '0',
        "desc": function () {
          let status = {
            '10': '正常',
            '20': '离线',
            '30': '告警',
            '40': '故障',
          }
          return status[this.value]
        }
      },
      "updateTime": '@datetime("yyyy-MM-dd HH:mm:ss")'
    }]
  }
}
// 设备实时数据
const template10 = {
  head: {
    code: 0
  },
  "data|5-8": [{
    "dataId": '@increment()',
    "measureName": '@last()' + '电压' + '@increment()',
    "value": "@float(50, 200, 2, 3)",
    "unit": "V",
    "type": 1,
    "inEarlyWarningState": "@boolean(1)",
    "inAlarmState": "@boolean(1)"
  }]
}
// 设备关联工单列表
const template11 = {
  head: {
    code: 0
  },
  "data": {
    "total": 0,
    "rows|5-8": [{
      "workOrderVO": {
        "id": '@integer(10,50)',
        "number": "XQ2018091100001",
        "socialUnit": {
          "id": 32,
          "name": "康和盛大厦光伏电站"
        },
        "device": {
          "id": 165,
          "name": "凤池李汉金10.26kW_逆变器-1"
        },
        "startUser": {
          "id": 1,
          "name": "超级管理员",
          "tel": "13012345678",
        },
        "executor": "",
        "sourceId": 2345,
        "sourceTime": '@datetime("yyyy-MM-dd HH:mm:ss")',
        "title": "测试",
        "description": "漏电流超标",
        "updateTime": '@datetime("yyyy-MM-dd HH:mm:ss")',
        "startTime": '@datetime("yyyy-MM-dd HH:mm:ss")',
        "endTime": "",
        "type": {
          "desc": '消缺',
          "value": 1
        },
        "state": {
          "desc": '待接收',
          "value": 200
        },

        "processInstanceId": "277537",
        "flowStateCode": 1,
        "finished": "@boolean(1)"
      },
      "task": {
        "id": "277553",
        "name": "完成工单，提交关闭申请",
        "createTime": '@datetime("yyyy-MM-dd HH:mm:ss")',
        "endTime": "",
        "actioners": {
          "0": {
            "id": 1,
            "name": "超级管理员",
            "tel": "13012345678"
          },
        }
      }
    }]
  }
}

//地图首页汇总
const template12 = {
  head: {
    code: 0
  },
  "data": {
    "deviceStatusStatisticsVO": {
      "deviceStatusWithCounts": [{
        "value": 10,
        "desc": "正常",
        "count": '@integer(5,50)'
      }, {
        "value": 20,
        "desc": "离线",
        "count": '@integer(5,50)'
      }, {
        "value": 30,
        "desc": "报警",
        "count": '@integer(5,50)'
      }, {
        "value": 40,
        "desc": "故障",
        "count": '@integer(5,50)'
      }],
      "socialUnitStatusWithCounts": [{
        "value": 10,
        "desc": "正常",
        "count": '@integer(5,50)'
      }, {
        "value": 20,
        "desc": "离线",
        "count": '@integer(5,50)'
      }, {
        "value": 30,
        "desc": "报警",
        "count": '@integer(5,50)'
      }, {
        "value": 40,
        "desc": "故障",
        "count": '@integer(5,50)'
      }]
    },
    "riskVariationTrendVO": {
      "riskTimeCounts": timeValueGenerator({
        beginTime: moment().add(-29, 'days'),
        endTime: moment(),
        period: 24 * 60 * 60,
        precision: 0
      })
    },
    "riskStatisticsVO": {
      "risksByGrade": [{
        "value": 10,
        "desc": "信息",
        "count": '@integer(5,50)'
      }, {
        "value": 20,
        "desc": "预警",
        "count": '@integer(5,50)'
      }, {
        "value": 30,
        "desc": "报警",
        "count": '@integer(5,50)'
      }],
      "risksByReason": [{
        "value": 10001,
        "desc": "断线",
        "count": '@integer(5,50)'
      }, {
        "value": 20001,
        "desc": "漏电",
        "count": '@integer(5,50)'
      }, {
        "value": 20002,
        "desc": "过温",
        "count": '@integer(5,50)'
      }, {
        "value": 20003,
        "desc": "过压",
        "count": '@integer(5,50)'
      }, {
        "value": 20004,
        "desc": "欠压",
        "count": '@integer(5,50)'
      }, {
        "value": 20005,
        "desc": "过流",
        "count": '@integer(5,50)'
      }, {
        "value": 20006,
        "desc": "短路",
        "count": '@integer(5,50)'
      }],
      "risksByArea|1-5": [{
        "value": "",
        "desc": "西丽街道办事处" + '@increment()',
        "count": '@integer(5,50)'
      }],
      "risksByIndustry|1-5": [{
        "value": 1,
        "desc": "学校" + '@increment()',
        "count": '@integer(5,50)'
      }]
    },
    "realtimeRisksVO": {
      "risks|1-5": [{
        "id": 1,
        "time": '@datetime("yyyy-MM-dd HH:mm:ss")',
        "socialUnit": {
          "id": 1,
          "name": "华杰电气技术有限公司",
          "address": "深圳市南山区西丽街道办事处新能源创新产业园",
          "addrjson": {
            "country": "中国",
            "province": "广东省",
            "city": "深圳市",
            "county": "南山区",
            "town": "西丽街道办事处",
            "remark": "新能源创新产业园"
          },
          "city": "深圳市"
        },
        "device": {
          "id": 1,
          "name": "电气火灾探测器-1",
          "address": "4楼"
        },
        "riskGrade": {
          "value": 30,
          "desc": "报警"
        },
        "detail": ""
      }],
      "leftRisksByStatus": [{
        "value": 10,
        "desc": "待处理",
        "count": 10
      }, {
        "value": 20,
        "desc": "处理中",
        "count": 30
      }, {
        "value": 30,
        "desc": "完成",
        "count": 0
      }],
    },
    "riskMonthStatisticsVO": {
      "currentTotalCount": 20,
      "yearOnYearInfo": {
        "value": '@integer(10, 50)',
        "growthPercent": function () {
          // console.log("this.growth++++++", this)
          let rate = ((this.value - 20) / 20).toFixed(2)
          return rate
        }
      },
      "monthOnMonthInfo": {
        "value": '@integer(10, 50)',
        "growthPercent": function () {
          let rate = ((this.value - 20) / 20).toFixed(2)
          return rate
        }
      }
    }
  }
}
//地图社会单位分布
const template13 = {
  "head": {
    "code": 0,
    "msg": "成功"
  },
  "data|1-5": [{
    "nodeId": '@integer(1,50)',
    'num': '@integer(0,9)', //随机数
    'indexNum': '@increment()',
    // "latitude": 22.568636,
    // "longitude": 113.95918,

    // 北京 上海 广州 深圳 杭州 
    "latitude": function () {
      let lat = [39.952114, 31.285939, 23.171725, 22.557936, 30.285243]
      console.log(this)
      return lat[(this.indexNum + 1) % 5 - 1]
    },
    "longitude": function () {
      let lng = [116.384147, 121.425006, 113.256606, 114.04769, 120.155593]
      return lng[(this.indexNum + 1) % 5 - 1]
    },
    "leftRisksCount": 1,
    "status": function () {
      let statusVal = [10, 20, 30, 40]
      let statusDesc = ["正常", '离线', '报警', '故障']
      return {
        value: statusVal[this.num % 4],
        desc: statusDesc[this.num % 4]
      }
    }
  }]
}
//地图社会单位详情
const template14 = {
  "head": {
    "code": 0,
    "msg": "成功"
  },
  "data": {
    "socialUnit": {
      // "num": '@integer(0,9)',
      "id": '@integer(0,9)',
      "name": "华杰电气技术有限公司" + '@integer(0,9)',
      "address": "深圳市南山区西丽街道办事处新能源创新产业园",
      "addrjson": {
        "country": "中国",
        "province": "广东省",
        "city": "深圳市",
        "county": "南山区",
        "town": "西丽街道办事处",
        "remark": "新能源创新产业园"
      },
      "city": "深圳市",
      "manResponsibleForFireSecurity": {
        "name": "王大锤",
        "tel": "13378956412"
      },
      "coverPicUrl": require('@/assets/images/stationSampleImg.png'),
      "latitude": 22.568636,
      "longitude": 113.95918,
      "industry": {
        "id": 1,
        "name": "学校"
      },
      "grossFloorArea": 12000.32,
      "fireFacilityTypes": [{
        "id": 1,
        "name": "消防栓"
      }, {
        "id": 2,
        "name": "烟感"
      }, {
        "id": 3,
        "name": "灭火器"
      }, {
        "id": 4,
        "name": "自动喷淋系统"
      }]
    },
    "updateTime": '@now()',
    "num": '@integer(0,9)',
    "status": function () {
      let statusVal = [10, 20, 30, 40]
      let statusDesc = ["正常", '离线', '报警', '故障']
      return {
        "value": statusVal[this.num % 4],
        "desc": statusDesc[this.num % 4],
        "updateTime": this.updateTime
      }
    },
    "deviceStatusWithCounts": [{
      "value": 10,
      "desc": "正常",
      "count": '@integer(0,9)'
    }, {
      "value": 20,
      "desc": "离线",
      "count": '@integer(0,9)'
    }, {
      "value": 30,
      "desc": "报警",
      "count": '@integer(0,9)'
    }, {
      "value": 40,
      "desc": "故障",
      "count": '@integer(0,9)'
    }],
    leftRiskCount: '@integer(1,10)'
  }
}

const template15 = {
  "head": {
    "code": 0,
    "msg": "成功"
  },
  "data": {

  }
}

export default {
  template1,
  template2,
  template3,
  template4,
  template5,
  template6,
  template7, // 单个社会单位的隐患列表
  template8, // 单个设备的隐患列表
  template9, // 单个社会单位的设备列表
  template10, //设备实时数据表格
  template11,
  template12, //地图首页汇总
  template13, //地图社会单位分布
  template14, //地图社会单位详情
}