import { http } from '@/utils/http'
import type {
  UserDetail,
  UserListResponse,
  UserQueryParams,
  UserCreateParams,
  UserUpdateParams,
  UserOperationResult,
  ApiResponse
} from '@/types/user'

export class UserApi {
  private static readonly BASE_URL = '/api/users'

  /**
   * 获取用户列表
   */
  static async getUsers(params: UserQueryParams): Promise<ApiResponse<UserListResponse>> {
    const response = await http.get<ApiResponse<UserListResponse>>(this.BASE_URL, { params })
    return response.data
  }

  /**
   * 获取用户详情
   */
  static async getUserById(id: string): Promise<ApiResponse<UserDetail>> {
    const response = await http.get<ApiResponse<UserDetail>>(`${this.BASE_URL}/${id}`)
    return response.data
  }

  /**
   * 创建用户
   */
  static async createUser(data: UserCreateParams): Promise<ApiResponse<UserOperationResult>> {
    const response = await http.post<ApiResponse<UserOperationResult>>(this.BASE_URL, data)
    return response.data
  }

  /**
   * 更新用户
   */
  static async updateUser(id: string, data: UserUpdateParams): Promise<ApiResponse<UserOperationResult>> {
    const response = await http.put<ApiResponse<UserOperationResult>>(`${this.BASE_URL}/${id}`, data)
    return response.data
  }

  /**
   * 删除用户
   */
  static async deleteUser(id: string): Promise<ApiResponse<UserOperationResult>> {
    const response = await http.delete<ApiResponse<UserOperationResult>>(`${this.BASE_URL}/${id}`)
    return response.data
  }

  /**
   * 批量删除用户
   */
  static async batchDeleteUsers(ids: string[]): Promise<ApiResponse<UserOperationResult>> {
    const response = await http.post<ApiResponse<UserOperationResult>>(`${this.BASE_URL}/batch-delete`, { ids })
    return response.data
  }

  /**
   * 更新用户状态
   */
  static async updateUserStatus(id: string, status: string): Promise<ApiResponse<UserOperationResult>> {
    const response = await http.patch<ApiResponse<UserOperationResult>>(`${this.BASE_URL}/${id}/status`, { status })
    return response.data
  }

  /**
   * 重置用户密码
   */
  static async resetUserPassword(id: string): Promise<ApiResponse<UserOperationResult>> {
    const response = await http.post<ApiResponse<UserOperationResult>>(`${this.BASE_URL}/${id}/reset-password`)
    return response.data
  }
} 