import { UserStatus } from '@/types/user'

// 状态选项
export const statusOptions = [
  { label: '在职', value: UserStatus.ACTIVE },
  { label: '离职', value: UserStatus.INACTIVE }
] as const

/**
 * 获取状态标签类型
 */
export const getStatusTagType = (status: UserStatus): 'success' | 'danger' => {
  const types: Record<UserStatus, 'success' | 'danger'> = {
    active: 'success',
    inactive: 'danger'
  }
  return types[status]
}

/**
 * 获取状态显示名称
 */
export const getStatusLabel = (status: UserStatus): string => {
  return statusOptions.find(option => option.value === status)?.label || status
} 