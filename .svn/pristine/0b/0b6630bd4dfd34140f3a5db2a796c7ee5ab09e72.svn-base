/*
 * @params dataList<Array>                原始数据 
 * @params beginTime<Date,String>         开始时间（可选）
 * @params beginTime<Date,String>         结束时间（可选）
 * @params dateType<String>               day month halfMonth year total
 * @params period<Number>                 周期（可选）   15-min 1-day 1-month 1-year
 * @params periodType<String>             周期类型 ms day month year
 * @params formatStr<String>              时间格式字符串
 * @return {maxValue, minValue}<Object>   返回值 dataList中的最大值 最小值
 */

export default function ({
  dataList,
  valueKey = 'value',
  timeKey = "time",
  beginTime,
  endTime,
  dateType, // 若传入dateType 则开始结束时间以dateType算出
  period = 15 * 60 * 1000, // 默认周期15min
  periodType = 'ms',
  formatStr = 'YYYY-MM-DD HH:mm:ss'
}) {
  var timeArr = [],
    valueArr = [],
    minValue = 0,
    maxValue = 0
  beginTime = typeof beginTime === 'undefined' || beginTime === '' ? moment() : moment(beginTime)
  endTime = typeof endTime === 'undefined' || endTime === '' ? moment(beginTime) : moment(endTime)
  if (typeof dateType !== 'undefined') {
    if (dateType === 'total') {
      let years = dataList.length > 5 ? dataList.length : 5 //总的数据 年数等于数据组 至少显示最近5年的
      beginTime = beginTime.add(-years, 'years').startOf('year')
      endTime = endTime.endOf('year')
    } else {
      beginTime = beginTime.startOf(dateType)
      endTime = endTime.endOf(dateType)
    }
  }
  switch (dateType) {
    case 'day':
      // period = period ? period : 15 * 60 * 1000;
      // periodType = periodType ? periodType : 'ms'
      formatStr = 'YYYY-MM-DD HH:mm:ss'
      break;
      // case 'week'
    case 'month':
      period = 1;
      periodType = 'days'
      formatStr = 'YYYY-MM-DD'
      break;
    case 'year':
      period = 1;
      periodType = 'months'
      formatStr = 'YYYY-MM'
      break;
    case 'total':
      period = 1;
      periodType = 'years'
      formatStr = 'YYYY'
      break;
  }

  // console.log("formatStr dateType beginTime endTime", formatStr, dateType, beginTime, endTime)
  while (beginTime.isBefore(endTime)) {
    timeArr.push(beginTime.format(formatStr))
    beginTime.add(period, periodType)
  }
  // console.log("completed timeArr+++++++", timeArr, dateType, +beginTime, +endTime)

  timeArr.forEach((item, index) => {
    let time = typeof dataList[index] === 'undefined' || typeof dataList[index][timeKey] === 'undefined' ? item : dataList[index][timeKey]
    // time = moment(time).format(formatStr)
    let value = typeof dataList[index] === 'undefined' || typeof dataList[index][valueKey] === 'undefined' ? NaN : +dataList[index][valueKey]
    if (!isNaN(value)) {
      valueArr.push(value)
    }
    // 当对应时间点原数据缺失时，补NaN 为空数据
    if (typeof dataList[index] === 'undefined' || typeof dataList[index][timeKey] === 'undefined' || moment(time).format(formatStr) !== item) {
      let data = {
        ...dataList[index]
      }
      data['time'] = item
      data['value'] = NaN
      dataList.splice(index, 0, data)
    }
  })
  // console.log("valueArr", valueArr, dataList)
  if (valueArr.length > 0) {
    minValue = Math.min.apply(null, valueArr)
    maxValue = Math.max.apply(null, valueArr)
  }

  // console.log("completed dataList++++++++++++", dataList, timeArr, 'dateType', beginTime.format(formatStr), endTime.format(formatStr))
  return {
    minValue,
    maxValue
  }
}