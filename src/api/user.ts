import request from '@/utils/request'

// 用户相关接口
export interface User {
  id: number
  username: string
  email: string
  role: string
  status: number
  createTime: string
}

// 用户列表查询参数
export interface UserQuery {
  page: number
  pageSize: number
  username?: string
  status?: number
}

// 用户列表返回数据
export interface UserListResponse {
  total: number
  list: User[]
}

// 获取用户列表
export function getUserList(params: UserQuery) {
  return request.get<UserListResponse>('/user/list', params)
}

// 添加用户
export function addUser(data: Omit<User, 'id' | 'createTime'>) {
  return request.post<User>('/user/add', data)
}

// 更新用户
export function updateUser(id: number, data: Partial<User>) {
  return request.put<User>(`/user/${id}`, data)
}

// 删除用户
export function deleteUser(id: number) {
  return request.delete(`/user/${id}`)
}

// 获取用户详情
export function getUserDetail(id: number) {
  return request.get<User>(`/user/${id}`)
}

// 修改用户状态
export function updateUserStatus(id: number, status: number) {
  return request.put(`/user/${id}/status`, { status })
}

// 重置用户密码
export function resetUserPassword(id: number) {
  return request.put(`/user/${id}/password/reset`)
}

// 上传用户头像
export function uploadUserAvatar(id: number, file: File) {
  return request.upload(`/user/${id}/avatar`, file)
} 