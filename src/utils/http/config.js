import config from '../../../config'

const baseURL = (process.env.NODE_ENV === 'production' ? config.build.httpURL : config.dev.httpURL)
export default {
  method: 'get',
  // 基础url前缀cong
  baseURL: baseURL,
  // sinaURL:'http://wap.jr.sina.com.cn:80',sinatech.3wchina.net
  sinaURL:'http://sinatech.3wchina.net',
  // 请求头信息
  headers: {
     'Content-Type':'multipart/form-data',
    // 'Access-Control-Allow-Origin':'*/*'
    // 'Accept': '*/*',
    // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json'
}
