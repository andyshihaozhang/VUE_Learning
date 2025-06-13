import { http } from '@/utils/http'
import type {
  ProcessAllocationCreateRequest,
  ProcessAllocationUpdateRequest,
  ProcessListResponse,
  ProcessAllocationsResponse,
  ProcessAllocationByEmployeeIdAndProductIdRequest,
  ProcessAllocationByEmployeeIdAndProductIdResponse
} from '@/types/business/process'

// 产品流程API
export class ProcessDetailApi {
  private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL + '/process'

  // 获取产品流程分配
  static async getProcessAllocationByProductId(productId: number) {
    return http.get<ProcessAllocationsResponse>(`${this.BASE_URL}/allAllocation/${productId}`)
  }

  // 创建产品流程分配
  static async createProcessAllocation(data: ProcessAllocationCreateRequest) {
    return http.post<null>(`${this.BASE_URL}/addAllocation/${data.productId}`, data)
  }

  // 更新产品流程分配
  static async updateProcessAllocation(data: ProcessAllocationUpdateRequest) {
    return http.put<null>(`${this.BASE_URL}/updateAllocation/${data.processId}`, data)
  }

  // 删除产品流程
  static async deleteProcessAllocation(processId: number) {
    return http.delete<null>(`${this.BASE_URL}/deleteAllocation/${processId}`)
  }

  // 获取产品流程
  static async getProcessesByProductId(productId: number) {
    return http.get<ProcessListResponse>(`${this.BASE_URL}/allAllocation/${productId}`)
  }

  // 根据员工ID和产品ID获取工序列表
  static async getProcessAllocationByEmployeeIdAndProductId(data: ProcessAllocationByEmployeeIdAndProductIdRequest) {
    return http.post<ProcessAllocationByEmployeeIdAndProductIdResponse>(`${this.BASE_URL}/allAllocationByEmployeeIdAndProductId`, data)
  }
} 