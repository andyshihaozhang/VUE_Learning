import { ProcessStatus } from '../types/business/common'
import type { Product } from '../types/business/product'
import type { ProcessDetail } from '../types/business/process'
import { mockUsers } from './user'

// 模拟产品列表数据
export const mockProducts: Product[] = [
  {
    productId: 1,
    productCode: 'PROD-001',
    productName: '高端定制西装',
    productStatus: ProcessStatus.IN_PROGRESS,
    customerName: '某服装公司',
    createTime: new Date().toISOString()
  },
  {
    productId: 2,
    productCode: 'PROD-002',
    productName: '羊毛大衣',
    productStatus: ProcessStatus.PENDING,
    customerName: '某服装公司',
    createTime: new Date().toISOString()
  },
  {
    productId: 3,
    productCode: 'PROD-003',
    productName: '羊绒围巾',
    productStatus: ProcessStatus.COMPLETED,
    customerName: '某服装公司',
    createTime: new Date().toISOString()
  },
  {
    productId: 4,
    productCode: 'PROD-004',
    productName: '真丝衬衫',
    productStatus: ProcessStatus.IN_PROGRESS,
    customerName: '某服装公司',
    createTime: new Date().toISOString()
  },
  {
    productId: 5,
    productCode: 'PROD-005',
    productName: '棉质T恤',
    productStatus: ProcessStatus.PENDING,
    customerName: '某服装公司',
    createTime: new Date().toISOString()
  }
]

// 模拟工序列表数据
export const mockProcesses: ProcessDetail[] = [
  {
    processId: 1,
    productId: 1,
    processName: '面料裁剪',
    processDescription: '根据设计图纸进行面料裁剪',
    processPrice: 180.00,
    createTime: new Date().toISOString(),
    employees: [mockUsers[0], mockUsers[1]]
  },
  {
    processId: 2,
    productId: 1,
    processName: '缝制',
    processDescription: '进行服装缝制',
    processPrice: 250.00,
    createTime: new Date().toISOString(),
    employees: [mockUsers[2], mockUsers[3]]
  },
  {
    processId: 3,
    productId: 1,
    processName: '熨烫',
    processDescription: '进行服装熨烫',
    processPrice: 120.00,
    createTime: new Date().toISOString(),
    employees: [mockUsers[4]]
  },
  {
    processId: 4,
    productId: 2,
    processName: '面料裁剪',
    processDescription: '根据设计图纸进行面料裁剪',
    processPrice: 150.00,
    createTime: new Date().toISOString(),
    employees: [mockUsers[5], mockUsers[6]]
  },
  {
    processId: 5,
    productId: 2,
    processName: '缝制',
    processDescription: '进行服装缝制',
    processPrice: 200.00,
    createTime: new Date().toISOString(),
    employees: [mockUsers[7], mockUsers[8]]
  }
] 