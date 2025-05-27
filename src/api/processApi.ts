import { http } from '@/utils/http'
import type {
  ProcessAllocationCreateRequest,
  ProcessAllocationUpdateRequest,
  ProcessListResponse,
  ProcessAllocationsResponse,
} from '@/types/business/process'

// 产品流程API
export class ProcessDetailApi {
  private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL + '/process'

  // 获取产品流程分配
  static async getProcessAllocationByProductId(productId: number) {
    return http.get<ApiResponse<ProcessAllocationsResponse>>(`${this.BASE_URL}/all/${productId}`)
  }

  // 创建产品流程分配
  static async createProcessAllocation(data: ProcessAllocationCreateRequest) {
    return http.post<ApiResponse<null>>(`${this.BASE_URL}/add/${data.productId}`, data)
  }

  // 更新产品流程分配
  static async updateProcessAllocation(data: ProcessAllocationUpdateRequest) {
    return http.put<ApiResponse<null>>(`${this.BASE_URL}/update/${data.processId}`, data)
  }

  // 删除产品流程
  static async deleteProcessAllocation(processId: number) {
    return http.delete<ApiResponse<null>>(`${this.BASE_URL}/delete/${processId}`)
  }

  // 获取产品流程
  static async getProcessesByProductId(productId: number) {
    return http.get<ApiResponse<ProcessListResponse>>(`${this.BASE_URL}/all/${productId}`)
  }
} 