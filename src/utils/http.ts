import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { HttpStatusCode, getHttpStatusMessage } from '@/enums/httpEnums'
// 创建 axios 实例
const http: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})
// 请求处理
const reqSuccess = (config: InternalAxiosRequestConfig) => {
  console.log('Request:', config.method?.toUpperCase(), config.url)
  // 获取token
  var token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

// 请求失败
const reqFail = (error: any) => {
  console.error('Request Error:', error)
  return Promise.reject(error)
}

// 响应处理
const resSuccess = (response: AxiosResponse) => {
  console.log('Response:', response.status, response.config.url)
  // 处理业务响应
  var axiosResponse : ApiResponse<any> = response.data
  if (axiosResponse.code === HttpStatusCode.OK) {
    return axiosResponse.data // 返回响应数据
  }
}

// 响应失败
const resFail = (error: any) => {
  // 处理 HTTP 错误
  console.error('Response Error:', error)
  var errorMessage = getHttpStatusMessage(error.response.status) + ' ' + error.response.data.message
  return Promise.reject(errorMessage)
}

// 请求拦截器
http.interceptors.request.use(reqSuccess, reqFail)

// 响应拦截器
http.interceptors.response.use(resSuccess, resFail)

export { http } 