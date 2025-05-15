import { EmployeeDetail } from "./employee"

  // 产品流程接口
  export interface Process {
    processId: number
    productId: number
    processName: string
    processDescription: string
    processPrice: number
    createTime: string
  }

  // 产品流程明细
  export interface ProcessDetail extends Process {
    employees: EmployeeDetail[]
  }
  

// 产品流程查询参数
export interface ProcessDetailQueryByProductIdParams {
    productId: number
    page: number
    pageSize: number
    search?: string
}

// 产品流程创建参数 
export interface ProcessDetailCreateParams {
    productId: number
    processName: string
    processDescription: string
    processPrice: number
    employees: EmployeeDetail[]
}

// 产品流程更新参数
export interface ProcessDetailUpdateParams {
    processId: number
    processName: string
    processDescription: string
    processPrice: number
    employees: EmployeeDetail[]
}

// 产品流程明细响应
export interface ProcessDetailResponse {
    items: ProcessDetail[]
}