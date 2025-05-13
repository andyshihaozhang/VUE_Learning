import { EmployeeStatus } from '@/types/employee'

// 状态选项
export const statusOptions = [
  { label: '在职', value: EmployeeStatus.ACTIVE },
  { label: '离职', value: EmployeeStatus.INACTIVE }
] as const

/**
 * 获取状态标签类型
 */
export const getStatusTagType = (status: EmployeeStatus): 'success' | 'danger' => {
  const types: Record<EmployeeStatus, 'success' | 'danger'> = {
    active: 'success',
    inactive: 'danger'
  }
  return types[status]
}

/**
 * 获取状态显示名称
 */
export const getStatusLabel = (status: EmployeeStatus): string => {
  return statusOptions.find(option => option.value === status)?.label || status
} 