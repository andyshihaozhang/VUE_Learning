import { http } from '@/utils/http'
import type {
  ProcessDetail,
  ProcessDetailQueryByProductIdParams,
  ProcessDetailCreateParams,
  ProcessDetailUpdateParams,
  ProcessDetailResponse,
} from '@/types/business/process'
import { ActiveStatus, type ApiResponse } from '@/types/business/common'

// 产品流程API
export class ProcessDetailApi {
  private static readonly BASE_URL = '/api/processes'

  static async getProcessDetailsByProductId(params: ProcessDetailQueryByProductIdParams) {
    return http.get<ApiResponse<ProcessDetailResponse>>(this.BASE_URL, { params })
  }

  static async getProcessDetailById(id: number) {
    return http.get<ApiResponse<ProcessDetail>>(`${this.BASE_URL}/${id}`)
  }

  static async createProcessDetail(data: ProcessDetailCreateParams) {
    return http.post<ApiResponse<ProcessDetail>>(this.BASE_URL, data)
  }

  static async updateProcessDetail(id: number, data: ProcessDetailUpdateParams) {
    return http.put<ApiResponse<ProcessDetail>>(`${this.BASE_URL}/${id}`, data)
  }

  static async deleteProcessDetail(id: number) {
    return http.delete<ApiResponse<null>>(`${this.BASE_URL}/${id}`)
  }

  static async updateProcessDetailStatus(id: number, status: ActiveStatus) {
    return http.patch<ApiResponse<ProcessDetail>>(`${this.BASE_URL}/${id}/status`, { status })
  }

  static async getProcessDetail(id: number) {
    return http.get<ApiResponse<ProcessDetailResponse>>(`${this.BASE_URL}/${id}/detail`)
  }
}