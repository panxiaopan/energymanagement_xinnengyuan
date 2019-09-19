const UNIT_ITERATOR_TREE = {
  zh: {
    'W': {
      type: 'W',
      exponent: 3,
      unitArray: ['瓦', '千瓦', '兆瓦', '吉瓦']
    },
    'kWh': {
      type: 'kWh',
      exponent: 4,
      unitArray: ['度', '万度', '亿度', '万亿度']
    },
    '￥': {
      type: 'RMB',
      exponent: 4,
      unitArray: ['元', '万元', '亿元']
    },
    'kg': {
      type: 'kg',
      exponent: 3,
      unitArray: ['千克', '吨', '万吨']
    },
    'Var': {
      type: 'Var',
      exponent: 3,
      unitArray: ['乏', '千乏', '兆乏', '吉乏']
    },
    'VA': {
      type: 'VA',
      exponent: 3,
      unitArray: ['伏安', '千伏安', '兆伏安', '吉伏安']
    },
    'A': {
      type: 'A',
      exponent: 3,
      unitArray: ['安培', '千安培', '兆安培']
    },
    'mA': {
      type: 'A',
      exponent: 3,
      unitArray: ['毫安']
    },
    'V': {
      type: 'V',
      exponent: 3,
      unitArray: ['伏特', '千伏特', '兆伏特']
    },
    'Hz': {
      type: 'Hz',
      exponent: 3,
      unitArray: ['赫兹', '千赫兹', '兆赫兹']
    },
    '℃': {
      type: '℃',
      exponent: 4,
      unitArray: ['℃']
    }
  },
  en: {
    'W': {
      type: 'W',
      exponent: 3,
      unitArray: ['W', 'kW', 'MW', 'GW']
    },
    'kWh': {
      type: 'kWh',
      exponent: 4,
      unitArray: ['kWh', 'K·kWh', 'M·kWh', 'G·kWh']
    },
    '￥': {
      type: 'RMB',
      exponent: 3,
      unitArray: ['CNY', 'thousand CNY', 'million CNY', 'billion CNY']
    },
    'kg': {
      type: 'kg',
      exponent: 3,
      unitArray: ['kg', 'ton', 'k.ton', 'million.ton']
    },
    'Var': {
      type: 'Var',
      exponent: 3,
      unitArray: ['Var', 'kVar', 'MVar', 'GVar']
    },
    'VA': {
      type: 'VA',
      exponent: 3,
      unitArray: ['VA', 'kVA', 'MVA', 'GVA']
    },
    'A': {
      type: 'A',
      exponent: 3,
      unitArray: ['A', 'kA', 'MA']
    },
    'mA': {
      type: 'A',
      exponent: 3,
      unitArray: ['mA']
    },
    'V': {
      type: 'V',
      exponent: 3,
      unitArray: ['V', 'kV', 'MV']
    },
    'Hz': {
      type: 'Hz',
      exponent: 3,
      unitArray: ['Hz', 'kHz', 'MHz']
    },
    '℃': {
      type: '℃',
      exponent: 4,
      unitArray: ['℃']
    }
  }
}


function getUnitIterator({
  language = 'zh',
  baseUnit = 'W'
}) {
  var unitKeys = Object.keys(UNIT_ITERATOR_TREE[language]),
    unitKey = 'W'
  unitKeys.some(key => {
    if (key.toLocaleLowerCase() === baseUnit.toLocaleLowerCase()) {
      unitKey = key
      return true
    }
  })
  return UNIT_ITERATOR_TREE[language][unitKey]
}

function getProcessedData({
  data,
  unitIterator,
  fixedNum
}) {
  // if (isNaN(+data)) {
  //   throw new Error("TypeError: data params can not convert to number\n at getFormattedValueAndUnit getProcessedData func")
  // }
  var result = {
    value: +data.toFixed(fixedNum),
    unit: unitIterator.unitArray[0],
    exponent: 0
  }
  unitIterator.unitArray.some((item, index) => {
    var nowExponent = index * unitIterator.exponent;
    if (Math.abs(+data) >= Math.pow(10, nowExponent)) {
      result = {
        value: (+data / Math.pow(10, nowExponent)).toFixed(fixedNum),
        unit: item,
        exponent: nowExponent
      }
      return false
    }
    return true
  })

  return result
}
/*
 * @params data      数据项，可为object,array,number, string
 * @params baseUnit  当data为array, number, string时 需指定单位, 默认'w'
 * @params percent   是否返回百分比格式，忽略单位
 * @params fixedNum  保留精度，默认两位
 * @params sameUnit  是否输出统一的单位（针对数组数据，指定最大值输出的格式单位）
 * @params dataKey   data若为object(非数组) 需指定dataKey, unitKey(unitKey默认 'unit'，若不存在则默认baseUnit 即 'w')
 * @params unitKey   data若为object(非数组) 需指定dataKey , unitKey(unitKey默认'unit'， 若不存在则默认baseUnit 即'w')
 * @params language  语言项
 * 
 * 
 * 用法示例：
 var result = getFormattedValueAndUnit({data: 0.6, percent: true})  // result 60.00%
 var result = getFormattedValueAndUnit({data: {value: 1000, unit: 'w'}})  // result {value: 1, unit: '千瓦‘}
 */
