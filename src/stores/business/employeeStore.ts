import { defineStore } from 'pinia'
import { ref } from 'vue'
import { EmployeeApi } from '@/api/employeeApi'
import type { EmployeeDetail } from '@/types/business/employee'
import { SetupStoreId } from '@/stores/storeEnums'
import type {
  EmployeeQueryParams,
  EmployeeCreateParams,
  EmployeeUpdateParams
} from '@/types/business/employee'

export const useEmployeeStore = defineStore(SetupStoreId.Employee, () => {
  // 状态定义
  const employeeList = ref<EmployeeDetail[]>([])
  const total = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 获取员工列表
  const fetchEmployees = async (params: EmployeeQueryParams) => {
    try {
      loading.value = true
      const response = await EmployeeApi.getEmployees(params)
      if (response?.data?.data) {
        employeeList.value = response.data.data.items
        total.value = response.data.data.total
      } else {
        error.value = '获取员工列表失败，数据格式错误'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取员工列表失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 创建员工
  const createEmployee = async (data: EmployeeCreateParams) => {
    try {
      console.log("store: createEmployee called with data:", data)
      loading.value = true
      console.log("store: calling EmployeeApi.createEmployee")
      const response = await EmployeeApi.createEmployee(data)
      console.log("store: EmployeeApi.createEmployee response:", response)
      return response.data
    } catch (err) {
      console.error("store: createEmployee error:", err)
      error.value = err instanceof Error ? err.message : '创建员工失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 更新员工
  const updateEmployee = async (id: number, data: EmployeeUpdateParams) => {
    try {
      loading.value = true
      const response = await EmployeeApi.updateEmployee(id, data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : '更新员工失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 删除员工
  const deleteEmployee = async (id: number) => {
    try {
      loading.value = true
      await EmployeeApi.deleteEmployee(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : '删除员工失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 获取员工负责的产品列表
  const getProductsByEmployeeId = async (employeeId: number) => {
    try {
      loading.value = true
      const response = await EmployeeApi.getProductsByEmployeeId(employeeId)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取产品列表失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 获取员工的工序列表
  const getProcessesByEmployeeId = async (employeeId: number) => {
    try {
      loading.value = true
      const response = await EmployeeApi.getProcessesByEmployeeId(employeeId)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取工序列表失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // 状态
    employeeList,
    total,
    loading,
    error,
    // 方法
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getProductsByEmployeeId,
    getProcessesByEmployeeId
  }
})