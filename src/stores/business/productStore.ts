/*
* 产品管理全局状态管理
* 缓存产品基本信息
* 提供产品其他信息api调用接口
*/

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ProductApi } from '@/api/productApi'
import type { Product } from '@/types/business/product'
import { StoreId } from '@/enums/storeEnums'
import type {
  ProductQueryParams,
  ProductCreateParams,
  ProductUpdateParams,
} from '@/types/business/product'


export const useProductStore = defineStore(StoreId.Product, () => {
  // 状态定义
  const productList = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null)
  const total = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 获取产品列表
  const fetchProducts = async (params: ProductQueryParams) => {
    try {
      loading.value = true
      const response = await ProductApi.getProducts(params)
      if (response) {
        productList.value = response.data.items
        total.value = response.data.total
      } else {
        error.value = '获取产品列表失败，数据格式错误'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取产品列表失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 创建产品
  const createProduct = async (data: ProductCreateParams) => {
    try {
      loading.value = true
      const response = await ProductApi.createProduct(data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : '创建产品失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 更新产品
  const updateProduct = async (id: number, data: ProductUpdateParams) => {
    try {
      loading.value = true
      const response = await ProductApi.updateProduct(id, data)
      // 更新列表中的产品信息
      const index = productList.value.findIndex(p => p.productId === id)
      if (index !== -1) {
        productList.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : '更新产品失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 删除产品
  const deleteProduct = async (id: number) => {
    try {
      loading.value = true
      await ProductApi.deleteProduct(id)
      // 从列表中移除产品
      productList.value = productList.value.filter(p => p.productId !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : '删除产品失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 根据产品获取员工
  const getEmployeesByProductId = async (productId: number) => {
    try {
      const response = await ProductApi.getEmployeesByProductId(productId)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取员工失败'
      throw err
    }
  }

  return {
    // 状态
    productList,
    currentProduct,
    total,
    loading,
    error,
    // 方法
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getEmployeesByProductId,
  }
}) 