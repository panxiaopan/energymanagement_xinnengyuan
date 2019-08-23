import {
  baseUrl
} from "../../static/baseurl";
import axios from "axios";
import qs from "qs";

axios.defaults.baseURL = baseUrl; //接口变量..  引用过来编译的时候不会变,

axios.interceptors.request.use(
  config => {
    //const token = sessionStorage.getItem('token')
    //  let data = config.data
    console.log(config);
    //  if()



    if (config.method == "post") {
      let data = config.data;
      console.log("拦截");
      console.log(config)
      console.log(data);
      config.data = qs.stringify({
        ...config.data
        // token: token
      }, {
        arrayFormat: 'repeat'
      });

      return config;

    } else if (config.method === "get" || config.method === "delete") {
      config.params = {
        //token: token,
        ...config.params
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//登录接口
export const userlogin = parms => {
  return axios.post("/session", parms);
};
//忘记密码重置
export const forgetpassword = parms => {
  return axios.post("session/telCode", parms);
};
//实时监控获取社会单位
export const getstations = parms => {
  return axios.get("/stations", {
    params: parms
  });
};
//获取能源站的汇总信息
export const getstationssummary = stationId => {
  return axios.get(`/stations/${stationId}/summary`);
};
//获取能源子站点类型信息
export const getstationsidNameType = stationId => {
  return axios.get(`/stations/${stationId}/subNodes/idNameType`);
};
//获取子站汇总信息
export const getsubstation = (stationId, subStationId) => {
  return axios.get(`stations/${stationId}/subNodes/${subStationId}/summary`);
};
//获取光伏子站日功率
export const getsolardata = (subStationId, parms) => {
  return axios.get(`stations/solar/${subStationId}/powers`, {
    params: parms
  });
};
//获取光伏子站发电信息
export const getsolaryearmonth = (subStationId, year, month) => {
  return axios.get(`stations/solar/${subStationId}/energys/${year}/${month}`);
};
//查询子站的设备列表
export const getdevice = (stationId, subStationId, parms) => {
  return axios.get(`stations/${stationId}/subNodes/${subStationId}/devices`, {
    params: parms
  });
};
//获取子站的设备类型列表
export const getdeviceTypes = (stationId, subStationId) => {
  return axios.get(
    `stations/${stationId}/subNodes/${subStationId}/deviceTypes`
  );
};
//查询单个设备的实时数据列表
export const getdevicesrealtime = deviceId => {
  return axios.get(`stations/devices/${deviceId}/realtime`);
};
//查询单个测点的历史记录
export const getdeviceIddataId = (deviceId, dataId, parms) => {
  return axios.get(`stations/devices/${deviceId}/history/dataIds/${dataId}`, {
    params: parms
  });
};
//获取子站的报警列表
export const getsubNodesalarms = (stationId, subStationId, parms) => {
  return axios.get(`stations/${stationId}/subNodes/${subStationId}/alarms`, {
    params: parms
  });
};
//查询子站报警信息统计
export const getalarmStatistics = (stationId, subStationId) => {
  return axios.get(
    `stations/${stationId}/subNodes/${subStationId}/alarmStatistics`
  );
};
//获取子站下的设备ID和名称列表
export const getdevicesidName = (subStationId, parms) => {
  return axios.get(`stations/subNodes/${subStationId}/devices/idName`, {
    params: parms
  });
};
//人工上报报警记录
export const alarmsreportArtificially = parms => {
  return axios.post("alarms/reportArtificially", parms);
};
//运维人员列表
export const getauthmaintainers = parms => {
  return axios.get(`/auth/users/maintainers`, {
    params: parms
  });
};
//发起工单
export const addworkOrders = parms => {
  return axios.post("/workOrders", parms);
};
//查看报警详情
export const getalarmsDeil = (id, parms) => {
  return axios.get(`alarms/${id}`, {
    params: parms
  });
};
//处理隐患,填写处理意见
export const riskshandlingOpinions = (id, parms) => {
  return axios.post(`/alarms/${id}/handlingOpinions`, parms);
};
//查询工单列表
export const getworkOrderslist = parms => {
  return axios.get(`/workOrders`, {
    params: parms
  });
};
//查看工单详情
export const getflowDetail = id => {
  return axios.get(`/workOrders/${id}/flowDetail`);
};
//获取储能子站的功率信息
export const energyStoragepowers = (subStationId, parms) => {
  return axios.get(`stations/energyStorage/${subStationId}/powers`, {
    params: parms
  });
};
//获取储能子站的充放电量列表
export const getenergyStorageenergys = (subStationId, year, month) => {
  return axios.get(`/stations/energyStorage/${subStationId}/energys/${year}/${month}`);
};
//获取储能子站的收益信息
export const getearnings = (subStationId, year, month, day) => {
  return axios.get(`/stations/energyStorage/${subStationId}/incomes/${year}/${month}/${day}`);
};
//获取安防子站的摄像头列表
export const getcamera = (subStationId, parms) => {
  return axios.get(`/stations/securitySystem/${subStationId}/cameras`, {
    params: parms
  });
};
//获取能源站摄像头token
export const getcameraAccessToken = (cameraId) => {
  return axios.get(`/cameras/${cameraId}/cameraAccessToken`);
};
//获取能源站的概述
export const getoverview = (stationId) => {
  return axios.get(`/stations/${stationId}/overview`);
};
//获取充电子站的功率和使用率信息
export const getpowerAndUsages = (subStationId, parms) => {
  return axios.get(`/stations/chargeStation/${subStationId}/powerAndUsages`, {
    params: parms
  });
};

//获取充电子站的充电量和等效小时数列表
export const getchargeKwhAndHours = (subStationId, year, month) => {
  return axios.get(`/stations/chargeStation/${subStationId}/chargeKwhAndHours/${year}/${month}`);
};
//查询充电桩设备的实时数据列表
export const getchargingrealtime = deviceId => {
  return axios.get(`/stations/devices/chargingPiles/${deviceId}/realtime`);
};
