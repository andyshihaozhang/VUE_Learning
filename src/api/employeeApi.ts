import { http } from '@/utils/http'
import type {
  EmployeeDetail,
  EmployeeListResponse,
  EmployeeQueryParams,
  EmployeeCreateParams,
  EmployeeUpdateParams,
} from '@/types/business/employee'
import { ActiveStatus, } from '@/types/business/common'


export class EmployeeApi {
  private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL + '/user'

  static async getEmployees(params: EmployeeQueryParams) {
    return http.get<ApiResponse<EmployeeListResponse>>(this.BASE_URL, { params })
  }

  static async getEmployeeById(id: number) {
    return http.get<ApiResponse<EmployeeDetail>>(`${this.BASE_URL}/${id}`)
  }

  static async createEmployee(data: EmployeeCreateParams) {
    return http.post<ApiResponse<EmployeeDetail>>(this.BASE_URL, data)
  }

  static async updateEmployee(id: number, data: EmployeeUpdateParams) {
    return http.put<ApiResponse<EmployeeDetail>>(`${this.BASE_URL}/${id}`, data)
  }

  static async deleteEmployee(id: number) {
    return http.delete<ApiResponse<null>>(`${this.BASE_URL}/${id}`)
  }

  static async updateEmployeeStatus(id: number, status: ActiveStatus) {
    return http.patch<ApiResponse<EmployeeDetail>>(`${this.BASE_URL}/${id}/status`, { status })
  }
}