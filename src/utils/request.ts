import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ElMessage, ElLoading } from 'element-plus'

// ����ӿڷ��ظ�ʽ
interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// �����������ýӿ�
interface RequestConfig extends AxiosRequestConfig {
  loading?: boolean // �Ƿ���ʾloading
  showError?: boolean // �Ƿ���ʾ������Ϣ
}

// ����axiosʵ��
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // �ӻ���������ȡbaseURL
  timeout: 15000, // ����ʱʱ��
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// �������
let requestQueue: string[] = []
// loadingʵ��
let loadingInstance: any = null

// ��ʾloading
const showLoading = () => {
  if (requestQueue.length === 0) {
    loadingInstance = ElLoading.service({
      lock: true,
      text: '������...',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  requestQueue.push('request')
}

// ����loading
const hideLoading = () => {
  requestQueue.pop()
  if (requestQueue.length === 0) {
    loadingInstance?.close()
  }
}

// ����������
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // ��ȡtoken
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // ����loading
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

// ��Ӧ������
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // ����loading
    const requestConfig = response.config as RequestConfig
    if (requestConfig.loading !== false) {
      hideLoading()
    }

    const res = response.data as ApiResponse

    // �����Զ���������ж������Ƿ�ɹ�
    if (res.code !== 200) {
      // �����ض�������
      if (res.code === 401) {
        // token���ڣ����token����ת����¼ҳ
        localStorage.removeItem('token')
        window.location.href = '/login'
      }

      // ��ʾ������Ϣ
      if (requestConfig.showError !== false) {
        ElMessage.error(res.message || '����ʧ��')
      }

      return Promise.reject(new Error(res.message || '����ʧ��'))
    }

    // ��������
    return res.data
  },
  (error) => {
    // ����loading
    const requestConfig = error.config as RequestConfig
    if (requestConfig?.loading !== false) {
      hideLoading()
    }

    // ���������Ϣ
    let message = '����ʧ��'
    if (error.response) {
      switch (error.response.status) {
        case 400:
          message = '�������'
          break
        case 401:
          message = 'δ��Ȩ�������µ�¼'
          // ���token����ת����¼ҳ
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          message = '�ܾ�����'
          break
        case 404:
          message = '�����ַ����'
          break
        case 408:
          message = '����ʱ'
          break
        case 500:
          message = '�������ڲ�����'
          break
        case 501:
          message = '����δʵ��'
          break
        case 502:
          message = '���ش���'
          break
        case 503:
          message = '���񲻿���'
          break
        case 504:
          message = '���س�ʱ'
          break
        case 505:
          message = 'HTTP�汾����֧��'
          break
        default:
          message = `���Ӵ���${error.response.status}`
      }
    } else if (error.request) {
      message = '������δ��Ӧ'
    }

    // ��ʾ������Ϣ
    if (requestConfig?.showError !== false) {
      ElMessage.error(message)
    }

    return Promise.reject(error)
  }
)

// ��װ���󷽷�
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

  // �ϴ��ļ�
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