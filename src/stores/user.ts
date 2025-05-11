import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserDetail, UserRole, UserStatus, UserCreateParams, UserUpdateParams } from '@/types/user'
import { UserApi } from '@/api/user'

interface UserListParams {
  page: number
  pageSize: number
  username?: string
  role?: UserRole | ''
  status?: UserStatus | ''
}

interface UserListResponse {
  data: UserDetail[]
  total: number
}

export const useUserStore = defineStore('user', () => {
  // 状态
  const userList = ref<UserDetail[]>([])
  const total = ref(0)
  const loading = ref(false)

  // 获取用户列表
  const getUserList = async (params: UserListParams): Promise<UserListResponse> => {
    loading.value = true
    try {
      const response = await UserApi.getUsers({
        ...params,
        role: params.role || undefined,
        status: params.status || undefined
      })
      userList.value = response.items
      total.value = response.total
      return {
        data: response.items,
        total: response.total
      }
    } finally {
      loading.value = false
    }
  }

  // 创建用户
  const createUser = async (user: UserCreateParams): Promise<UserDetail> => {
    const response = await UserApi.createUser(user)
    return response.data!
  }

  // 更新用户
  const updateUser = async (id: string, user: UserUpdateParams): Promise<UserDetail> => {
    const response = await UserApi.updateUser(id, user)
    return response.data!
  }

  // 删除用户
  const deleteUser = async (id: string): Promise<void> => {
    await UserApi.deleteUser(id)
  }

  return {
    userList,
    total,
    loading,
    getUserList,
    createUser,
    updateUser,
    deleteUser
  }
})

export {}; 