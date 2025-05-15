import { ActiveStatus } from '@/types/business/common'

// 状态选项
export const statusOptions = [
  { label: '在职', value: ActiveStatus.ACTIVE },
  { label: '离职', value: ActiveStatus.INACTIVE }
] as const

/**
 * 获取状态标签类型
 */
export const getStatusTagType = (status: ActiveStatus): 'success' | 'danger' => {
  const types: Record<ActiveStatus, 'success' | 'danger'> = {
    active: 'success',
    inactive: 'danger'
  }
  return types[status]
}

/**
 * 获取状态显示名称
 */
export const getStatusLabel = (status: ActiveStatus): string => {
  return statusOptions.find(option => option.value === status)?.label || status
} 