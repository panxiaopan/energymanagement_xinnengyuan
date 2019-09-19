const placeholderObj = {
  zh: {
    name: "请输入社会单位名称",
    registCode: "请输入注册码，注册码为设备铭牌编号",
    latLng: "请选择经纬度，点击右侧选择经纬度按钮",
    industry: '请选择行业',
    safetyManName: '请输入安全责任人姓名',
    safetyManTel: '请输入安全责任人电话(手机/固定电话)',
    unvalidTel: '电话/手机号码格式不正确',
    deviceName: '请输入设备名称',
    deviceTreeId: '请选择设备类型/品牌/型号',
    // deviceClassId: '请选择设备类型',
    // deviceBrandId: '请选择设备品牌',
    // deviceTypeId: '请选择设备型号',
    commId: '请输入通信Id，默认为1',
    location: '请输入设备位置，建议命名规则楼层/楼道+房间或公司名称/楼梯口+编号，如4楼华杰电气406#2',
    // mainCircuitCurrent: '请输入电流互感器规格，即输入侧电流与输出侧电流比值',
    mainCircuitCurrent: '请选择电流互感器规格',
    country: "请选择国家",
    province: "请选择省",
    city: "请选择市/辖区",
    county: "请选择县",
    town: "请选择乡",
    remark: "请输入详细地址",
    installedCompany: "请输入安装商名称"
  },
  en: {
    name: "Please input name",
    registCode: "Please input registCode",
    latLng: "Please input latLng",
    industry: 'Please input industry',
    safetyManName: 'Please input the name of responsible',
    safetyManTel: 'Please input the telephone of responsible',
    unvalidTel: 'Unvalid telephone number',
    deviceName: 'Please input device name',
    deviceTreeId: 'Please select device type/brand/model',
    // deviceClassId: 'Please input device type',
    // deviceBrandId: 'Please input device brand',
    // deviceTypeId: 'Please input device model',
    commId: 'Please input comm.id',
    location: 'Please input device position',
    mainCircuitCurrent: 'Please select main circuit level',
    country: "Please input country",
    province: "Please input province",
    city: "Please input city",
    county: "Please input county",
    town: "Please input town",
    remark: "Please input remark",
    installedCompany: "Please input installedCompany"
  }
};
const labelTextObj = {
  zh: {
    name: "社会单位名称",
    registCode: "识别码",
    latLng: "经纬度",
    industry: '行业',
    safetyManName: '安全责任人姓名',
    safetyManTel: '安全责任人电话',
    deviceName: '设备名称',
    deviceTreeId: '设备类型/品牌/型号',
    // deviceClassId: '设备类型',
    // deviceBrandId: '设备品牌',
    // deviceTypeId: '设备型号',
    commId: '通信Id',
    location: '设备位置',
    mainCircuitCurrent: '电流互感器规格',
    area: '所在地区',
    country: "国家",
    province: "省",
    city: "市",
    county: "县",
    town: "乡",
    remark: "详细地址",
    installedCompany: "安装商名称"
  },
  en: {
    name: "Name",
    registCode: "RegistCode",
    latLng: "Lat.lng",
    industry: 'Industry',
    safetyManName: 'SafetyManName',
    safetyManTel: 'SafetyManTel',
    deviceName: 'DeviceName',
    deviceTreeId: 'Device type/brand/model',
    // deviceClassId: 'Device classId',
    // deviceBrandId: 'Device brandId',
    // deviceTypeId: 'DeviceTypeId',
    commId: 'Comm.Id',
    location: 'Location',
    mainCircuitCurrent: 'Main circuit current',
    area: 'Area',
    country: "Country",
    province: "Province",
    city: "City",
    county: "County",
    town: "Town",
    remark: "Remark",
    installedCompany: "installedCompany"
  }
}

