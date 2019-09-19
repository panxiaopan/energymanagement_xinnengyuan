import http from "./http";
import getFormattedValueAndUnit from '@/utils/getFormattedValueAndUnit';

function getFormattedListData(response, context) {
  var data = response.data && response.data.data;
  var {
    total,
    dataList
  } = context.state.stationDeviceList
  if (!!data) {
    // listData = data
    data.rows && data.rows.forEach(item => {
      ['batteryCapacity', 'ratedPower'].forEach(key => [
        item[key] = getFormattedValueAndUnit({
          data: item[key]
        })
      ])
    })
    total = data.total || total
    dataList = data.rows || dataList
  }
  return {
    total,
    dataList
  }
}
export default {

  getTouDataList(context, config, cb) {
    // var url = './tous/idName'
    var {
      url,
      json
    } = config
    http({
      url,
      json
    }).then(response => {
      var code = response.data && response.data.head && response.data.head.code
      var data = response.data && response.data.data
      if (+code === 0 && data) {
        cb(data, response)
      }
    })
  },
  getStationFormData(context, {
    stationId
  }, cb) {
    var url = `./stations/${stationId}/config`
    http({
      url
    }).then(response => {
      var code = response.data && response.data.head && response.data.head.code
      var newStationFormData = response.data && response.data.data || context.state.stationFormData
      if (+code === 0) {
        var newForm = {}
        // var keyMap = new Map([
        //   ['name', 'stationName'],
        //   ['ratedPower', 'ratedPower'],
        //   ['batteryCapacity', 'batteryCapacity'],
        //   ['batteryCapacity', 'latLng'],
        // ])
        newForm['dtuSerialNum'] = ''
        if (typeof newStationFormData === 'object' && !!newStationFormData) {
          newForm["stationName"] = newStationFormData["name"]
          newForm["ratedPower"] = +newStationFormData["ratedPower"].value / 1000;
          newForm["batteryCapacity"] = newStationFormData["batteryCapacity"].value;
          newForm["latLng"] = `${newStationFormData["longitude"]},${
                  newStationFormData["latitude"]
                }`;
          newForm['area'] = {}
          Object.keys(newStationFormData["addressCodeName"]).forEach(areaKey => {
            newForm['area'][areaKey] = +newStationFormData["addressCodeName"][areaKey].code;
            if (areaKey === 'remark') {
              newForm[areaKey] = newStationFormData["addressCodeName"][areaKey].name
            }
          });
          newForm["installedCompany"] = newStationFormData["installedCompany"];
          newForm['installedDate'] = newStationFormData['installedDate']
          newForm["touEnabled"] = newStationFormData["touEnabled"];
          newForm["touId"] = newStationFormData["touId"];
          newForm['pics'] = newStationFormData["picNameUrls"] ? newStationFormData["picNameUrls"] : [];
          console.log("newForm['pics']", newForm['pics'])
          if (newForm['pics'].length > 0) {
            newForm['pics'].forEach(item => {
              var preUrl =
                window.location.protocol +
                "//" +
                window.location.host +
                "/" +
                window.location.pathname.split("/")[1];
              if (process.env.NODE_ENV === "production") {
                item['url'] = preUrl + item['url'];
              } else {
                item['url'] = '.' + item['url'];
              }
            })
          }
          // })
        }
        cb(newForm, response)
      }
    })
  },
  getAreaList(context, config, cb) {
    var parentId = 0
    var url = `./common/areas/parentId/${parentId}`
    var newAreaList = context.state.areaList
    // 请求国家数据
    http({
      url
    }).then(response => {
      var code = response.data && response.data.head && response.data.head.code
      if (+code === 0) {
        let dataList = response.data && response.data.data
        dataList.forEach(item => {
          item.label = item.name
          item.value = item.id // 实际遍历 确认parentId是通过name
        })
        console.log("dataList.filter", dataList, config)
        newAreaList['country'] = dataList
        // 请求省区域数据 省级数据未选中则为空
        if (typeof config['country'] === 'undefined' && config['country'] === '') {
          ['province', 'city', 'county', 'town'].forEach(key => {
            newAreaList[key] = []
          })
          cb(newAreaList, response)
          return
        }
        let parentId = dataList.filter(item => {
          return +item.id === +config['country']
        })[0]['id']

        url = `./common/areas/parentId/${parentId}`
        return http({
          url
        })
      }
    }).then(response => {
      var code = response.data && response.data.head && response.data.head.code
      if (+code === 0) {
        let dataList = response.data && response.data.data
        dataList.forEach(item => {
          item.label = item.name
          item.value = item.id
        })
        newAreaList['province'] = dataList
        // 请求市级区域数据
        if (typeof config['province'] === 'undefined' && config['province'] === '') {
          ['city', 'county', 'town'].forEach(key => {
            newAreaList[key] = []
          })
          cb(newAreaList, response)
          return
        }
        let parentId = dataList.filter(item => {
          return +item.id === +config['province']
        })[0].id
        url = `./common/areas/parentId/${parentId}`
        return http({
          url
        })
      }
    }).then(response => {
      var code = response.data && response.data.head && response.data.head.code
      if (+code === 0) {
        let dataList = response.data && response.data.data

        dataList.forEach(item => {
          item.label = item.name
          item.value = item.id
        })
        newAreaList['city'] = dataList
        // 请求县级区域数据
        if (typeof config['city'] === 'undefined' && config['city'] === '') {
          ['county', 'town'].forEach(key => {
            newAreaList[key] = []
          })
          cb(newAreaList, response)
          return
        }
        console.log("city dataLsit, config", dataList, config)
        let parentId = dataList.filter(item => {
          // return item.id === config['city']['value']
          return +item.id === +config['city']
        })[0].id
        url = `./common/areas/parentId/${parentId}`
        return http({
          url
        })
      }
    }).then(response => {
      var code = response.data && response.data.head && response.data.head.code
      if (+code === 0) {
        let dataList = response.data && response.data.data

        dataList.forEach(item => {
          item.label = item.name
          item.value = item.id
        })
        newAreaList['county'] = dataList
        // 请求乡镇区域数据
        if (typeof config['county'] === 'undefined' && config['county'] === '') {
          newAreaList['town'] = []
          cb(newAreaList, response)
          return
        }
        console.log("county dataLsit, config", dataList, config)
        let parentId = dataList.filter(item => {
          // return item.id === config['county']['value']
          return +item.id === +config['county']
        })[0].id
        url = `./common/areas/parentId/${parentId}`
        return http({
          url
        })
      }
    }).then(response => {

      var code = response.data && response.data.head && response.data.head.code
      if (+code === 0) {
        let dataList = response.data && response.data.data
        dataList.forEach(item => {
          item.label = item.name
          item.value = item.id
        })
        newAreaList['town'] = dataList
        cb(newAreaList, response)
      }
    })
  },
  getSelectedAreaObj(context, config, cb) {
    var townCode = config.town.value || '--'
    var url = `./common/areas/townCode/${townCode}`
    http({
      url
    }).then(response => {
      var code = response.data && response.data.head && response.data.head.code
      if (+code === 0) {
        let data = response.data && response.data.data
        let newSelectedAreaObj = context.state.selectedAreaObj
        try {
          newSelectedAreaObj = JSON.parse(data)
        } catch (e) {
          console.error('parse towncode response error')
        }
        cb(newSelectedAreaObj, response)
      }
    })
  },
  getStationDeviceList(context, config, cb) {
    var {
      url,
      json
    } = config
    http({
      url,
      json
    }).then(response => {
      let newStationDeviceList = getFormattedListData(response, context)
      cb(newStationDeviceList, response)
    })
  },
  // removeStationDevice(context, config, cb) {
  //   var {
  //     url,
  //     json,
  //     message
  //   } = config
  //   http({
  //     url,
  //     json,
  //     method: "delete",
  //     message
  //   }, (status, response) => {
  //     if (status === 'success') {
  //       let newStationDeviceList = context.state.stationDeviceList
  //       newStationDeviceList = newStationDeviceList.filter(item => {
  //         return item.id !== +url.split("/")[2]
  //       })
  //       cb(newStationDeviceList, response)
  //     }
  //   })
  // },
  // removeDtuDevice(context, config, cb) {
  //   var {
  //     url,
  //     json,
  //     message
  //   } = config
  //   var stationId = +url.split("/")[2]
  //   var dtuId = +url.split("/")[4]
  //   var deviceId = +url.split("/")[6]
  //   console.log("stationid", stationId, "dtuId", dtuId, "deviceId", deviceId)
  //   http({
  //       url,
  //       json,
  //       method: "delete",
  //       message
  //     },
  //     (status, response) => {
  //       if (status === 'success') {
  //         // if (typeof stationId !== 'undefined' && typeof dtuId !== 'undefined') {
  //         let newDtuDeviceList = context.state.dtuDeviceList
  //         if (typeof deviceId !== 'undefined') {
  //           newDtuDeviceList.forEach(item => {
  //             if (typeof item.subNodes !== 'undefined' && item.subNodes.length > 0) {
  //               item.subNodes = item.subNodes.filter(subNode => {
  //                 return subNode.id !== deviceId
  //               })
  //             }
  //           })
  //         } else {
  //           newDtuDeviceList = newDtuDeviceList.filter(item => {
  //             return item.id !== dtuId
  //           })
  //         }
  //         cb(newDtuDeviceList, response)
  //       }
  //     }
  //   );
  // },
  getDtuDeviceList(context, stationId, cb) {
    var url = `./stations/${stationId}/devices/tree/config`
    http({
      url
    }).then(response => {
      var code = response.data && response.data.head && response.data.head.code
      if (+code === 0) {
        let newDtuDeviceList = response.data && response.data.data
        let nodeKey = 1
        newDtuDeviceList.forEach(item => {
          item['nodeKey'] = nodeKey;
          nodeKey++;
          item['nodeType'] = 'dtu'
          if (typeof item.subNodes !== 'undefined' && item.subNodes.length > 0) {
            item.subNodes.forEach(subNode => {
              subNode['nodeKey'] = nodeKey
              nodeKey++
              subNode['nodeType'] = 'device'
            })
          }
        })
        cb(newDtuDeviceList, response)
      }
    })
  },
  getDeviceTypeList(context, cb) {
    var url = './common/deviceBrandModelTree'
    http({
      url
    }).then(response => {
      var code = response.data && response.data.head && response.data.head.code
      if (+code === 0) {
        let newDeviceTypeList = response.data && response.data.data
        newDeviceTypeList.forEach(item => {
          item.label = item.name;
          item.value = item.deviceClassId; // 设备类型deviceClassId
          if (
            typeof item.nodeList !== "undefined" &&
            item.nodeList.length > 0
          ) {
            item.nodeList.forEach(subItem => {
              subItem.label = subItem.name;
              subItem.value = subItem.id; // 设备品牌id
              if (
                typeof subItem.nodeList !== "undefined" &&
                subItem.nodeList.length > 0
              ) {
                subItem.nodeList.forEach(grandItem => {
                  grandItem.label = grandItem.name;
                  grandItem.value = grandItem.id; // 设备型号id
                });
              }
            });
          }
        });
        cb(newDeviceTypeList, response)
      }
    })
  },
  getDeviceNameList(context, config, cb) {
    var {
      url
    } = config
    http({
      url
    }).then(response => {
      var code = response.data && response.data.head && response.data.head.code
      if (+code === 0) {
        let data = response.data && response.data.data
        // let newDeviceNameList = []
        if (data) {
          data.forEach(item => {
            item.label = item.name
            item.value = item.id
          })
          cb(data, response)
        }
      }
    })
  }
}