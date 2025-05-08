export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface User {
  id: number
  username: string
  phonenumber: string
  status: UserStatus
}

// Omit用于从User类型中移除id属性，返回一个新的类型NewUser，id由服务器生成
export type NewUser = Omit<User, 'id'>

// Partial用于将User类型中的id属性变为可选属性，返回一个新的类型UpdateUser
export type UpdateUser = Partial<Omit<User, 'id'>>

// code 200 表示请求成功，data 是返回的数据，message 是返回的消息
export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
} 