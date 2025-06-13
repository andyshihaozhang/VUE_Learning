// API 返回类型
declare interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}