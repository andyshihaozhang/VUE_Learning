import { http } from '@/utils/http'
import type {
  EmployeeDetail,
  EmployeeListResponse,
  EmployeeQueryParams,
  EmployeeCreateParams,
  EmployeeUpdateParams,
} from '@/types/business/employee'
import type { ProductListByEmployeeResponse } from '@/types/business/product'
import type { ProcessListResponse } from '@/types/business/process'


export class EmployeeApi {
  private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL + '/employee'

  static async getEmployees(params: EmployeeQueryParams) {
    return http.get<ApiResponse<EmployeeListResponse>>(`${this.BASE_URL}/all`, { params })
  }

  static async createEmployee(data: EmployeeCreateParams) {
    return http.post<ApiResponse<EmployeeDetail>>(`${this.BASE_URL}/add`, data)
  }

  static async updateEmployee(id: number, data: EmployeeUpdateParams) {
    return http.put<ApiResponse<EmployeeDetail>>(`${this.BASE_URL}/update/${id}`, data)
  }

  static async deleteEmployee(id: number) {
    return http.delete<ApiResponse<null>>(`${this.BASE_URL}/delete/${id}`)
  }

  static async getProductsByEmployeeId(employeeId: number) {
    return http.get<ApiResponse<ProductListByEmployeeResponse>>(`${this.BASE_URL}/getProducts/${employeeId}`)
  }

  static async getProcessesByEmployeeId(employeeId: number) {
    return http.get<ApiResponse<ProcessListResponse>>(`${this.BASE_URL}/${employeeId}/processes`)
  }
}