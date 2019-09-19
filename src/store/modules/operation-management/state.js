const state = {
  workOrderList: {
    total: 0,
    dataList: [{
      number: '123456',
      assignedTime: '2018-08-08 08:08:08',
      finishedTime: '2018-08-08 08:08:09',
      socialUnit: '康和盛大厦',
      deviceName: '1#华杰电气技术有限公司',
      workOrderType: '维保',
      workOrderStatus: '处理中',
      workOrderDesc: '设备老化，需更换设备',
    }]
  },
  inspectionPlanList: {
    total: 0,
    dataList: [{
      creationTime: '2018-08-08 08:08:08',
      inspectionTime: '2018-08-08 08:08:20',
      socialUnit: '华杰电气技术有限公司',
      inspector: '张三',
      inspectionTitle: '常规巡检',
      inspectionContent: '巡检元器件是否运行正常',
      operation: '操作',
    }]
  }
}


export default state