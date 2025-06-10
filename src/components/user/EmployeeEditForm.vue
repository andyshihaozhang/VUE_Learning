<template>
    <BaseForm 
      ref="formRef"
      :title="'编辑员工'"
      :close-on-click-modal="false"
      @cancel="handleCancel"
      @save="handleSave">
      <template #form-content>
        <el-form label-width="100px">
          <el-form-item label="员工姓名" prop="employeeName">
            <el-input
            v-model="formEditModel.employeeName"
            type="text"
            required
            placeholder="请输入员工姓名"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="employeePhone">
          <el-input
            v-model="formEditModel.employeePhone"
            type="tel"
            required
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="状态" prop="employeeStatus">
          <el-select v-model="formEditModel.employeeStatus" placeholder="请选择状态">
            <el-option
              v-for="status in getEnumValues(ActiveStatus)"
              :label="employeeStatusConverter(status)"
              :value="status"
            />
          </el-select>
        </el-form-item>
      </el-form>
      </template>
    </BaseForm>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import type { EmployeeUpdateParams } from '@/types/business/employee'
  import { ActiveStatus } from '@/types/business/common'
  import BaseForm from '@/components/common/BaseForm.vue'
  import { useEmployeeStore } from '@/stores/business/employeeStore'
  import { employeeStatusConverter, getEnumValues } from '@/utils/converter'

  const employeeStore = useEmployeeStore()
  const formRef = ref<InstanceType<typeof BaseForm>>()
  const formEditModel = ref<EmployeeUpdateParams>({
    employeeId: 0,
    employeeName: '',
    employeePhone: 0,
    employeeStatus: ActiveStatus.ACTIVE,
  })

  const resetForm = () => {
    formEditModel.value = {
      employeeId: 0,
      employeeName: '',
      employeePhone: 0,
      employeeStatus: ActiveStatus.ACTIVE,
    }
  }

  const emit = defineEmits<{
    (e: 'formOver'): void
  }>()
  
  // 提交表单
  const handleSave = async () => {

    await employeeStore.updateEmployee(formEditModel.value.employeeId, {
      employeeId: formEditModel.value.employeeId,
      employeeName: formEditModel.value.employeeName,
      employeePhone: formEditModel.value.employeePhone,
      employeeStatus: formEditModel.value.employeeStatus as ActiveStatus
    })
    resetForm()
    emit('formOver')
  }
  
  // 取消
  const handleCancel = () => {
    resetForm()
    emit('formOver')
  }
  
  // 暴露方法
  defineExpose({
    initForm: (employee: EmployeeUpdateParams) => {
      formEditModel.value = { ...employee }
    },
    openForm: () => formRef.value?.openForm(),
    closeForm: () => formRef.value?.closeForm()
  })
  </script>