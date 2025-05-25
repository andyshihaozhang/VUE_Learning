import type { Process, ProcessDetailResponse } from '../types/business/process'

// 模拟工序列表数据
export const mockProcesses: Process[] = [
  {
    processId: 1,
    productId: 1,
    processName: '面料裁剪',
    processDescription: '根据设计图纸进行面料裁剪',
    processPrice: 180.00,
    createTime: new Date().toISOString()
  },
  {
    processId: 2,
    productId: 1,
    processName: '缝制',
    processDescription: '进行服装缝制',
    processPrice: 250.00,
    createTime: new Date().toISOString()
  },
  {
    processId: 3,
    productId: 1,
    processName: '熨烫',
    processDescription: '进行服装熨烫',
    processPrice: 120.00,
    createTime: new Date().toISOString()
  },
  {
    processId: 4,
    productId: 2,
    processName: '面料裁剪',
    processDescription: '根据设计图纸进行面料裁剪',
    processPrice: 150.00,
    createTime: new Date().toISOString()
  },
  {
    processId: 5,
    productId: 2,
    processName: '缝制',
    processDescription: '进行服装缝制',
    processPrice: 200.00,
    createTime: new Date().toISOString()
  }
]

// 模拟工序详情响应数据
export const mockProcessDetailResponses: Record<number, ProcessDetailResponse> = {
  1: {
    items: mockProcesses.filter(p => p.productId === 1),
    total: 3
  },
  2: {
    items: mockProcesses.filter(p => p.productId === 2),
    total: 2
  }
}

// 模拟工序创建响应
export const mockProcessCreateResponses: Record<number, Process> = {
  6: {
    processId: 6,
    productId: 3,
    processName: '面料裁剪',
    processDescription: '根据设计图纸进行面料裁剪',
    processPrice: 160.00,
    createTime: new Date().toISOString()
  }
}

// 模拟工序更新响应
export const mockProcessUpdateResponses: Record<number, Process> = {
  1: {
    ...mockProcesses[0],
    processName: '高级面料裁剪',
    processDescription: '根据高级设计图纸进行面料裁剪',
    processPrice: 200.00
  }
} 