import { ProcessDetailApi } from '@/api/processApi'
import type { 
    ProcessAllocation, 
    ProcessAllocationByEmployeeIdAndProductIdRequest, 
    ProcessAllocationCreateRequest, 
    ProcessAllocationUpdateRequest } from '@/types/business/process'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProcessStore = defineStore('process', () => {
  const processAllocationList = ref<ProcessAllocation[]>([])
  const total = ref(0)

  // 获取产品流程分配
  const getProcessAllocationByProductId = async (productId: number) => {
    const response = await ProcessDetailApi.getProcessAllocationByProductId(productId)
    console.log("response", response)
    processAllocationList.value = response.data.data.items || []
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
    console.log("data", data)
    const response = await ProcessDetailApi.getProcessAllocationByEmployeeIdAndProductId(data)
    console.log("response test", response)
    return response.data.data.items || []
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
