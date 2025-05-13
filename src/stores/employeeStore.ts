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
  // ״̬����
  const employeeList = ref<EmployeeDetail[]>([])
  const currentEmployee = ref<EmployeeDetail | null>(null)
  const total = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ��ȡԱ���б�
  const fetchEmployees = async (params: EmployeeQueryParams) => {
    try {
      loading.value = true
      const response = await EmployeeApi.getEmployees(params)
      if (response?.data?.data) {
        employeeList.value = response.data.data.items
        total.value = response.data.data.total
      } else {
        error.value = '��ȡԱ���б�ʧ�ܣ����ݸ�ʽ����'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '��ȡԱ���б�ʧ��'
      throw err
    } finally {
      loading.value = false
    }
  }

  // ��ȡԱ������
  const fetchEmployeeById = async (id: number) => {
    try {
      loading.value = true
      const response = await EmployeeApi.getEmployeeById(id)
      currentEmployee.value = response.data.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : '��ȡԱ������ʧ��'
    } finally {
      loading.value = false
    }
  }

  // ����Ա��
  const createEmployee = async (data: EmployeeCreateParams) => {
    try {
      loading.value = true
      const response = await EmployeeApi.createEmployee(data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : '����Ա��ʧ��'
      throw err
    } finally {
      loading.value = false
    }
  }

  // ����Ա��
  const updateEmployee = async (id: number, data: EmployeeUpdateParams) => {
    try {
      loading.value = true
      const response = await EmployeeApi.updateEmployee(id, data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : '����Ա��ʧ��'
      throw err
    } finally {
      loading.value = false
    }
  }

  // ɾ��Ա��
  const deleteEmployee = async (id: number) => {
    try {
      loading.value = true
      await EmployeeApi.deleteEmployee(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'ɾ��Ա��ʧ��'
      throw err
    } finally {
      loading.value = false
    }
  }

  // ����Ա��״̬
  const updateEmployeeStatus = async (id: number, status: EmployeeStatus) => {
    try {
      loading.value = true
      const response = await EmployeeApi.updateEmployeeStatus(id, status)
      // �����б��е�Ա��״̬
      const index = employeeList.value.findIndex(emp => emp.employeeId === id)
      if (index !== -1) {
        employeeList.value[index] = response.data.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : '����Ա��״̬ʧ��'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // ״̬
    employeeList,
    currentEmployee,
    total,
    loading,
    error,
    // ����
    fetchEmployees,
    fetchEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    updateEmployeeStatus
  }
})