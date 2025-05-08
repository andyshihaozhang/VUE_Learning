import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ElMessage, ElLoading } from 'element-plus'

// 定义接口返回格式
interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// 定义请求配置接口
interface RequestConfig extends AxiosRequestConfig {
  loading?: boolean // 是否显示loading
  showError?: boolean // 是否显示错误信息
}

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 从环境变量获取baseURL
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求队列
let requestQueue: string[] = []
// loading实例
let loadingInstance: any = null

// 显示loading
const showLoading = () => {
  if (requestQueue.length === 0) {
    loadingInstance = ElLoading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  requestQueue.push('request')
}

// 隐藏loading
const hideLoading = () => {
  requestQueue.pop()
  if (requestQueue.length === 0) {
    loadingInstance?.close()
  }
}

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 获取token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // 处理loading
    const requestConfig = config as RequestConfig
    if (requestConfig.loading !== false) {
      showLoading()
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 处理loading
    const requestConfig = response.config as RequestConfig
    if (requestConfig.loading !== false) {
      hideLoading()
    }

    const res = response.data as ApiResponse

    // 根据自定义错误码判断请求是否成功
    if (res.code !== 200) {
      // 处理特定错误码
      if (res.code === 401) {
        // token过期，清除token并跳转到登录页
        localStorage.removeItem('token')
        window.location.href = '/login'
      }

      // 显示错误信息
      if (requestConfig.showError !== false) {
        ElMessage.error(res.message || '请求失败')
      }

      return Promise.reject(new Error(res.message || '请求失败'))
    }

    // 返回数据
    return res.data
  },
  (error) => {
    // 处理loading
    const requestConfig = error.config as RequestConfig
    if (requestConfig?.loading !== false) {
      hideLoading()
    }

    // 处理错误信息
    let message = '请求失败'
    if (error.response) {
      switch (error.response.status) {
        case 400:
          message = '请求错误'
          break
        case 401:
          message = '未授权，请重新登录'
          // 清除token并跳转到登录页
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求地址出错'
          break
        case 408:
          message = '请求超时'
          break
        case 500:
          message = '服务器内部错误'
          break
        case 501:
          message = '服务未实现'
          break
        case 502:
          message = '网关错误'
          break
        case 503:
          message = '服务不可用'
          break
        case 504:
          message = '网关超时'
          break
        case 505:
          message = 'HTTP版本不受支持'
          break
        default:
          message = `连接错误${error.response.status}`
      }
    } else if (error.request) {
      message = '服务器未响应'
    }

    // 显示错误信息
    if (requestConfig?.showError !== false) {
      ElMessage.error(message)
    }

    return Promise.reject(error)
  }
)

// 封装请求方法
const request = {
  get<T = any>(url: string, params?: any, config?: RequestConfig): Promise<T> {
    return service.get(url, { params, ...config })
  },

  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.post(url, data, config)
  },

  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.put(url, data, config)
  },

  delete<T = any>(url: string, params?: any, config?: RequestConfig): Promise<T> {
    return service.delete(url, { params, ...config })
  },

  // 上传文件
  upload<T = any>(url: string, file: File, config?: RequestConfig): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)
    return service.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    })
  }
}

export default request 