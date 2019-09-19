import axios from "axios";
import qs from 'qs';
import router from '../router';
import {
  Message
} from "element-ui"

// const type = []
// http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.Authorization = `token ${store.state.token}`;
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    console.log("interceptors response", response)
    let code = response.data && response.data.head && response.data.head.code
    let msg = response.data && response.data.head && response.data.head.msg
    console.log("code msg", code, msg)

    // 0--成功 33022--重定向 99998--登录失效
    if (typeof code !== 'undefined') {
      if (+code === 0) {
        // if (message !== '') {
        //   Message.success({
        //     message
        //   })
        // }
      } else if (+code === 33022) {
        if (typeof window !== 'undefined') {
          window.location.href = msg
        }
        if (msg) {
          Message.warning({
            message: msg
          })
        }
      } else if (+code === 99998) {
        router.replace({
          path: '/login'
        })
        if (msg) {
          Message.warning({
            message: msg
          })
        }
      } else {
        if (msg) {
          Message.error({
            message: "请求失败: " + msg
          })
        }
      }
      // 针对其他服务器或跨域请求 根据status 和statusText 判定请求结果
    } else if (200 <= response.status && response.status < 400 && response.statusText.toLocaleLowerCase() === 'ok') {
      // if (message !== '') {
      //   Message.success({
      //     message
      //   })
      // }
    } else {
      Message.error({
        message: "请求失败"
      })
    }
    return response;
  },
  error => {
    // console.log("error++++++++++++", error)
    if (error.response) {
      Message.error({
        message: "请求链接失败"
      })
      // switch (error.response.status) {
      //   case 401:
      //     // 返回 401 清除token信息并跳转到登录页面
      //     store.commit(types.LOGOUT);
      //     router.replace({
      //       path: 'login',
      //       query: {
      //         redirect: router.currentRoute.fullPath
      //       }
      //     })
      // }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  });

export default function ({
  url = '',
  json = {},
  method = 'get',
  contentType = 'formUrlEncoded' // json, formUrlEncoded, formData
}) {
  var config = {
    method,
    url,
    params: json,
    // 默认编码规则 冒号编码保留，空格编码转为+ 具体查看源码axios/lib/helpers/buildURL.js
    // paramsSerializer: function (params) {
    //   return qs.stringify(params, {
    //     arrayFormat: 'brackets'
    //   })
    // }
  }
  if (method === 'post' || method === 'put' || method === 'patch') {
    config = {
      method,
      url,
      data: json
    }
    if (contentType === 'formUrlEncoded') {
      config['data'] = qs.stringify(json, {
        arrayFormat: 'repeat' //提交数组数据时 数据名中括号不含序号
      })
      config['headers'] = {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }
  }
  // console.log("axios config++++++++++++", config)
  return axios(config)
}