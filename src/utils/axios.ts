import Axios from 'axios'
import { ElMessage } from 'element-plus'
import {downloadFile} from './index'
let baseURL = ''
const axios = Axios.create({
  baseURL,
  // withCredentials: true,  //跨域携带cookie
  timeout: 20000 // 请求超时 20s
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    // config设置responseType为blob 处理文件下载
    if (response.data instanceof Blob) {
      return downloadFile(response);
    }
    return response
  },
  (error) => {
    console.log(error,"error")
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
    } else {
      ElMessage.error(`${error}`)
    }
    return Promise.reject(error)
  }
)
export default axios