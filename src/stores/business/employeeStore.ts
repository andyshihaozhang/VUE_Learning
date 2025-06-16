/*
* 员工管理全局状态管理
* 缓存员工基本信息
* 提供员工其他信息api调用接口
*/

import { defineStore } from 'pinia'
import { EmployeeApi } from '@/api/employeeApi'
import { StoreId } from '@/enums/storeEnums'
import type {
  EmployeeQueryParams,
  EmployeeCreateParams,
  EmployeeUpdateParams,
} from '@/types/business/employee'

export const useEmployeeStore = defineStore(StoreId.Employee, () => {
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
      await EmployeeApi.createEmployee(data)
      // 操作成功更新缓存

    } catch (errMsg) {
      throw errMsg
    }
  }

  // 更新员工
  const updateEmployee = async (id: number, data: EmployeeUpdateParams) => {
    try {
      await EmployeeApi.updateEmployee(id, data)
      // 操作成功更新缓存
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
    // 方法
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getProductsByEmployeeId,
    getProcessesByEmployeeId
  }
})