import cnLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
  common: {
    chinese: '中文',
    login: '登录',
    signUp: '注册',
    station: '电站',
    forgetPassword: '忘记密码',
    resetPassword: '重置密码',
    verifiedCode: '验证码',
    rememberPassword: '记住密码',
    autoLogin: '自动登录',
    inputUsernameTips: '请输入用户名',
    inputPasswordTips: '请输入密码',
    errorPhoneNumber: '手机号码格式错误',
    inputCompletePassword: '密码长度不少于6位',
    inputVerifyCodeTips: '请输入验证码',
    inputCompleteCode: '验证码长度不少于6位',
    search: '搜索',
    filterCondition: '筛选条件',
    confirmCurrentPage: '确认当前页',
    emptyData: '暂无数据',
    mapAnalysis: '地图分析',
    stationList: '电站列表',
    alarmList: '报警列表',
    systemSetting: '系统设置',
    groupUserSetting: '集团用户属性设置',
    carouselSetting: '轮播设置',
    carouselContent: '轮播内容',
    customContent: '自定义内容',
    carouselInfo: '轮播信息',
    alarmEvent: '报警事件',
    numbers2Show: '显示条数',
    templateShow: '显示模板',
    sortField: '排序字段',
    cloudView: '云平台视图',
    superAdministrator: '超级管理员',

    basicInfo: '基本信息',
    incomeInfo: '收益信息',
    electricityOfPeakValley: '峰谷分时电价',
    peakElectricity: '峰值电价',
    valleyElectricity: '谷值电价',
    averageElectricity: '平价',

    address: '地址',
    installedCapacity: '装机容量',
    state: '状态',
    installedDate: '安装日期',
    chargeState: '充放电状态',
    directCurrentPower: '直流功率',
    acPower: '交流功率',
    dcPower: '直流功率',
    runningStatus: '运行状态',
    deviceName: '设备名称',
    eventType: '事件类型',
    level: '等级',
    deviceType: '设备类型',
    description: '描述',
    confirmedMan: '确认人',
    operation: '操作',
    all: '所有',
    sleep: '待机',
    normal: '正常',
    comError: '通信故障',
    error: '故障',
    info: '信息',
    unknown: '未知',
    comEvent: '通信事件',
    deviceEvent: '装置事件',
    videoEvent: '视频事件',
    camera: '摄像头',
    comId: '通信Id',
    manufacturer: '厂商',
    model: '型号',
    time: '时间',
    day: '日',
    week: '周',
    month: '月',
    year: '年',
    total: '总',
    updateTime: '更新时间',
    testPointName: '测点名称',
    value: '值',
    unit: '单位',
    viewHistory: '查看历史',
    recentOneWeek: '最近一周',
    recentOneMonth: '最近一个月',
    recentThreeMonth: '最近三个月',
    selectTimeRange: '选择时间范围',

    // 电站详情
    summary: '汇总',
    device: '设备',
    overview: '概述',
    treeAlike: '树形展示',
    cardAlike: '分类展示',
    pcs: 'PCS',
    bms: 'BMS',
    video: '视频',

    return: '返回',
    failedLoading: '加载失败',
    basicInfo: '基本信息',
    params: '参数',
    income: '收益',
    energy: '电量',
    power: '功率',
    weather: '天气',
    alarm: '报警',
    extraData: '叠加参数',
    addSocialUnit: '添加社会单位',
    weather: '天气',
    incomeTrend: '收益趋势',
    owner: '所有者',
    pcsBrands: 'PCS品牌',
    batteryBrands: '电池品牌',
    bmsBrands: 'BMS品牌',
    capitalGains: '资金收益',
    currency: '币种',
    type: '类型',
    timeRange: '时段',
    unit: '单位',
    price: '价格',
    flatPrice: '平段电价',
    highPeakPrice: '尖峰电价',
    peakPrice: '峰段电价',
    valleyPrice: '谷段电价',
    season: '季节',

    favorite: '收藏',
    history: '历史',
    sort: '排序',
    nearBy5km: '附近5公里',
    nearBy10km: '附近10公里',
    nearBy20km: '附近20公里',
    nearBy50km: '附近50公里',

    stationIdNullError: '电站Id不存在，请重试或联系系统管理员',
    yes: '是',
    no: '否',
    addFilterCondition: '添加过滤条件',
    stationInfo: '电站信息',
    textCarousel: '文本轮播',
    alarmCarousel: '报警轮播',
    stationCarousel: '电站轮播',

    kw: '千瓦',
    kwh: '度',
    chargePrice: '充电价格',
    dischargePrice: '放电价格',
    runningInfo: '运行信息',
    charge: '充电',
    discharge: '放电',
    envTemperature: '环境温度',
    socialUnitManagement: '社会单位和设备管理',
    userRightsManagement: '用户权限管理',
    addStation: '添加电站',
    workOrderManagement: '工单管理',
    viewAlarmDetailsTip: '查看报警详情',
    addNewWorkOrderTip: '新建工单',
    sendWorkOrder: '派发',
    ok: '确定',
    cancel: '取消',
    unvalidStationId: '电站Id非法',
    single: '单个',
    multiple: '多个',
    name: '名称',
    seriesNum: '序列号',
    confirm: '确认',
    more: '更多',
    warning: '告警',
    warning2: '警告',
    offline: '离线',
    unSavedTips: '已填入信息未保存, 确认离开?',
    unrecoverableUnitTips: "此操作将删除该单位及其设备且不可恢复,确认删除?",
    unrecoverableDeviceTips: "此操作将删除该设备且不可恢复，确认删除？",

    registerSuccessfully: '注册成功',
    resetPasswordSuccessfully: '重置密码成功',

    custom: '自定义',
    realTimeMonitoring: "实时监控",
    socialUnitDetails: '社会单位详情',
    hazardManagement: "隐患管理",
    operationManagement: '运维管理',
    analysisDiagnosis: '分析诊断',
    taskManagement: '任务管理',
    inspectionPlan: '巡检计划',
    workOrderDetails: '工单详情',
    unsavedTips: '你填入的信息还未保存，确认离开吗',

    workOrderCount: '工单总数',
    click2PlayPauseAudio: '点击播放/暂停隐患播报',
    click2PlayAudio: '点击播放隐患播报',
    click2PauseAudio: '点击暂停隐患播报',
    enterpriseUserSetting: '集团用户属性设置',
  },
  cloudView: {
    todo: '待处理',
    doing: '处理中',
    searchPlaceholder: '请输入社会单位名称或地址',
    basicInfo: '基本信息',
    deviceCounts: '设备总数',
    socialUnitCouts: '社会单位总数',
    home: "进入主页",
    productName: "华杰智慧安全用电云平台",
    exit: "退出",

    alarmInfo: '告警信息',
    count: '个',
    name: '名称',
    totalCounts: '总数',
    normal: "正常",
    offline: "离线",
    alarm: "报警",
    error: "故障",
    hazard: '隐患',
    industry: "行业",
    socialUnitStatus: "单位状态",
    personResponsible: "安全责任人",
    hazardCauseStatistics: '隐患类型统计',
    hazardAreaStatistics: '隐患区域统计',
    hazardIndustryStatistics: "隐患行业统计",
    hazardLevelStatistics: '隐患等级统计',
    hazardList: "隐患列表",
    updateTime: "更新时间",
    socialUnit: "社会单位",
    deviceName: "设备名称",
    hazardType: "隐患类型",
    hazardDesc: "隐患描述",
    deviceStatus: '设备状态',
    currentTask: '当前任务',
    recentThirtyDaysTrend: "近30天隐患趋势",
    currentMonthHazard: "本月隐患数",
    lastMonthHazard: "上月隐患数",
    samePeriodLastYearHazard: "去年同期隐患数",
    relativeMonthGrowth: '环比增长',
    relativeYearGrowth: '同比增长',
    disposeOfHazard: "隐患处理",
    click2ShowBox: '点击显示单位统计',
    click2HideBox: '点击隐藏单位统计',
    hazardCountTitle: '隐患数量(个)',


    calm: "无风",
    lightAir: "软风",
    slightBreeze: "轻风",
    breeze: "微风",
    gentleBreeze: "和风",
    freshBreeze: "清风",
    strongWind: "强风",
    highWind: "劲风（疾风）",
    freshGale: "大风",
    blustery: "烈风",
    wholeGale: "狂风",
    violentStrom: "暴风",
    level1Hurricane: "台风（一级飓风）",
    level2Hurricane: "强台风（二级飓风）",
    level3SevereTyphoon: "强台风（三级飓风）", // severe typhoon
    level3SuperTyphoon: "超强台风（三级飓风）", // super typhoon
    level4SuperTyphoon: "超强台风（四级飓风）",
    level5SuperTyphoon: "超级台风（五级飓风）",
  },
  login: {
    phoneNumber: '手机号码',
    msgCode: '短信验证码',
    password: '密码',
    confirmPwd: '确认密码',
    name: '姓名',
    verifiedCode: '验证码',
    submit: '提交',
    reset: '重置',
    newPassword: '新密码',
    confirmNewPwd: '确认新密码',
    linkExchange: '友情链接',
    telephone: '电话',
    email: '邮箱',
    address: '地址',
    hjCopyright: '©2017 深圳市华杰电气技术有限公司 版权所有, 备案号',
  },
  userAccount: {
    nickname: '昵称',
    userManagement: '用户管理',
    loginName: '登录名',
    telephone: '手机号码',
    verifiedCode: '验证码',
    email: '邮箱',
    credentialsType: '证件类型',
    selectCredentialsType: '请选择证件类型',
    credentialsNumber: '证件号码',
    getVerifyCode: '获取验证码',
    save: '保存',
    modifyPassword: '修改密码',
    originalPwd: '原密码',
    newPwd: '新密码',
    confirmNewPwd: '确认新密码',
    edit: '修改',
    inputNickname: '请输入昵称',
    inputPhoneNumber: '请输入电话号码',
    errorPhoneNumber: '电话号码格式不正确',
    phoneNumberNotChanged: '手机号码未修改',
    inputEmail: '请输入邮箱',
    errorEmail: '邮箱格式不正确',
    failed2GetMsgCode: '获取短信验证码失败',
    identityCard: "身份证",
    drivingLicense: "驾驶证",
    passport: "护照",
    inputOriginalPwd: '请输入原密码',
    inputCharLenLimit: '长度在 6 到 15 个字符',
    inputLoginName: '请输入登录名',
    noAllNumberAtLoginName: '登录名不能是全数字',
    noSpaceAtLoginName: '登录名不能有空白符',

    inputNewPwd: '请输入新密码',
    inputNewPwdAgain: '请再次输入新密码',
    inputMsgCode: '请输入短信验证码',
    errorNotSamePwd: '前后密码输入不一致',
    clickRightBtn2GetMsgCode: '请先获取短信验证码',
    modifyPasswordTips: '注: 修改密码后需重新登录',
    errorCredentialsNumber: '证件号码错误',
    modifiedPwdSuccess: '修改密码成功',
    failed2ModifiedPwd: '修改密码失败',
    inputMailAddr: "请输入邮箱",
    inputCorrectMail: "请输入正确邮箱格式",
    inputCredentialsNumber: '请输入证件号码',
    saveSuccessfully: '保存成功',
    failedToSave: '保存失败',
    newPwdCannotEq2OldPwd: '新密码不能与旧密码一致'
  },
  workOrderManagement: {
    handledByMe: '我处理的',
    createdByMe: '我发起的',
    keyword: '工单关键字',
    createdDate: '创建日期',
    toBeReceived: '待接收',
    processing: '处理中',
    completed: '已完成',
    closed: '已关闭',
    close: '关闭',
    finish: '完成',
    assigned: '已发起',
    receive: '接收',
    received: '已接收',
    resolved: '已处理',
    title: '标题',
    currentWorkingMan: '当前处理人',
    relatedDevice: '关联设备',
    relatedStation: '关联电站',
    creator: '发起人',
    updateTime: '更新时间',
    device: '设备',
    description: '描述',
    attachment: '附件',
    comment: '批注',
    reject: '驳回',
    addProcessingAdvice: '添加处理意见',
    ok: '确定',
    cancel: '取消',
    click2Upload: '点击上传',
    inputResolvedAdvice: '输入处理意见',
    advice: '意见',
    uploadImage: '上传图片',
    imageFormatLimit: '仅支持jpg/png格式',
    keywordPlaceholder: '请输入工单标题/电站名称/设备名称',
    stationNamePlaceHolder: '请输入电站名称',
    receiveSuccess: '已接收',
    addCommentSuccess: '已添加',
    submitSuccess: '已提交',
    rejectedSuccess: '已驳回',
    approvedSuccess: '已批准',
    title: '标题',
    inputWorkOrderTitle: '请输入标题',
    inputWorkOrderDescpt: '请输入内容',
    workOrderReceiver: '接收人',
    inputUserNameOrTel: '输入用户名/手机号码',
    fullName: '姓名',
    telephone: '电话',
    createNewWorkOrder: '新建工单',
    selectReceiver: '选择接收人',
    addReceiver: '添加接收人',
    imgFormatError: '图片格式有误',

    viewDetails: '查看详细信息',
    foldUp: '收起详情',
    myTodo: "待我处理",
    doneByMe: "我已处理",
    assignedByMe: "我发起的",
    addSuccessfully: '添加成功',
    addWorkOrder: '添加工单',
    addMaintenance: '添加维保',
    addAdvice: "意见处理",
    addAttachment: '添加附件',
    isSendedOrder: "已派单",
    isDone: '已处理',
    sendOrder: "派单",
    details: "详情",
    executor: '执行人',
    selectExecutor: '请选择执行人',
    advancedSearch: '高级搜索',
    cancelAdvancedSearch: '取消高级搜索',
    workOrderNumber: '工单编号',
    handler: '处理人',
    contactDetails: '联系方式',
    currenStatus: '当前状态',
    originator: '发起人',
    basicInfo: '基本信息',
    socialUnit: '社会单位',
    address: '地址',
    hazardDesc: '隐患描述',
    deviceName: '设备名称',
    devicePos: '设备位置',
    hazardLevel: '隐患等级',
    workOrderFlow: '工单流程',
    relatedInfo: '关联信息',
    inspectionTitle: '巡检标题',
    inspectionContent: '巡检内容',
    inspectionStartTime: '巡检时间',
    inspectionEndTime: '结束时间',
    inspectionResult: '巡检结果',
    maintenanceReason: '维保原因',
    maintenanceType: '维保类型',
    hazardWorkOrder: '隐患工单',
    maintenanceWorkOrder: '维保工单',
    addComement: '添加批注',
    rejectOperation: '驳回处理',
    handleWorkOrder: '处理结果',
    completeWorkOrder: '关闭工单',
    workOrderType: "工单类型",
    eventDate: "日期",
    filter: "筛选",
    search: "搜索",
    workOrderStatus: '工单状态',
    relatedDesc: '来源描述',
    relatedTime: '来源时间',
    relatedWorkOrder: '关联工单',
    back2OrginWorkOrder: '返回原工单',

    removeInspectionPlanTips: '此操作不可恢复，确认删除该计划？',
    creator: "创建人",
    creationTime: "创建时间",
    startTime: "巡检开始时间",
    endTime: "巡检结束时间",
    socialUnit: "社会单位",
    inspectionTitle: "巡检标题",
    inspectionDescription: "巡检描述",
    operation: "操作",
    inspectionDate: "巡检日期",
    createInspectionPlan: "创建计划",
    searchTips: "请输入搜索关键字",

    relatedType: "来源类型"
  },
  hazardManagement: {
    hazardStatus: "隐患状态",
    hazardLevel: "隐患等级",
    hazardDesc: "隐患描述",
    keywordSearch: "搜索",
    eventDate: "日期",
    socialUnit: "社会单位",
    devicePos: "设备位置",
    deviceName: "设备名称",
    eventTime: "时间",
    address: "地址",
    reportManually: "人工上报",
    advancedSearch: "高级搜索",
    search: "搜索",
    cancelAdvancedSearch: '取消高级搜索',
    reportSuccessfully: '上报成功',
    filter: '筛选',
    risk: '消缺',
    maintenance: '维保',
    patrol: '巡检',
    searchKeyword: "搜索关键字",
    dealer: '处理人',
    solutionDesc: '处理结果',
    solutionTime: '处理时间',
    processing: '处理中',
    completed: '完成',

    basicInfo: "基本信息",
    realTimeData: "实时数据",
    hazardHistoryChart: "隐患历史图",
    deviceStatus: "设备状态",
    personResponsible: "安全责任人",
    contactDetails: "联系方式",
    hazardType: "隐患类型",
    click2ShowHazardDetails: '点击查看设备详情',
    alarmValue: '告警值',
    deviceManagement: '设备管理',
    inputAdviceTips: '请输入处理意见',
    selectAdviceTips: '下拉选择常用意见',
    commonAdvice: '常用意见',
    commonAdvice1: '隐患已处理',
    commonAdvice2: '隐患已消除',
    commonAdvice3: '误报隐患, 无异常',
    commonAdviceTips: "点击下列常用标签填充意见",
    emptyImgData: '暂无图片数据',
    hazardRecord: '隐患记录',
    foundTime: '发生时间'
  },
  realTimeMonitoring: {
    searchKeyword: '搜索关键字',
    more: '更多',
    socialUnit: "社会单位",
    address: "地址",
    deviceCount: "设备数量",
    onlineCount: "设备在线数",
    offlineCount: "设备离线数",
    todoHazard: "未处理隐患",
    handlingHazard: "处理中隐患",
    completedHazard: '已完成隐患',
    viewDetails: "查看详情",
    operation: "操作",
    foldUp: "收起",
    currentHazardStatistics: '隐患处理统计',
    paramsName: "参数名称",
    paramsValue: "参数数值",
    warningStatus: "预警状态",
    alarmStatus: "报警状态",
    realTimeData: "实时数据",
    paramsChart: "参数趋势图",
    custom: "自定义",
    residualCurrent: '剩余电流',
    temperature: '温度',
    current: '电流',
    voltage: '电压',
    activePower: '有功功率',
    basicInfo: "基本信息",
    deviceStatus: "设备状态",
    hazardStatistics: "隐患统计",
    industry: "所属行业",
    unitTelephone: "单位电话",
    buildingArea: "建筑面积",
    personResponsible: "安全责任人",
    contactDetails: "联系方式",
    hazardList: "隐患列表",
    totalEnergy: '用电量',
    aPhaseVoltage: 'A相电压',
    bPhaseVoltage: 'B相电压',
    cPhaseVoltage: 'C相电压',
    aPhaseCurrent: 'A相电流',
    bPhaseCurrent: 'B相电流',
    cPhaseCurrent: 'C相电流',
  },
  socialUnitManagement: {
    searchKeyword: '请输入社会单位名称或地址'
  },
  systemSetting: {

    socialUnitSetting: '社会单位管理',
    communicationSetting: '通信设置',
    deviceManagement: '设备管理',
    cameraSetting: '摄像头管理',
    basicSetting: '基本设置',
    paramsSetting: '参数设置',
    save: '保存',
    reset: '重置',
    hasChanged: '已修改',
    quickSearchCity: '快速搜索城市名称',
    longitude: '经度',
    latitude: '纬度',
    ok: '确认',
    cancel: '取消',
    stationName: '社会单位名称',
    owner: '社会单位所有者',
    latLng: '经纬度',
    area: '所在地区',
    dtuSerialNum: 'DTU序列号',
    kwUnit: '千瓦',
    kwhUnit: '度',
    China: '中国',
    touEnabled: '是否分时计费',
    touId: '分时计费方案',
    installedCompany: '安装商名称',
    installedDate: '安装日期',
    addDtu: '添加DTU',
    addDevice: '添加设备',
    dtuName: 'DTU名称',
    deviceName: '设备名称',
    deviceType: '设备类型',
    deviceBrand: '设备品牌',
    deviceModel: '设备型号',
    installedCapacity: '装机容量',
    comId: '通信ID',
    addSuccessfully: '添加成功',
    updateSuccessfully: '修改成功',
    manResponsible: '安全责任人',

    more: '更多',
    foldUp: '收起',
    inputName: "请填入名称",
    inputSerialNum: "请填入序列号",
    inputLiveAddr: "请填入直播地址",
    inputChannelId: "请填入通道id",
    cameraName: "名称",
    seriesNum: "序列号",
    liveAddr: "直播地址",
    channelId: "通道id",
    uneditedTips: "您并未修改信息!",
    imageFormatLimit: '仅支持jpg/png格式',
    selectFile: '选取文件',
    pics: '上传图片',
    batteryBrandName: '电池品牌',
    linkedBms: '关联的BMS',
    passwordNullError: '密码不能为空',
    passwordError: '密码不正确',
    removeSocialUnitSuccessfully: '删除社会单位成功',
    removeDtuSuccessfully: '删除DTU成功',
    removeDeviceSuccessfully: '删除设备成功',
    saveSuccessfully: '保存成功',
    add: "添加",
    delete: "删除",
    searchStationKeyword: '请输入社会单位地址或名称',

    inputPwdTips: '请输入6~16位数密码',
    belongGroup: '所属用户组',
    createTime: '创建时间',
    removeSuccessfully: '删除成功',
    warnig2: '警告',
    addProprietor: '添加业主',
    defaultPwdTips: '默认密码为手机后六位',
    addOpsUser: '添加运维人员',
    inputUsrNameOrPhoneNum: '请输入用户名或手机号',
    userList: '用户列表',
    confirmResetPassword: '请确认是否重置密码',

    userListInGroup: '用户列表--当前用户组',
    homePath: '归属路径',
    operation: '操作',
    userWhoCanView: '谁可以看',
    unknown: '未知',
    name: '名称',
    installedCapacity_abbr: '装机容量',
    remark: '详细地址',
    belongGroup: '所属用户组',
    viewableUsers: '哪些人可以看到',
    cancelRemove: '已取消删除',
    specifiedOwner: '指定所有者',
    addStationViewable: '添加当前用户可见社会单位',
    reservedItem: '备选项',
    installCompany: '安装商',
    administrator: '管理员',
    proprietor: '业主',
    opsMember: '运维人员',
    socialUnit: '社会单位',
    user: '用户',
    inputStationNameAddr: '请输入社会单位名称和地址',
    search: '搜索',
    identifier: "编号",
    switchRole: '转换角色',
    userGroup: '用户组',
    password: '密码',
    inputPwd: '请输入密码',
    currentGroup: '当前用户组',
    showSubUsergroup: '显示该子用户组的',
    addUserGroup: '添加用户组',
    excuting: '执行中...',
    confirmDeleteGroup: '确认删除该用户组？',
    deleteGroup: '删除用户组',
    enterpriseUserGroup: '集团用户组',
    telephone: "电话",
    loginName: '登录名',
    nickname: '昵称',
    role: '角色',
    usrGroupTypeCanNotBeNull: "用户组类型不能为空",
    usrNameCanNotBeNull: "用户名不能为空",
    inputUserGroupName: "请输入用户组名称",
    userGroupName: "用户组名称",
    userGroupType: "用户组类型",
    selectUserGroupType: "请选择创建的用户组类型",
    inputLoginName: '请输入登录名',
    noAllNumberAtLoginName: '登录名不能是全数字',
    noSpaceAtLoginName: '登录名不能有空白符',
    inputCharFormatTips: '支持中文,字母,数字, 下划线, 短横线',
    inputNickname: '请输入昵称',
    assignRole: '请分配角色',
    roleList: '角色列表',
    selectedRole: '已选角色',
    delete: '删除',
    add: '添加',
    basicProperty: '基本属性',
    selectAddr: '请选择地址',
    address: '地址',
    inputAddr: '请输入地址',
    detailedAddr: '详细地址',
    inputDetailedAddr: '请输入详细地址',
    createTime: '创建时间',
    inputCreateTime: '请输入创建时间',
    editTime: '修改时间',
    inputEditTime: '请输入修改时间',
    selectUserGroup: '请选择用户组',
    resetPassword: '重置密码',
    canNotBeNull: '不能为空',
    errorType: '类型错误',
    modifySuccessfully: '修改成功',
    confirmEditedResult: '是否确认修改',
    tips: '提示',
    cancelledEdit: '已取消修改',
    click2Edit: '点击修改',
    confirmEdit: '确定修改',
    inputPhoneNum: '请输入手机号码',
    errorPhoneNum: '请输入正确的手机号码',
    addUser: '添加用户',
    confirmAdd: '确认添加',
    userAuthorityMng: '用户权限管理',
    opsUserProperty: '运维人员属性',
    proprietorProperty: '业主属性',
    userProperty: '用户属性',
    backendOpsGroup: '后端运维组',
    cannotRemoveRoot: '不能删除根节点',
    inputUserNameOrTel: '请输入用户名/电话',
    editBelongGroup: "编辑所属用户组",
    notVisibleForEndUserOrUserGroup: "删除社会单位的可见用户组或者业主",
    configViewableForUserOrUserGroup: "设置社会单位的可见用户组或用户",
    configUnviewableStation: "设置不可见社会单位",
    removeMaintenanceStaffTips: '删除后将无法使用该账号登录系统，确认删除?',
    configUnviewableStationTip: "是否把该社会单位从当前用户组中删除（即该社会单位对当前用户组及子用户组的用户不可见）",
    configUnviewableStationForUserTip: "是否设置该社会单位对当前用户不可见？",
    deleteSocialUnitTips: "将社会单位从用户组移除，当用户组为社会单位所有者的用户组时，不可移除",
    socialUnitListCanView: '该用户可见的社会单位列表',
    mustOneRoleAtLeast: '至少保留一个用户角色',
    townCodeErrorTips: '选中的地区层级暂时为空, 需手动选择省市区县街道信息',

    addContactItemLimits: '联系方式最多只能显示5项，不能再添加了'
  },
  yahooWeather: {
    'tornado': '暴风',
    'tropical storm': '台风雨',
    'hurricane': '飓风',
    'severe thunderstorms': '强雷暴天气',
    'thunderstorms': '雷暴雨',
    'mixed rain and snow': '雨夹雪',
    'mixed rain and sleet': '雨夹霰',
    'mixed snow and sleet': '雪夹霰',
    'freezing drizzle': '冻毛雨',
    'drizzle': '细雨',
    'freezing rain': '冻雨',
    'showers': '阵雨',
    'snow flurries': '阵雪',
    'light snow showers': '小雨雪',
    'blowing snow': '大雪',
    'snow': '雪',
    'hail': '冰雹',
    'sleet': '霰',
    'dust': '沙尘',
    'foggy': '多雾',
    'haze': '霾',
    'smoky': '烟雾',
    'blustery': '暴风',
    'windy': '大风',
    'cold': '寒冷',
    'cloudy': '多云',
    'mostly cloudy (night)': '夜间大部多云',
    'mostly cloudy (day)': '白天大部多云',
    'partly cloudy (night)': '夜间局部阴天',
    'partly cloudy (day)': '白天局部阴天',
    'clear (night)': '夜间晴空',
    'sunny': '晴天',
    'fair (night)': '夜间晴朗',
    'fair (day)': '白天晴朗',
    'mixed rain and hail': '雨加冰雹',
    'hot': '炎热',
    'isolated thunderstorms': '局部风暴',
    'scattered thunderstorms': '时有暴雨',
    'scattered showers': '阵雨',
    'heavy snow': '暴雪',
    'scattered snow showers': '零星阵雪',
    'partly cloudy': '局部多云',
    'thundershowers': '雷阵雨',
    'snow showers': '雨雪',
    'isolated thundershowers': '局部雷阵雨',
    'not available': ''
  },
  ...cnLocale
}

export default cn