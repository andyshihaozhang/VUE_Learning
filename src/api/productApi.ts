import { http } from '@/utils/http'
import type {
  Product,
  ProductQueryParams,
  ProductListResponse,
  ProductCreateParams,
  ProductUpdateParams,
} from '@/types/business/product'
import { ActiveStatus } from '@/types/business/common'


export class ProductApi {
  private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL + '/product'

  static async getProducts(params: ProductQueryParams) {
    return http.get<ApiResponse<ProductListResponse>>(this.BASE_URL, { params })
  }

  static async getProductById(id: number) {
    return http.get<ApiResponse<Product>>(`${this.BASE_URL}/${id}`)
  }

  static async createProduct(data: ProductCreateParams) {
    return http.post<ApiResponse<Product>>(this.BASE_URL, data)
  }

  static async updateProduct(id: number, data: ProductUpdateParams) {
    return http.put<ApiResponse<Product>>(`${this.BASE_URL}/${id}`, data)
  }

  static async deleteProduct(id: number) {
    return http.delete<ApiResponse<null>>(`${this.BASE_URL}/${id}`)
  }

  static async updateProductStatus(id: number, status: ActiveStatus) {
    return http.patch<ApiResponse<Product>>(`${this.BASE_URL}/${id}/status`, { status })
  }


}