import workOrder from '@/api/workOrder.js'

const actions = {
  // setWorkOrderListConfig(context, playload) {
  //   let newWorkOrderListConfig = Object.assign(contex.state.workOrderListConfig, playload)
  //   context.commit("updateWorkOrderListConfig", newWorkOrderListConfig)
  // },
  queryWorkOrderList(context, playload) {
    workOrder.getWorkOrderList(context, playload, (newWorkOrderList, response) => {
      context.commit("updateWorkOrderList", newWorkOrderList)
    })
  },
}

export default actions