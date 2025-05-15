<template>
  <span :class="['status-tag', status === ActiveStatus.ACTIVE ? 'active' : 'inactive']">
    <span class="status-dot"></span>
    {{ status === ActiveStatus.ACTIVE ? '在职' : '离职' }}
  </span>
</template>

<script setup lang="ts">
import { ActiveStatus } from '@/types/business/common'
defineProps<{
  status: ActiveStatus
}>()
</script>

<style scoped>
.status-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.status-tag.active {
  background-color: #e6f7ff;
  color: #1890ff;
  border: 1px solid #91d5ff;
}

.status-tag.inactive {
  background-color: #fff1f0;
  color: #ff4d4f;
  border: 1px solid #ffa39e;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 6px;
  transition: all 0.3s ease;
}

.status-tag.active .status-dot {
  background-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.status-tag.inactive .status-dot {
  background-color: #ff4d4f;
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
}
</style> 