import axios from 'axios'
import config from './config'

import transfer from '../transfer'

export default function $axios (options) {
  let baseURL
  if (!options.types) {
    baseURL = config.sinaURL
  } else {
    baseURL = config.baseURL
  }
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL,
      headers: config.headers,
      //transformResponse方法允许在数据传递到then/catch之前修改response数据。此方法最后也要返回数据。
      transformResponse: [function (data) {

      }]
    })
    // request 拦截器
    instance.interceptors.request.use(config => {
        // if (window.navigator.onLine !== true) {
        //   return
        // }
        //此处可以判断是否带有登录token 如果没有可以进行处
        let formData = new FormData()
        let dataJson = config.data || {}
        //  根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method === 'post') {
          //在此处对参数进行序列化  fromDta
          for (let key in dataJson) {
            formData.append(key, dataJson[key])
          }
          config.data = formData
        } else {
        }
        return config
      },
      error => {
        // 请求错误时
        console.log('request:', error)
        // 1. 判断请求超时
        if (
          error.code === 'ECONNABORTED' &&
          error.message.indexOf('timeout') !== -1
        ) {
          console.log('timeout请求超时')
          // return service.request(originalRequest);//再重复请求一次
        }
        // 2. 需要重定向到错误页面
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          //error =errorInfo.data  //页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status // 404 403 500 ...
          // router.push({
          //   path: `/error/${errorStatus}`
          // })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(response => {
        let data
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }
        return data
      }, err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break
            case 500:
              err.message = '服务器错误'
              break
          }
        }
        transfer.$emit('http_err')
        // toast({message: err.message, position: 'bottom'})
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    // 请求处理   Promise处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}
