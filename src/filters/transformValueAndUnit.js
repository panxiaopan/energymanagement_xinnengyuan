function getUnitArrayByBaseUnitAndLanguage({
  language,
  baseUnit,
  filterMap
}) {
  var result = null
  if (filterMap && !filterMap.has(baseUnit)) {
    return result
  }

  if (language == 'zh') {
    var zhBaseUnitArray = [{
        type: 'kWh',
        seperator: 4,
        unitArray: ['度', '万度', '亿度', '万亿度']
      },
      {
        type: 'W',
        seperator: 3,
        unitArray: ['瓦', '千瓦', '兆瓦', '吉瓦']
      },
      {
        type: 'RMB',
        seperator: 4,
        unitArray: ['元', '万元']
      },
      {
        type: 'kg',
        seperator: 3,
        unitArray: ['千克', '吨']
      },
      {
        type: 'Var',
        seperator: 3,
        unitArray: ['Var', 'kVar', 'MVar', 'GVar']
      },
      {
        type: 'VA',
        seperator: 3,
        unitArray: ['VA', 'kVA', 'MVA', 'GVA']
      },
      {
        type: 'A',
        seperator: 3,
        unitArray: ['安培', '千安培', '兆安培']
      },
      {
        type: 'V',
        seperator: 3,
        unitArray: ['伏特', '千伏特', '兆伏特']
      },
      {
        type: 'Hz',
        seperator: 3,
        unitArray: ['赫兹', '千赫兹', '兆赫兹']
      },
      {
        type: '℃',
        seperator: 1,
        unitArray: ['摄氏度']
      }
    ]
    zhBaseUnitArray.some((item) => {
      if (item.type == baseUnit) {
        result = item
        return true
      } else {
        return false
      }
    })
  } else {
    var enBaseUnitArray = [{
        type: 'kWh',
        seperator: 3,
        unitArray: ['kWh', 'K·kWh', 'M·kWh', 'G·kWh']
      },
      {
        type: 'W',
        seperator: 3,
        unitArray: ['W', 'kW', 'MW', 'GW']
      },
      {
        type: 'RMB',
        seperator: 3,
        unitArray: ['CNY', 'thousand CNY', 'million CNY', 'billion CNY']
      },
      {
        type: 'kg',
        seperator: 3,
        unitArray: ['kg', 'ton']
      },
      {
        type: 'Var',
        seperator: 3,
        unitArray: ['Var', 'kVar', 'MVar', 'GVar']
      },
      {
        type: 'VA',
        seperator: 3,
        unitArray: ['VA', 'kVA', 'MVA', 'GVA']
      },
      {
        type: 'A',
        seperator: 3,
        unitArray: ['A', 'KA', 'MA']
      },
      {
        type: 'V',
        seperator: 3,
        unitArray: ['V', 'kV', 'MV']
      },
      {
        type: 'Hz',
        seperator: 3,
        unitArray: ['Hz', 'kHz', 'MHz']
      },
      {
        type: '℃',
        seperator: 1,
        unitArray: ['℃']
      }
    ]
    enBaseUnitArray.some((item) => {
      if (item.type == baseUnit) {
        result = item
        return true
      } else {
        return false
      }
    })
  }

  return result
}

function getValueAndUnitBySeperator({
  seperator,
  unitArray,
  value,
  baseUnit
}) {
  var result = {
    originVal: value,
    value: value,
    unit: unitArray[0],
    originUnit: baseUnit,
    factor: 1
  }
  if (!unitArray.length || value === undefined || isNaN(value - 0) || value === null || value === '') {
    console.log('value is not correct type or unitArray is []')
    return {
      originVal: value,
      value: '--',
      unit: unitArray[0],
      originUnit: baseUnit,
      factor: 1
    }
    // return result
  }
  value = +value

  if (isNaN(seperator) && Array.isArray(seperator)) {

    seperator.reduce((total, currentValue, currentIndex, arr) => {
      // let nowSeperator = currentIndex>0 ? total+currentValue  : 0;
      total = total + currentValue; // seperator数组第一个为0, 对应初始化的指数。
      if (total > 0 && value >= Math.pow(10, total)) {
        result.value = value / Math.pow(10, total);
        result.unit = unitArray[currentIndex];
        result.factor = Math.pow(10, total);
      }
      return total;
    }, 0)


  } else {
    unitArray.forEach(function (item, index, array) {
      var nowSeperator = seperator * index
      if (nowSeperator > 0 && value >= Math.pow(10, nowSeperator)) {
        result.value = value / Math.pow(10, nowSeperator)
        result.unit = array[index]
        result.factor = Math.pow(10, nowSeperator)
      }
    })
  }


  var fixNum = 2;
  if (baseUnit === 'kWh') {
    // 如果是度数，则度保留整数，万度保留三位小数
    if (result.factor === Math.pow(10, 0)) {
      fixNum = 0;
    } else {
      fixNum = 3;
    }
  }

  result.value = +(+result.value).toFixed(fixNum);
  return result
}
// export default {
//   methods:{
//     getUnitArrayByBaseUnitAndLanguage,
//     getValueAndUnitBySeperator,
//   },
//   filters: {
//     transFormValueAndUnit(value, baseUnit, language = 'zh') {
//       // if(language)
//       var baseUnitArrayObj = this.getUnitArrayByBaseUnitAndLanguage({ language, baseUnit })
//       if (!baseUnitArrayObj) {
//         // return { originVal: value, value: value, unit: baseUnit, originUnit: baseUnit, factor: 1 }
//         return value + ' ' + baseUnit
//       }
//       var result = this.getValueAndUnitBySeperator({ seperator: baseUnitArrayObj.seperator, unitArray: baseUnitArrayObj.unitArray, value, baseUnit })
//       return result.value + ' ' + result.unit
//     }
//   }
// }

export default function (value, baseUnit, language = "zh") {
  console.log('transFormValueAndUnit')
  // if(language)
  var baseUnitArrayObj = getUnitArrayByBaseUnitAndLanguage({
    language,
    baseUnit
  })
  if (!baseUnitArrayObj) {
    // return { originVal: value, value: value, unit: baseUnit, originUnit: baseUnit, factor: 1 }
    return value + ' ' + baseUnit
  }
  var result = getValueAndUnitBySeperator({
    seperator: baseUnitArrayObj.seperator,
    unitArray: baseUnitArrayObj.unitArray,
    value,
    baseUnit
  })
  return result.value + ' ' + result.unit
}
