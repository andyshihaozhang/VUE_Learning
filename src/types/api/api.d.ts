// API 响应类型
declare interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// 用户相关类型
declare interface User {
  id: number
  username: string
  email: string
  // 其他用户属性...
}

// 可以添加更多 API 相关的类型声明 