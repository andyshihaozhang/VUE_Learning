import { EmployeeDetail } from "./employee"

// 简化的员工引用类型
export interface EmployeeReference {
  employeeId: number
  employeeName: string
}

// 产品流程接口
export interface Process {
  processId: number
  productId: number
  processName: string
  processDescription: string
  processPrice: number
  createTime: string
}


export interface ProcessListResponse {
  items: Process[]
  total: number
}

// 产品流程分配明细
export interface ProcessAllocation extends Process {
  employees: number[] // 存储员工ID数组
}

// 产品流程分配查询参数
export interface ProcessAllocationByProductIdRequest {
  productId: number
  page: number
  pageSize: number
  search?: string
}

// 产品流程分配创建参数 
export interface ProcessAllocationCreateRequest {
  productId: number
  processName: string
  processDescription: string
  processPrice: number
  employees: number[] // 存储员工ID数组
}

// 产品流程更新参数
export interface ProcessAllocationUpdateRequest {
  processId: number
  processName: string
  processDescription: string
  processPrice: number
  employees: number[] // 存储员工ID数组
}

// 产品流程分配响应
export interface ProcessAllocationsResponse {
  items: ProcessAllocation[]
}
