import type { EmployeeDetail } from '../types/employee'
import { EmployeeStatus } from '../types/employee'

// 模拟用户列表数据
export const mockUsers: EmployeeDetail[] = [
  {
    employeeId: 1,
    employeeName: '张三',
    employeePhone: 13800138000,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 2,
    employeeName: '李四',
    employeePhone: 13800138001,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 3,
    employeeName: '王五',
    employeePhone: 13800138002,
    employeeStatus: EmployeeStatus.INACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 4,
    employeeName: '赵六',
    employeePhone: 13800138003,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 5,
    employeeName: '钱七',
    employeePhone: 13800138004,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 6,
    employeeName: '孙八',
    employeePhone: 13800138005,
    employeeStatus: EmployeeStatus.INACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 7,
    employeeName: '周九',
    employeePhone: 13800138006,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 8,
    employeeName: '吴十',
    employeePhone: 13800138007,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 9,
    employeeName: '郑十一',
    employeePhone: 13800138008,
    employeeStatus: EmployeeStatus.INACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 10,
    employeeName: '王十二',
    employeePhone: 13800138009,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 11,
    employeeName: '李十三',
    employeePhone: 13800138010,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 12,
    employeeName: '张十四',
    employeePhone: 13800138011,
    employeeStatus: EmployeeStatus.INACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 13,
    employeeName: '刘十五',
    employeePhone: 13800138012,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 14,
    employeeName: '陈十六',
    employeePhone: 13800138013,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 15,
    employeeName: '杨十七',
    employeePhone: 13800138014,
    employeeStatus: EmployeeStatus.INACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 16,
    employeeName: '黄十八',
    employeePhone: 13800138015,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 17,
    employeeName: '赵十九',
    employeePhone: 13800138016,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 18,
    employeeName: '周二十',
    employeePhone: 13800138017,
    employeeStatus: EmployeeStatus.INACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 19,
    employeeName: '吴二一',
    employeePhone: 13800138018,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 20,
    employeeName: '郑二二',
    employeePhone: 13800138019,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 21,
    employeeName: '王二三',
    employeePhone: 13800138020,
    employeeStatus: EmployeeStatus.INACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 22,
    employeeName: '李二四',
    employeePhone: 13800138021,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 23,
    employeeName: '张二五',
    employeePhone: 13800138022,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 24,
    employeeName: '刘二六',
    employeePhone: 13800138023,
    employeeStatus: EmployeeStatus.INACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 25,
    employeeName: '陈二七',
    employeePhone: 13800138024,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 26,
    employeeName: '杨二八',
    employeePhone: 13800138025,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 27,
    employeeName: '黄二九',
    employeePhone: 13800138026,
    employeeStatus: EmployeeStatus.INACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 28,
    employeeName: '赵三十',
    employeePhone: 13800138027,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 29,
    employeeName: '周三一',
    employeePhone: 13800138028,
    employeeStatus: EmployeeStatus.ACTIVE,
    employeeCreateTime: new Date().toISOString()
  },
  {
    employeeId: 30,
    employeeName: '吴三二',
    employeePhone: 13800138029,
    employeeStatus: EmployeeStatus.INACTIVE,
    employeeCreateTime: new Date().toISOString()
  }
]