import { http } from '@/utils/http'
import type {
  Product,
  ProductQueryParams,
  ProductListResponse,
  ProductCreateParams,
  ProductUpdateParams,
} from '@/types/business/product'
import type { EmployeeListByProductResponse } from '@/types/business/employee'


export class ProductApi {
  private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL + '/product'

  static async getProducts(params: ProductQueryParams) {
    return http.get<ApiResponse<ProductListResponse>>(`${this.BASE_URL}/all`, { params })
  }

  static async createProduct(data: ProductCreateParams) {
    return http.post<ApiResponse<Product>>(`${this.BASE_URL}/add`, data)
  }

  static async updateProduct(id: number, data: ProductUpdateParams) {
    return http.put<ApiResponse<Product>>(`${this.BASE_URL}/update/${id}`, data)
  }

  static async deleteProduct(id: number) {
    return http.delete<ApiResponse<null>>(`${this.BASE_URL}/delete/${id}`)
  }

  static async getEmployeesByProductId(productId: number) {
    return http.get<ApiResponse<EmployeeListByProductResponse>>(`${this.BASE_URL}/getEmployees/${productId}`)
  }
}