// 语言显示lang 是否新增表单isAdd--新增表单含默认设备信息，修改表单含消防信息
export default function (lang = 'zh') {
  // console.log("is add+++++++", isAdd)
  const commonValidator = (rule, item, callback) => {
    // console.log('item+++++validator', item)
    let value = item.value
    let tips = item.placeholder
    // let name = item.name || ''
    // let fixedReg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
    // let mobileReg = /^1(3|4|5|7|8)\d{9}$/

    if (value === "" || (value.trim && value.trim().length === 0)) {
      callback(new Error(tips));
      // } else if (name === 'safetyManTel' && fixedReg.test(value) || mobileReg.test(value)) { //手机和固定电话校验
      //   callback(new Error(tips))
    } else {
      callback();
    }
  };
  const telValidator = (rule, item, callback) => {
    let value = item.value
    let tips = item.placeholder
    let unValidTips = placeholderObj[lang]['unvalidTel']
    // let name = item.name || ''
    let fixedReg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/
    let mobileReg = /^1(3|4|5|7|8)\d{9}$/
    // console.log('tel value', value, mobileReg.test(value), fixedReg.test(value))
    if (value === "" || (value.trim && value.trim().length === 0)) {
      callback(new Error(tips));
    } else if (!(fixedReg.test(value) || mobileReg.test(value))) { //手机和固定电话校验
      callback(new Error(unValidTips))
    } else {
      callback();
    }
  }

  const deviceTreeIdValidator = (rule, item, callback) => {
    let value = item.value
    let tips = item.placeholder
    if (value.length === 0) {
      callback(new Error(tips));
    } else {
      callback();
    }
  };
  const areaValidator = (rule, item, callback) => {
    let value = item.value
    // let tips = item.placeholder
    let {
      country,
      province,
      city,
      county,
      town
    } = value,
    // 分别判断省市区县级别是否有数据
    countryValid = !(country && country.code),
      provinceValid = !(province && province.code),
      cityValid = !(city && city.code),
      countyValid = !(county && county.code),
      townValid = !(town && town.code)
    // 分别判断省市区县级别是否有数据
    if (countryValid) {
      callback(new Error(placeholderObj[lang]['country']));
    } else if (provinceValid) {
      callback(new Error(placeholderObj[lang]['province']));
    } else if (cityValid) {
      callback(new Error(placeholderObj[lang]['city']));
    } else if (countyValid) {
      callback(new Error(placeholderObj[lang]['county']));
    } else if (townValid) {
      callback(new Error(placeholderObj[lang]['town']));
    } else {
      callback();
    }
  };

  // 表单校验规则
  let formObjRules = {
    name: [{
      type: "string",
      required: true,
      validator: commonValidator,
      trigger: "blur"
    }],
    registCode: [{
      type: "string",
      required: true,
      validator: commonValidator,
      trigger: "blur"
    }],
    latLng: [{
      type: "string",
      required: true,
      validator: commonValidator,
      trigger: "change"
    }],
    industry: [{
      type: "string",
      required: true,
      validator: commonValidator,
      trigger: "blur"
    }],
    area: [{
      type: "array",
      required: true,
      validator: areaValidator,
      trigger: "blur"
    }],
    safetyManName: [{
      type: "string",
      required: true,
      validator: commonValidator,
      trigger: "blur"
    }],
    safetyManTel: [{
      type: "string",
      required: true,
      validator: telValidator,
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

  const addrArr = ['country', 'province', 'city', 'county', 'town', 'remark'];
  let addrObj = {};
  addrArr.forEach(item => {
    addrObj[item] = {
      name: "",
      value: "",
      type: item
    };
  });

  const formObjKey = [
    'name',
  
    'latLng',
    'area', //地址选择区域组成的值country,province,city,county,town
    'remark', //详细地址
    'industry',
    'safetyManName',
    'safetyManTel',
    'registCode',
    'deviceName',
    // 设备类型-品牌-型号合并成一个级联表单
    'deviceTreeId',
    'location',
    
  //  'commId',//暂时不适用
    'mainCircuitCurrent',
  ];
  const hideKey = [];
  const formTypeMap = new Map([
    ['name', 'string'],
    ['registCode', 'string'],
    ['latLng', 'latLng'],
    ['area', 'area'],
    ['remark', 'string'],
    ['industry', 'select'],
    ['safetyManName', 'string'],
    ['safetyManTel', 'string'],
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
    if (key === 'area') {
      value = {
        country: null,
        province: null,
        city: null,
        county: null,
        town: null
      }
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
  addrArr.forEach(addr => {
    //详细地址通过上述表单key写入
    if (addr === 'remark') {
      return
    }
    formObj[addr] = {
      name: addr,
      value: '',
      formType: formTypeMap.get(addr) || 'string',
      type: "string",
      show: false,
      disabled: true,
      placeholder: placeholderObj[lang][addr]
    };
  });
  hideKey.forEach(key => {
    if (formObj[key] && formObj[key]["show"]) {
      formObj[key]["show"] = false;
    }
  });
  let submitFormKey = [
    "areaId",
    "longitude",
    "latitude",
    "addrjson",
    "registCode",
    "name",
    "industry",
    "safetyManName",
    "safetyManTel",
    "deviceName",
    "commId",
    "location",
    "mainCircuitCurrent",
    "deviceClassId",
    "deviceBrandId",
    "deviceTypeId"
  ]
  return {
    formObj,
    formObjRules,
    formObjKey,
    hideKey,
    addrArr,
    addrObj,
    submitFormKey
  }
}