export default function getFormattedValueAndUnit({
  data = [],
  percent = false,
  fixedNum = 2,
  baseUnit = 'W',
  dataKey = 'value',
  unitKey = 'unit',
  sameUnit = true,
  language = 'zh'
}) {
  if (data === null || typeof data === 'undefined' || data === '') { //若data为null 空字符串等 直接返回
    return data
  }
  var result = null,
    unitIterator = getUnitIterator({
      language,
      baseUnit //当data为对象时 单位指定
    })
  if (typeof data === 'string' || typeof data === 'number') {
    if (isNaN(+data)) {
      console.error("TypeError: data params can not convert to number\n at getFormattedValueAndUnit")
      return {
        value: data,
        unit: '--',
        exponent: 0
      } //返回
    }
    // console.log("this could not be console if there is an error")
    if (percent) {
      return (+data * 100).toFixed(fixedNum) + '%'
    }
    result = getProcessedData({
      data: +data,
      unitIterator,
      fixedNum
    })
    return result
  }
  if (data instanceof Array) {
    result = []

    // var dataArr = []
    // data.forEach(item=>{
    //   if (item instanceof Object) {
    //     if (typeof item[dataKey] !== 'undefined' && !isNaN(+item[dataKey])) {
    //       dataArr.push(+item[dataKey])
    //     }
    //   } else if (!isNaN(+item)) {
    //     dataArr.push(+item)
    //   }
    // })
    // var maxValue = Math.max.apply(null, dataArr)
    // unitIterator = getUnitIterator({
    //   language,
    //   baseUnit: data[0][unitKey] || baseUnit //当data为对象时 单位指定
    // })
    // var {unit, exponent} = getProcessedData({
    //   data: +maxValue,
    //   unitIterator,
    //   fixedNum
    // })
    // data.forEach(item => {
    //   if (item instanceof Object) {
    //     if (typeof item[dataKey] !== 'undefined' && !isNaN(+item[dataKey])) {
    //       item[dataKey] = (+item[dataKey]/Math.pow(10, exponent)).toFixed(fixedNum)
    //       item['unit'] = unit
    //       item['exponent'] = exponent
    //     }
    //   } else if (!isNaN(+item)) {
    //     item = {value: (item / Math.pow(10, exponent)).toFixed(fixedNum), unit, exponent}
    //   }
    // })
    // result = data
    // return result

    data.forEach((item) => {
      if (item instanceof Object) {
        if (typeof item[dataKey] === 'undefined' || isNaN(+item[dataKey])) {
          console.error("TypeError: dataKey value was not found\n at getFormattedValueAndUnit")
          result.push(item)
        } else {
          unitIterator = getUnitIterator({
            language,
            baseUnit: item[unitKey] || baseUnit //当data为对象时 单位指定
          })
          result.push(getProcessedData({
            data: +item[dataKey],
            unitIterator,
            fixedNum
          }))
        }
      } else if (isNaN(+item)) {
        console.error("TypeError: value params can not convert to number\n at getFormattedValueAndUnit")
        result.push({
          value,
          unit: '--'
        }) //返回
      } else {
        result.push(getProcessedData({
          data: +item,
          unitIterator,
          fixedNum
        }))
      }
    })
    return result
  }
  if (data instanceof Object) {

    unitIterator = getUnitIterator({
      language,
      baseUnit: data[unitKey] || baseUnit //当data为对象时 单位指定
    })
    if (typeof data[dataKey] === 'undefined' || data[dataKey] === '' || isNaN(+data[dataKey])) {
      // throw new Error("TypeError: dataKey value was not found\n at getFormattedValueAndUnit")
      console.error("TypeError: dataKey value was not found\n at getFormattedValueAndUnit")
      data[unitKey] = unitIterator.unitArray[0]
      data[dataKey] = '--'
      return data //返回
    } else {

      result = getProcessedData({
        data: +data[dataKey],
        unitIterator,
        fixedNum
      })
      result = Object.assign(data, result)
      return result
    }
  }
}