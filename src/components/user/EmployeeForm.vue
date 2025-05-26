<template>
  <BaseForm 
    :title="title"
    :visible="props.visible"
    :close-on-click-modal="false"
    @cancel="handleCancel"
    @save="handleSubmit">
    <template #form-content>
      <el-form @submit.prevent="handleSubmit" label-width="100px">
        <el-form-item label="员工姓名" prop="employeeName">
          <el-input
          v-model="formData.employeeName"
          type="text"
          required
          placeholder="请输入员工姓名"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="employeePhone">
        <el-input
          v-model="formData.employeePhone"
          type="tel"
          required
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="状态" prop="employeeStatus">
        <el-select v-model="formData.employeeStatus">
          <el-option :value="ActiveStatus.ACTIVE">在职</el-option>
          <el-option :value="ActiveStatus.INACTIVE">离职</el-option>
        </el-select>
      </el-form-item>
    </el-form>
    </template>
  </BaseForm>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { EmployeeDetail } from '@/types/business/employee'
import { ActiveStatus } from '@/types/business/common'
import BaseForm from '@/components/common/BaseForm.vue'

const formData = ref<Partial<EmployeeDetail>>({
  employeeName: '',
  employeePhone: 0,
  employeeStatus: ActiveStatus.ACTIVE
})

const title = computed(() => {
  return props.isEdit ? '编辑员工' : '新增员工'
})


const props = defineProps<{
  visible: boolean
  modelValue: Partial<EmployeeDetail>
  isEdit: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<EmployeeDetail>): void
  (e: 'submit', value: Partial<EmployeeDetail>): void
  (e: 'cancel'): void
}>()

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (newValue) => {
    formData.value = { ...newValue }
  },
  { immediate: true }
)

// 提交表单
const handleSubmit = () => {
  console.log("form: handleSubmit called with data:", formData.value)
  emit('submit', formData.value)
}

// 取消
const handleCancel = () => {
  emit('cancel')
}
</script>