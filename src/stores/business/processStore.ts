/*
* 工序管理全局状态管理
* 缓存工序基本信息
* 提供工序其他信息api调用接口
*/

import { ProcessDetailApi } from '@/api/processApi'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { StoreId } from '@/enums/storeEnums'
import type { 
    ProcessAllocation, 
    ProcessAllocationByEmployeeIdAndProductIdRequest, 
    ProcessAllocationCreateRequest, 
    ProcessAllocationUpdateRequest } from '@/types/business/process'


export const useProcessStore = defineStore(StoreId.Process, () => {
  const processAllocationList = ref<ProcessAllocation[]>([])
  const total = ref(0)

  // 获取产品流程分配
  const getProcessAllocationByProductId = async (productId: number) => {
    const response = await ProcessDetailApi.getProcessAllocationByProductId(productId)
    processAllocationList.value = response.data.items || []
    return processAllocationList.value
  }

  // 创建产品流程分配
  const createProcessAllocation = async (data: ProcessAllocationCreateRequest) => {
    await ProcessDetailApi.createProcessAllocation(data)
  }

  // 更新产品流程分配
  const updateProcessAllocation = async (data: ProcessAllocationUpdateRequest) => {
    await ProcessDetailApi.updateProcessAllocation(data)
  }

  // 删除产品流程分配
  const deleteProcessAllocation = async (processId: number) => {
    await ProcessDetailApi.deleteProcessAllocation(processId)
  }

  // 根据员工ID和产品ID获取工序列表
  const getProcessAllocationByEmployeeIdAndProductId = async (data: ProcessAllocationByEmployeeIdAndProductIdRequest) => {
    const response = await ProcessDetailApi.getProcessAllocationByEmployeeIdAndProductId(data)
    return response.data.items || []
  }

  return {
    processAllocationList,
    total,
    getProcessAllocationByProductId,
    createProcessAllocation,
    updateProcessAllocation,
    deleteProcessAllocation,
    getProcessAllocationByEmployeeIdAndProductId
  }
})
