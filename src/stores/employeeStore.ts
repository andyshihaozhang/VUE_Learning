import { defineStore } from 'pinia'
import { ref } from 'vue'
import { EmployeeApi } from '@/api/employeeApi'
import type {
  EmployeeDetail,
  EmployeeQueryParams,
  EmployeeCreateParams,
  EmployeeUpdateParams,
  EmployeeStatus
} from '@/types/employee'

export const useEmployeeStore = defineStore('employee', () => {
  // 状态定义
  const employeeList = ref<EmployeeDetail[]>([])
  const currentEmployee = ref<EmployeeDetail | null>(null)
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
        error.value = '获取员工列表失败：数据格式错误'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取员工列表失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 获取员工详情
  const fetchEmployeeById = async (id: number) => {
    try {
      loading.value = true
      const response = await EmployeeApi.getEmployeeById(id)
      currentEmployee.value = response.data.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取员工详情失败'
    } finally {
      loading.value = false
    }
  }

  // 创建员工
  const createEmployee = async (data: EmployeeCreateParams) => {
    try {
      loading.value = true
      const response = await EmployeeApi.createEmployee(data)
      return response.data
    } catch (err) {
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

  // 更新员工状态
  const updateEmployeeStatus = async (id: number, status: EmployeeStatus) => {
    try {
      loading.value = true
      const response = await EmployeeApi.updateEmployeeStatus(id, status)
      // 更新列表中的员工状态
      const index = employeeList.value.findIndex(emp => emp.employeeId === id)
      if (index !== -1) {
        employeeList.value[index] = response.data.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : '更新员工状态失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // 状态
    employeeList,
    currentEmployee,
    total,
    loading,
    error,
    // 方法
    fetchEmployees,
    fetchEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    updateEmployeeStatus
  }
})