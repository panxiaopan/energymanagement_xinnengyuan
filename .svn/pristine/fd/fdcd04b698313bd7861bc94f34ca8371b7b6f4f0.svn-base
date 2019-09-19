import http from "@/api/http";
import getFormattedValueAndUnit from '@/utils/getFormattedValueAndUnit';
const actions = {
  queryStationList(context, playload) {
    var {
      url,
      json
    } = playload
    http({
      url,
      json
    }).then(response => {
      var data = response.data && response.data.data;
      var stationList = context.state.stationList
      if (!!data) {
        stationList.total = data.total || context.state.stationList.total;
        stationList.dataList = data.rows || context.state.stationList.dataList;
        let valueKeyArr = [
          'batteryCapacity',
          'ratedPower',
          'todayChargeKwh',
          'todayDischargeKwh'
        ]
        stationList.dataList.forEach(item => {
          item.installedDate = moment(item.installedDate).format("YYYY-MM-DD")
          Object.keys(item).forEach(key => {
            if (valueKeyArr.includes(key)) {
              item[key] = getFormattedValueAndUnit({
                data: item[key]
              })
            }
          })
        })
      }
      context.commit("updateStationList", stationList)
    })
  },

  setSocialUnit(context, playload) {
    context.commit("updateSocialUnit", playload)
  },
  setDevice(context, playload) {
    context.commit("updateDevice", playload)
  },
  setActiveTabName(context, playload) {
    context.commit("updateActiveTabName", playload)
  },
  resetState(context, playload) {
    context.commit("resetState")
  }
}

export default actions