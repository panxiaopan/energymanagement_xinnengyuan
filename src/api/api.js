import {
  baseUrl
} from "../../static/baseurl";
import axios from "axios";
import qs from 'qs'

axios.defaults.baseURL = baseUrl; //接口变量..  引用过来编译的时候不会变,

axios.interceptors.request.use(
  config => {
    //const token = sessionStorage.getItem('token')
    //  let data = config.data
    console.log(config);
    if (config.method == "post") {
      let data = config.data;
      console.log("拦截");
      console.log(data);

      config.data = qs.stringify({
        ...config.data
        // token: token
      });
      return config;

      //let data = qs.parse(config.data)
      // config.data = qs.stringify({
      //  // token: token,
      //   ...data
      // })
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
