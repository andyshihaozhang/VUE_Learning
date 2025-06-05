// 后台数据余前台显示转换中间层

import { ProgressStatus, ActiveStatus } from "@/types/business/common"

// 获取枚举正向映射数据集
export const getEnumValues = (enumObj: any) => {
  return Object.values(enumObj).filter(value => typeof value === 'number') as typeof enumObj[keyof typeof enumObj][];
}

// 获取枚举反向映射数据集
export const getEnumKeys = (enumObj: any) => {
  return Object.keys(enumObj).filter(key => typeof enumObj[key] === 'number') as (keyof typeof enumObj)[];
}

// 进程状态转换
export const progressStatusConverter = (status: ProgressStatus) => {
  switch (status) {
    case ProgressStatus.PENDING:
      return '已阻塞'
    case ProgressStatus.IN_PROGRESS:
      return '进行中'
    case ProgressStatus.CANCELLED:
      return '已取消'
    case ProgressStatus.COMPLETED:
      return '已完成'
    default:
      return '未知'
  }
}

// 进程状态颜色转换
export const progressStatusColorConverter = (status: ProgressStatus) => {
    switch (status) {
        case ProgressStatus.COMPLETED:
            return 'success'
        case ProgressStatus.PENDING:
            return 'info'
        case ProgressStatus.IN_PROGRESS:
            return 'warning'
        case ProgressStatus.CANCELLED:
            return 'danger'
        default:
            return 'info'
    }
}

// 员工状态转换
export const employeeStatusConverter = (status: ActiveStatus) => {
  switch (status) {
    case ActiveStatus.ACTIVE:
      return '在职'
    case ActiveStatus.INACTIVE:
      return '离职'
    default:
      return '未知'
  }
}

// 员工状态颜色转换
export const employeeStatusColorConverter = (status: ActiveStatus) => {
  switch (status) {
    case ActiveStatus.ACTIVE:
      return 'success'
    case ActiveStatus.INACTIVE:
      return 'info'
    default:
      return 'info'
  }
}
