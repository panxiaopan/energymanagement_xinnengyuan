const Mock = require("mockjs");
const Random = Mock.Random;
import timeValueGenerator from './timeValueGenerator'
import Templates from './mockTemplate'
// 社会单位 设备名称 执行人 列表模板{id, name}
Mock.mock(/\/socialUnits\/idName/, 'get', Templates.template1);
Mock.mock(/\/devices\/idName/, 'get', Templates.template1);
Mock.mock(/auth\/users/, 'get', Templates.template1);


//隐患详情
Mock.mock(/risks\/\d+/, 'get', Templates.template2);
//单个设备的隐患列表
Mock.mock(/socialUnits\/\d+\/devices\/\d+\/risks/, 'get', Templates.template8)
// //单个社会单位的隐患列表
Mock.mock(/socialUnits\/\d+\/risks/, 'get', Templates.template7)
//隐患管理
Mock.mock(/risks/, 'get', Templates.template4);

// 设备的实时数据表格
Mock.mock(/socialUnits\/\d+\/devices\/\d+\/realtime\/relatedToFire/, 'get', Templates.template10)

// 设备测点数据
Mock.mock(/socialUnits\/\d+\/devices\/\d+\/history\/dataIds\/batch/, 'get', function (options) {
  console.log("options++++++++++++++++++++++++++", options)
  let {
    url
  } = options
  let query = url.split("?")[1]
  let beginTime = query.split("&").filter(item => {
    let key = item.split("=")[0]
    return key === 'beginTime'
  }).join()
  let endTime = query.split("&").filter(item => {
    let key = item.split("=")[0]
    return key === 'endTime'
  }).join()
  let dataIds = query.split("&").filter(item => {
    let key = item.split("=")[0]
    return key === 'dataIds[]'
  })
  beginTime = beginTime.split('=')[1]
  endTime = endTime.split('=')[1]
  console.log("beginTime, endTime", beginTime, endTime)
  let len = 1;
  if (dataIds.length !== 1) {
    len = dataIds.length === 0 ? Math.floor(Math.random() * 10 + 2) : dataIds.length
    len = Math.min(len, 3)
  }
  let timeValue = []
  console.log(beginTime.split('+')[0] !== endTime.split('+')[0])
  // 日期周类型
  if (beginTime.split('+')[0] !== endTime.split('+')[0]) {
    // timeValue = []
    for (let index = 0; index < len; index++) {
      timeValue.push(timeValueGenerator({
        beginTime: beginTime.replace("+", " "),
        endTime: endTime.replace("+", " ")
      }))
    }
  } else { //当天数据
    for (let index = 0; index < len; index++) {
      timeValue.push(timeValueGenerator())
    }
  }

  console.log("len+++++++++++++", len, dataIds)
  return {
    head: {
      code: 0
    },
    "data": {
      // "logsList": [timeValueGenerator(), timeValueGenerator()],
      "logsList": timeValue,
      "interval": {
        "unit": "MINUTE",
        "value": 15
      }
    }
  }
})

// 设备关联工单
// Mock.mock(/workOrders/, 'get', Templates.template11)
Mock.mock(/socialUnits\/\d+\/devices\/\d+\/workOrders/, 'get', Templates.template11)
// 单个社会单位下设备名称列表
Mock.mock(/socialUnits\/\d+\/devices/, 'get', Templates.template9)
//社会单位详情
Mock.mock(/[^map]+\/socialUnits\/\d+/, 'get', Templates.template3);
// 社会单位名称列表
Mock.mock(/socialUnits\/navigation\/idNameAddressWithStatus/, 'get', Templates.template6)

Mock.mock(/socialUnits\/riskStatistics/, 'get', function (options) {
  return {
    head: {
      code: 0
    },
    "data": {
      'socialUnitStatusWithCounts': [{
        "value": 10,
        "desc": "正常",
        "count": Mock.mock('@integer(5,50)')
      }, {
        "value": 20,
        "desc": "离线",
        "count": Mock.mock('@integer(5,50)')
      }, {
        "value": 30,
        "desc": "报警",
        "count": Mock.mock('@integer(5,50)')
      }, {
        "value": 40,
        "desc": "故障",
        "count": Mock.mock('@integer(5,50)')
      }],
      "risksByReason": [{
        "value": 10001,
        "desc": "断线",
        "count": Mock.mock('@integer(1, 20)')
      }, {
        "value": 20001,
        "desc": "漏电",
        "count": Mock.mock('@integer(1, 20)')
      }, {
        "value": 20002,
        "desc": "过温",
        "count": Mock.mock('@integer(1, 20)')
      }, {
        "value": 20003,
        "desc": "过压",
        "count": Mock.mock('@integer(1, 20)')
      }, {
        "value": 20004,
        "desc": "欠压",
        "count": Mock.mock('@integer(1, 20)')
      }, {
        "value": 20005,
        "desc": "过流",
        "count": Mock.mock('@integer(1, 20)')
      }, {
        "value": 20006,
        "desc": "短路",
        "count": Mock.mock('@integer(1, 20)')
      }],

      "leftRisksByStatus": [{
        "value": 10,
        "desc": "待处理",
        "count": 15
      }, {
        "value": 20,
        "desc": "处理中",
        "count": 22
        // }, {
        //   "value": 30,
        //   "desc": "完成",
        //   "count": 'integer(1, 20)'
      }]

    }
  }
})

// 社会单位列表
Mock.mock(/[^map]+\/socialUnits/, 'get', Templates.template5)

// 地图首页
Mock.mock(/map\/summary/, 'get', Templates.template12)
// 地图社会单位详情
Mock.mock(/map\/socialUnits\/\d+/, 'get', Templates.template14)
// 社会单位分布
Mock.mock(/map\/socialUnits/, 'get', Templates.template13)