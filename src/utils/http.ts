import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { useLoginStore } from '@/stores/loginStore'
import router from '@/router'

// 创建 axios 实例
const http: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('Request:', config.method?.toUpperCase(), config.url)
    // 从 store 中获取 token
    const loginStore = useLoginStore()
    console.log('loginStore:', loginStore)
    if (loginStore.loginInfo?.token) {
      console.log('token:', loginStore.loginInfo.token)
      config.headers.Authorization = `Bearer ${loginStore.loginInfo.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Response:', response.status, response.config.url)
    const { data } = response
    // 处理业务响应
    if (data.code === 200) {
      return response // 返回完整的 response 对象
    }
    // 处理业务错误
    ElMessage.error(data.message || '请求失败')
    return Promise.reject(new Error(data.message || '请求失败'))
  },
  (error) => {
    // 处理 HTTP 错误
    console.error('Request Error:', error)
    if (error.response?.status === 401) {
      // 如果是认证错误，跳转到登录页
      ElMessage.error('请先登录')
      const loginStore = useLoginStore()
      loginStore.isLoggedIn = false
      loginStore.loginInfo = null
      localStorage.removeItem('token')
      router.push({ name: 'Login' })
    } else {
      ElMessage.error(error.message || '网络错误')
    }
    return Promise.reject(error)
  }
)

export { http } 