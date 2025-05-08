import request from '@/utils/request'
import type { User, NewUser, UpdateUser, ApiResponse } from '@/types/user'

export const userApi = {
  // 获取用户列表
  getUsers() {
    return request.get<ApiResponse<User[]>>('/api/users')
  },

  // 添加用户
  addUser(data: NewUser) {
    return request.post<ApiResponse<User>>('/api/users', data)
  },

  // 删除用户
  deleteUser(id: number) {
    return request.delete<ApiResponse<null>>(`/api/users/${id}`)
  },

  // 更新用户
  updateUser(id: number, data: UpdateUser) {
    return request.put<ApiResponse<User>>(`/api/users/${id}`, data)
  }
} 