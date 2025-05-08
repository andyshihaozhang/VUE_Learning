<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label>用户名</label>
      <input type="text" v-model="formData.username" required>
    </div>
    <div class="form-group">
      <label>电话</label>
      <input type="tel" v-model="formData.phonenumber" required pattern="[0-9]{11}">
    </div>
    <div class="form-group">
      <label>状态</label>
      <select v-model="formData.status">
        <option :value="UserStatus.ACTIVE">在职</option>
        <option :value="UserStatus.INACTIVE">离职</option>
      </select>
    </div>
    <div class="form-actions">
      <button type="button" class="cancel-btn" @click="$emit('cancel')">取消</button>
      <button type="submit" class="submit-btn">确定</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { UserStatus } from '@/types/user'
import type { NewUser } from '@/types/user'

const props = defineProps<{
  initialData?: NewUser
}>()

const emit = defineEmits<{
  (e: 'submit', data: NewUser): void
  (e: 'cancel'): void
}>()

const formData = ref<NewUser>({
  username: '',
  phonenumber: '',
  status: UserStatus.ACTIVE
})

watch(() => props.initialData, (newVal) => {
  if (newVal) {
    formData.value = { ...newVal }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', { ...formData.value })
}
</script>

<style scoped>
.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #1890ff;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.cancel-btn,
.submit-btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background: none;
  border: 1px solid #ddd;
  color: #666;
}

.submit-btn {
  background-color: #1890ff;
  border: none;
  color: white;
}

.cancel-btn:hover {
  background-color: #f8f9fa;
}

.submit-btn:hover {
  background-color: #40a9ff;
}
</style> 