<template>
  <form @submit.prevent="handleSubmit" class="user-form">
    <div class="form-item">
      <label>员工姓名</label>
      <input
        v-model="formData.employeeName"
        type="text"
        required
        placeholder="请输入员工姓名"
      />
    </div>
    <div class="form-item">
      <label>手机号</label>
      <input
        v-model="formData.employeePhone"
        type="tel"
        required
        placeholder="请输入手机号"
      />
    </div>
    <div class="form-item" v-if="isEdit">
      <label>状态</label>
      <select v-model="formData.employeeStatus">
        <option :value="EmployeeStatus.ACTIVE">在职</option>
        <option :value="EmployeeStatus.INACTIVE">离职</option>
      </select>
    </div>
    <div class="form-actions">
      <button type="submit" class="btn-submit">{{ isEdit ? '保存' : '创建' }}</button>
      <button type="button" class="btn-cancel" @click="$emit('cancel')">取消</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { EmployeeDetail } from '@/types/employee'
import { EmployeeStatus } from '@/types/employee'

const props = defineProps<{
  modelValue: Partial<EmployeeDetail>
  isEdit: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<EmployeeDetail>): void
  (e: 'submit', value: Partial<EmployeeDetail>): void
  (e: 'cancel'): void
}>()

const formData = ref<Partial<EmployeeDetail>>({
  employeeName: '',
  employeePhone: 0,
  employeeStatus: EmployeeStatus.ACTIVE
})

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (newValue) => {
    formData.value = { ...newValue }
  },
  { immediate: true }
)

// 监听表单数据变化
watch(
  formData,
  (newValue) => {
    emit('update:modelValue', newValue)
  },
  { deep: true }
)

// 提交表单
const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>

<style scoped>
.user-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item label {
  font-weight: 500;
  color: #333;
}

.form-item input,
.form-item select {
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
}

.form-item input:focus,
.form-item select:focus {
  outline: none;
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.form-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.btn-submit,
.btn-cancel {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-submit {
  background-color: #1890ff;
  color: white;
}

.btn-submit:hover {
  background-color: #40a9ff;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #666;
}

.btn-cancel:hover {
  background-color: #e8e8e8;
}
</style> 