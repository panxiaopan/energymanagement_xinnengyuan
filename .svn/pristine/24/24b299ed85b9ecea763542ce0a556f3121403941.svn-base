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
  };
  if (!unitArray.length || value === undefined || isNaN(value - 0) || value === null || value === '') {
    console.log('value is not correct type or unitArray is []');
    return {
      originVal: value,
      value: '--',
      unit: unitArray[0],
      originUnit: baseUnit,
      factor: 1
    };
    // return result
  }
  value = +value;
  if (isNaN(seperator) && Array.isArray(seperator)) {

    seperator.reduce((total, currentValue, currentIndex, arr) => {
      // let nowSeperator = currentIndex>0 ? total+currentValue  : 0;
      total = total + currentValue;
      if (total > 0 && Math.abs(value) >= Math.pow(10, total)) {
        result.value = value / Math.pow(10, total);
        result.unit = unitArray[currentIndex];
        result.factor = Math.pow(10, total);
      }
      return total;
    }, 0)


  } else {
    unitArray.forEach(function (item, index, array) {
      var nowSeperator = seperator * index;
      if (nowSeperator > 0 && Math.abs(value) >= Math.pow(10, nowSeperator)) {
        result.value = value / Math.pow(10, nowSeperator);
        result.unit = array[index];
        result.factor = Math.pow(10, nowSeperator);
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
  return result;
}

function getUnitArrayByBaseUnitAndLanguage({
  language,
  baseUnit,
  filterMap
}) {
  var result = null;
  if (filterMap && !filterMap.has(baseUnit)) {
    return result;
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
        seperator: [0, 3, 4],
        unitArray: ['千克', '吨', '万吨']
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
        result = item;
        return true;
      } else {
        return false;
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
        unitArray: ['kg', 'ton', 'k.ton', 'million.ton']
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
        unitArray: ['A', 'kA', 'MA']
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
      }
    ]
    enBaseUnitArray.some((item) => {
      if (item.type == baseUnit) {
        result = item;
        return true;
      } else {
        return false;
      }
    });
  }

  return result;
}

function setValueAndUnit({
  seperator,
  unitArray,
  obj,
  key,
  keyUnit,
  baseUnit
}) {
  var result = getValueAndUnitBySeperator({
    baseUnit,
    seperator,
    unitArray,
    value: obj[key]
  })
  if (!result) {
    console.error('transform value and unit error');
    return false;
  } else {
    obj[key] = result.value;
    obj[keyUnit] = result.unit;
    obj.originVal = result.originVal;
    obj.originUnit = result.originUnit;
    return result;
  }
}
// 必须入参 data or obj, baseUnit.  入参  data, obj 同时存在以obj为优先, 当入参为  obj 时, key 必须输入  
export default {
  methods: {
    dealValueAndUnit({
      data,
      obj,
      baseUnit,
      key = 'value',
      keyUnit,
      arr = [],
      language = 'zh',
      filterMap = null
    }) {
      if (!keyUnit) {
        keyUnit = key + 'Unit';
      }
      if (!baseUnit) {
        console.log('please input the base unit(w or kWh)');
        var result = {};
        if (obj) {
          if (obj[key] === undefined || obj[key] === null || obj[key] === '' || isNaN(obj[key] - 0)) {
            result[key] = '--';
            result[keyUnit] = baseUnit || '';
            result.originVal = '--';
            result.originUnit = baseUnit || '';
            Object.assign(obj, result);
            return {
              originVal: '--',
              value: '--',
              unit: '',
              originUnit: '',
              factor: 1
            };
          }
          var originVal = obj[key];
          result[key] = +(+obj[key]).toFixed(2);
          result[keyUnit] = baseUnit || '';
          result.originVal = originVal;
          result.originUnit = baseUnit || '';
          Object.assign(obj, result);
          // var originVal = +(+obj[key]).toFixed(2)
          return {
            originVal,
            value: +(+obj[key]).toFixed(2),
            unit: '',
            originUnit: '',
            factor: 1
          };
        } else {
          return {
            originVal: data,
            value: (data ? data.toFixed(2) : '--'),
            unit: '',
            originUnit: '',
            factor: 1
          };
        }
      }
      // var language = arguments[0].language ? arguments[0].language : 'zh'
      var seperatorUnitArrayObj = getUnitArrayByBaseUnitAndLanguage({
        language,
        baseUnit,
        filterMap
      })
      if (!seperatorUnitArrayObj) {
        // console.error('please input correct baseUnit', baseUnit)
        if (obj) {
          var result = {};
          if (obj[key] === undefined || obj[key] === null || obj[key] === '' || isNaN(obj[key] - 0)) {
            result[key] = '--';
            result[keyUnit] = baseUnit;
            result.originVal = '--';
            result.originUnit = baseUnit;
            Object.assign(obj, result);
            return {
              originVal: '--',
              value: '--',
              unit: baseUnit,
              originUnit: baseUnit,
              factor: 1
            }
          }
          var dealValue = +(+obj[key]).toFixed(2);

          result[key] = dealValue;
          result[keyUnit] = baseUnit;
          result.originVal = +obj[key];
          result.originUnit = baseUnit;
          Object.assign(obj, result);
          // var originVal = obj[key]
          return {
            originVal: +obj[key],
            value: dealValue,
            unit: baseUnit,
            originUnit: baseUnit,
            factor: 1
          }
        } else {
          if (data === undefined || data === null || data === '' || isNaN(data - 0)) {
            return {
              originVal: '--',
              value: '--',
              unit: baseUnit,
              originUnit: baseUnit,
              factor: 1
            }
          }
          var originVal = +(+data).toFixed(2);
          return {
            originVal: originVal,
            value: originVal,
            unit: baseUnit,
            originUnit: baseUnit,
            factor: 1
          }
        }
      }

      if (arr.length) {

      } else if (obj) {
        if (obj[key] === undefined || obj[key] === null || obj[key] === '' || isNaN(obj[key] - 0)) {
          var result = {};
          result[key] = '--';
          result[keyUnit] = seperatorUnitArrayObj.unitArray[0];
          result.originVal = '--';
          result.originUnit = baseUnit;
          Object.assign(obj, result);
          return result;
        }
        return setValueAndUnit({
          baseUnit,
          seperator: seperatorUnitArrayObj.seperator,
          unitArray: seperatorUnitArrayObj.unitArray,
          obj,
          key,
          keyUnit
        })
      } else if (data === undefined || data === null || data === '' || isNaN(data - 0)) {
        return {
          originVal: '--',
          value: '--',
          unit: seperatorUnitArrayObj.unitArray[0],
          originUnit: baseUnit,
          factor: 1
        }
        console.log('please input data or obj prop value');
      } else if (!isNaN(data - 0)) {
        // var originVal = +(+data).toFixed(2)
        // return { originVal: originVal, value: originVal, unit: baseUnit, originUnit: baseUnit, factor: 1 }
        // data = data - 0
        return getValueAndUnitBySeperator({
          baseUnit,
          seperator: seperatorUnitArrayObj.seperator,
          unitArray: seperatorUnitArrayObj.unitArray,
          value: data
        })
      } else {
        data = +(+data).toFixed(2);
        return {
          originVal: data,
          value: data,
          unit: seperatorUnitArrayObj.unitArray[0],
          factor: 1
        }
      }
    },
    getMaxValueAndUnitAndFactor({
      array,
      baseUnit,
      dataKey = 'value',
      onlyMaxData = false
    }) {
      if (!Array.isArray(array)) {
        console.error('入参必须是数组');
        return
      }
      var dealObj = {
        originVal: 1,
        value: 1,
        unit: baseUnit,
        factor: 1
      }
      if (!array.length) {
        return dealObj;
      }

      if (typeof array[0] == 'object') {

        if (isNaN(+array[0][dataKey])) {
          console.error('the data can not be NaN');
          return dealObj;
        }
        // 排出 NaN 的数据
        var filterArr = array.filter((item) => {
          return !isNaN(+item[dataKey]);
        })
        if (!filterArr.length) {
          return dealObj;
        }
        console.log('filterarr data', filterArr);
        var maxValueObj = filterArr.reduce((prev, cur) => {
          return ((+prev[dataKey] > +cur[dataKey]) ? prev : cur);
        })
        var maxValue = maxValueObj[dataKey];
      } else {
        if (isNaN(+array[0])) {
          console.error('the data can not be NaN');
          return dealObj;
        }
        // 排出 NaN 的数据
        var filterArr = array.filter((item) => {
          return !isNaN(+item);
        });
        console.log('filterarr data', filterArr);
        var maxValue = filterArr.reduce((prev, cur) => {
          return ((+prev > +cur) ? +prev : +cur);
        });
      }


      // 在比较大小使, 如果 有数值为 NaN则无论是最大值还是最小值都是NaN,故而要比较大小使得先排除NaN
      // var duplicateArray = [...array]
      // var maxValue = duplicateArray.sort(function(a,b){
      //   return b-a
      // }).slice(0,1)  
      // 坑 用此种方式, 当 array中的第一个为 NaN时, 返回的总是NaN
      console.log('duplicateArray', maxValue);
      // 或者 
      // var maxValue = Math.max.apply(null, array) //用此种方式 当 array 全为NaN 时会返回 null 值

      if (onlyMaxData) {
        dealObj.originVal = maxValue;
        dealObj.value = maxValue;
        // Object.assign(dealObj,{originVal: ,value})
      } else {
        dealObj = this.dealValueAndUnit({
          language: localStorage.hjLanguage || 'zh',
          data: maxValue,
          baseUnit,
        })
      }
      return dealObj;
    }
  }
}