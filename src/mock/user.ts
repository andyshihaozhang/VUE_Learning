import type { UserDetail } from '../types/user'
import { UserStatus } from '../types/user'

// 模拟用户列表数据
export const mockUsers: UserDetail[] = [
  {
    id: '1',
    username: '张三',
    phone: '13800138000',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    username: '李四',
    phone: '13800138001',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    username: '王五',
    phone: '13800138002',
    status: UserStatus.INACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    username: '赵六',
    phone: '13800138003',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    username: '钱七',
    phone: '13800138004',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    username: '孙八',
    phone: '13800138005',
    status: UserStatus.INACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '7',
    username: '周九',
    phone: '13800138006',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '8',
    username: '吴十',
    phone: '13800138007',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '9',
    username: '郑十一',
    phone: '13800138008',
    status: UserStatus.INACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '10',
    username: '王十二',
    phone: '13800138009',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '11',
    username: '李十三',
    phone: '13800138010',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '12',
    username: '张十四',
    phone: '13800138011',
    status: UserStatus.INACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '13',
    username: '刘十五',
    phone: '13800138012',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '14',
    username: '陈十六',
    phone: '13800138013',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '15',
    username: '杨十七',
    phone: '13800138014',
    status: UserStatus.INACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '16',
    username: '黄十八',
    phone: '13800138015',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '17',
    username: '赵十九',
    phone: '13800138016',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '18',
    username: '周二十',
    phone: '13800138017',
    status: UserStatus.INACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '19',
    username: '吴二一',
    phone: '13800138018',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '20',
    username: '郑二二',
    phone: '13800138019',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '21',
    username: '王二三',
    phone: '13800138020',
    status: UserStatus.INACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '22',
    username: '李二四',
    phone: '13800138021',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '23',
    username: '张二五',
    phone: '13800138022',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '24',
    username: '刘二六',
    phone: '13800138023',
    status: UserStatus.INACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '25',
    username: '陈二七',
    phone: '13800138024',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '26',
    username: '杨二八',
    phone: '13800138025',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '27',
    username: '黄二九',
    phone: '13800138026',
    status: UserStatus.INACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '28',
    username: '赵三十',
    phone: '13800138027',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '29',
    username: '周三一',
    phone: '13800138028',
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '30',
    username: '吴三二',
    phone: '13800138029',
    status: UserStatus.INACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
] 