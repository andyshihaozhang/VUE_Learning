import { ProcessDetailApi } from '@/api/processApi'
import type { 
    ProcessAllocation, 
    ProcessAllocationCreateRequest, 
    ProcessAllocationUpdateRequest } from '@/types/business/process'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProcessStore = defineStore('process', () => {
  const processAllocationList = ref<ProcessAllocation[]>([])
  const total = ref(0)

  // ��ȡ��Ʒ���̷���
  const getProcessAllocationByProductId = async (productId: number) => {
    const response = await ProcessDetailApi.getProcessAllocationByProductId(productId)
    processAllocationList.value = response.data.data.items
    return response.data
  }

  // ������Ʒ���̷���
  const createProcessAllocation = async (data: ProcessAllocationCreateRequest) => {
    await ProcessDetailApi.createProcessAllocation(data)
  }

  // ���²�Ʒ���̷���
  const updateProcessAllocation = async (data: ProcessAllocationUpdateRequest) => {
    await ProcessDetailApi.updateProcessAllocation(data)
  }

  // ɾ����Ʒ���̷���
  const deleteProcessAllocation = async (processId: number) => {
    await ProcessDetailApi.deleteProcessAllocation(processId)
  }

  return {
    processAllocationList,
    total,
    getProcessAllocationByProductId,
    createProcessAllocation,
    updateProcessAllocation,
    deleteProcessAllocation
  }
})
