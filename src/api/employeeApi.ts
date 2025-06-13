import { http } from '@/utils/http'
import type {
  Employee,
  EmployeeListResponse,
  EmployeeQueryParams,
  EmployeeCreateParams,
  EmployeeUpdateParams,
  AllEmployeeListResponse,
} from '@/types/business/employee'
import type { ProductListByEmployeeResponse } from '@/types/business/product'
import type { ProcessListResponse } from '@/types/business/process'


export class EmployeeApi {
  private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL + '/employee'

  static async getAllEmployees() {
    return http.get<AllEmployeeListResponse>(`${this.BASE_URL}/all`)
  }

  static async getEmployees(params: EmployeeQueryParams) {
    return http.get<EmployeeListResponse>(`${this.BASE_URL}/all`, { params })
  }

  static async createEmployee(data: EmployeeCreateParams) {
    return http.post<Employee>(`${this.BASE_URL}/add`, data)
  }

  static async updateEmployee(id: number, data: EmployeeUpdateParams) {
    return http.put<Employee>(`${this.BASE_URL}/update/${id}`, data)
  }

  static async deleteEmployee(id: number) {
    return http.delete<null>(`${this.BASE_URL}/delete/${id}`)
  }

  static async getProductsByEmployeeId(employeeId: number) {
    return http.get<ProductListByEmployeeResponse>(`${this.BASE_URL}/getProducts/${employeeId}`)
  }

  static async getProcessesByEmployeeId(employeeId: number) {
    return http.get<ProcessListResponse>(`${this.BASE_URL}/${employeeId}/processes`)
  }
}