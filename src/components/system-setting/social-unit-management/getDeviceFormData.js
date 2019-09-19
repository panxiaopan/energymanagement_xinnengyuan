const placeholderObj = {
  zh: {
    registCode: "请输入注册码，注册码为设备铭牌编号",
    deviceName: '请输入设备名称',
    deviceTreeId: '请选择设备类型/品牌/型号',
    // deviceClassId: '请选择设备类型',
    // deviceBrandId: '请选择设备品牌',
    // deviceTypeId: '请选择设备型号',
    commId: '请输入通信Id，默认为1',
    location: '请输入设备位置，建议命名规则楼层/楼道+房间或公司名称/楼梯口+编号，如4楼华杰电气406#2',
    mainCircuitCurrent: '请选择电流互感器规格'
    // mainCircuitCurrent: '请输入电流互感器规格，即输入侧电流与输出侧电流比值'
  },
  en: {
    registCode: "Please input registCode",
    deviceName: 'Please input device name',
    deviceTreeId: 'Please select device type/brand/model',
    // deviceClassId: 'Please input device type',
    // deviceBrandId: 'Please input device brand',
    // deviceTypeId: 'Please input device model',
    commId: 'Please input comm.id',
    location: 'Please input device position',
    mainCircuitCurrent: 'Please select main circuit level'
  }
};
const labelTextObj = {
  zh: {
    registCode: "识别码",
    deviceName: '设备名称',
    deviceTreeId: '设备类型/品牌/型号',
    // deviceClassId: '设备类型',
    // deviceBrandId: '设备品牌',
    // deviceTypeId: '设备型号',
    commId: '通信Id',
    location: '设备位置',
    mainCircuitCurrent: '电流互感器规格',
  },
  en: {
    registCode: "RegistCode",
    deviceName: 'DeviceName',
    deviceTreeId: 'Device type/brand/model',
    // dtuTag: 'RegistCode',
    // deviceClassId: 'Device classId',
    // deviceBrandId: 'Device brandId',
    // deviceTypeId: 'DeviceTypeId',
    commId: 'Comm.Id',
    location: 'Location',
    mainCircuitCurrent: 'Main circuit current',
  }
}

// 语言显示lang 是否新增表单isAdd--新增表单含默认设备信息，修改表单含消防信息
export default function (lang = 'zh') {
  // console.log("is add+++++++", isAdd)
  const commonValidator = (rule, item, callback) => {
    let value = item.value
    let tips = item.placeholder
    if (value === "") {
      callback(new Error(tips));
    } else {
      callback();
    }
  };
  const deviceTreeIdValidator = (rule, item, callback) => {
    let value = item.value
    let tips = item.placeholder
    if (value.length === 0) {
      callback(new Error(tips));
    } else {
      callback();
    }
  };


  // 表单校验规则
  let formObjRules = {
    registCode: [{
      type: "string",
      required: true,
      validator: commonValidator,
      trigger: "blur"
    }],
    deviceName: [{
      type: "string",
      required: true,
      validator: commonValidator,
      trigger: "blur"
    }],
    deviceTreeId: [{
      type: 'array',
      required: true,
      validator: deviceTreeIdValidator,
      trigger: "change"
    }],
    location: [{
      type: 'string',
      required: true,
      validator: commonValidator,
      trigger: 'blur'
    }],
    commId: [{
      type: 'string',
      required: true,
      validator: commonValidator,
      trigger: 'blur'
    }],
    mainCircuitCurrent: [{
      type: 'string',
      required: true,
      validator: commonValidator,
      trigger: 'blur'
    }]
  };


  const formObjKey = [
    'registCode',
    'deviceName',
    // 'dtuTag',
    // 设备类型-品牌-型号合并成一个级联表单
    'deviceTreeId',
    'location',
   // 'commId',//暂时不启用
    'mainCircuitCurrent',
  ];
  const hideKey = [];
  const formTypeMap = new Map([
    ['deviceName', 'string'],
    ['deviceTreeId', 'cascader'],
    ['location', 'string'],
    ['commId', 'string'],
    ['mainCircuitCurrent', 'select']
    // ['mainCircuitCurrent', 'string']
  ])
  // const arrValueKey = ['deviceTreeId', 'area']
  let formObj = {};
  formObjKey.forEach(key => {
    let value = ''
    if (key === 'deviceTreeId') {
      value = []
    }
    if (key === 'commId') { //通信id默认填充1
      value = 1
    }
    formObj[key] = {
      name: key,
      value,
      label: labelTextObj[lang][key],
      formType: formTypeMap.get(key) || 'string',
      type: "string",
      show: true,
      placeholder: typeof placeholderObj[lang][key] === "undefined" ? "" : placeholderObj[lang][key]
    };
  });

  hideKey.forEach(key => {
    if (formObj[key] && formObj[key]["show"]) {
      formObj[key]["show"] = false;
    }
  });
  let submitFormKey = [
    'registCode',
    "deviceName",
    "commId",
    // "dtuTag",
    "location",
    "mainCircuitCurrent",
    "deviceClassId",
    "deviceBrandId",
    "deviceTypeId"
  ]
  return {
    formObj, // 组件的表单项
    formObjRules, // 组件的表单校验规则
    formObjKey, // 组件的表单项
    hideKey, // 需要默认收起或隐藏的表单项key
    submitFormKey, // 需要提交的表单项key
  }
}