// API ��Ӧ����
declare interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}