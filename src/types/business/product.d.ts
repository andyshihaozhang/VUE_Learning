import { ProgressStatus } from "@/enums/businessEnum"
import { ProcessAllocation } from "@/types/business/process"

// 产品基本信息
export interface Product {
    productId: number
    productCode: string
    productName: string
    productStatus: ProgressStatus
    customerSource: string
    createTime: string
}

// 扩展Product类型，增加工序明细及加载状态
interface ProductWithProcess extends Product {
    processAllocations?: ProcessAllocation[]
    processLoading?: boolean
  }

// 产品查询参数
export interface ProductQueryParams {
    page: number
    pageSize: number
    search?: string
}

// 产品创建参数
export interface ProductCreateParams {
    productCode: string
    productName: string
    productStatus: ProgressStatus
    customerSource: string
}

// 产品更新参数
export interface ProductUpdateParams {
    productId: number
    productCode: string
    productName: string
    productStatus: ProgressStatus
    customerSource: string
}

// 产品列表响应
export interface ProductListResponse {
    items: Product[]
    total: number
    page: number
    pageSize: number
    totalPages: number
}

export interface ProductListByEmployeeResponse {
    items: Product[]
    total: number
}
