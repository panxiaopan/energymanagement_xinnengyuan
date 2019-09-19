import http from "./http";

export default {
  getWorkOrderList(context, config, cb) {
    var {
      url,
      json
    } = config
    http({
      url,
      json
    }).then(response => {
      // if (+code === 0) {
      var data = response.data && response.data.data
      if (data) {
        var {
          total,
          dataList
        } = context.state.workOrderList
        if (!!data) {
          total = typeof data.total !== 'undefined' ? data.total : total
          dataList = typeof data.rows !== 'undefined' ? data.rows : dataList

          if (typeof dataList !== "undefined" && dataList.length > 0) {
            dataList = dataList.map(item => {
              console.log("++++++++++++++", item)
              let actioners = item.task && item.task.actioners;
              if (actioners) {
                Object.assign(item.workorderVo, {
                  actioners
                });
              }
              item = {
                ...item.workorderVo
              }
              console.log("item++++++++", item)
              return item
            });
          }
          console.log("dataList-------", dataList)
        }
        var newWorkOrderList = {
          total,
          dataList
        }
        cb(newWorkOrderList, response)
      }
    })
  },
}