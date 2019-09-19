import http from "@/api/http";
const actions = {
  // queryAlarmEventList(context, playload) {
  //   var {
  //     state
  //   } = context
  //   var {
  //     url,
  //     json
  //   } = playload
  //   http({
  //     url,
  //     json
  //   }).then(response => {
  //     var newAlarmEventList = null;
  //     var data = response.data && response.data.data;
  //     var dataList, total;
  //     if (!!data) {
  //       total = data.total || state.alarmEventList.total;
  //       dataList = data.rows || [];
  //     } else {
  //       dataList = state.alarmEventList && state.alarmEventList.dataList || []
  //       total = state.alarmEventList && state.alarmEventList.total || 0
  //     }
  //     newAlarmEventList = {
  //       total,
  //       dataList
  //     }
  //     context.commit("updateAlarmEventList", newAlarmEventList)
  //   })
  // },
  // resetState(context, playload) {
  //   context.commit("resetState")
  // }
}

export default actions