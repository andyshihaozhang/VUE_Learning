/*
* 员工管理全局状态管理
* 缓存员工基本信息
* 提供员工其他信息api调用接口
*/

import { defineStore } from 'pinia'
import { EmployeeApi } from '@/api/employeeApi'
import { StoreId } from '@/enums/storeEnums'
import { Cache } from '@/utils/cache'
import type {
  EmployeeQueryParams,
  EmployeeCreateParams,
  EmployeeUpdateParams,
  Employee
} from '@/types/business/employee'

export const useEmployeeStore = defineStore(StoreId.Employee, () => {
  // 员工基本信息缓存
  const employeeCache = new Cache<Employee[]>()

  // 获取所有员工列表
  const getAllEmployees = async () => {
    try {
      const response = await EmployeeApi.getAllEmployees()
      employeeCache.setCashData(response.data.items)
    } catch (errMsg) {
      throw errMsg
    }
  }

  // 获取员工列表
  const getEmployees = async (params: EmployeeQueryParams) => {
    try {
      const response = await EmployeeApi.getEmployees(params)
      return response.data
    } catch (errMsg) {
      throw errMsg
    }
  }

  // 创建员工
  const createEmployee = async (data: EmployeeCreateParams) => {
    try {
      const response = await EmployeeApi.createEmployee(data)
      return response.data
    } catch (errMsg) {
      throw errMsg
    }
  }

  // 更新员工
  const updateEmployee = async (id: number, data: EmployeeUpdateParams) => {
    try {
      const response = await EmployeeApi.updateEmployee(id, data)
      return response.data
    } catch (errMsg) {
      throw errMsg
    }
  }

  // 删除员工
  const deleteEmployee = async (id: number) => {
    try {
      await EmployeeApi.deleteEmployee(id)
    } catch (errMsg) {
      throw errMsg
    }
  }

  // 获取员工负责的产品列表
  const getProductsByEmployeeId = async (employeeId: number) => {
    try {
      const response = await EmployeeApi.getProductsByEmployeeId(employeeId)
      return response.data
    } catch (errMsg) {
      throw errMsg
    }
  }

  // 获取员工的工序列表
  const getProcessesByEmployeeId = async (employeeId: number) => {
    try {
      const response = await EmployeeApi.getProcessesByEmployeeId(employeeId)
      return response.data
    } catch (errMsg) {
      throw errMsg
    }
  }

  return {
    // 状态
    employeeCache,
    // 方法
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getProductsByEmployeeId,
    getProcessesByEmployeeId
  }
})