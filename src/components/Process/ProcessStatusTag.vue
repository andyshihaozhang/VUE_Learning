<template #default="{ status }">
    <el-tag :type="getStatusColor(status)">
      {{ status }}
    </el-tag>
  </template>

<script setup lang="ts">
import { ProcessStatus } from '@/types/business/common'
defineProps<{
    status: ProcessStatus
}>()

function getStatusColor(status: ProcessStatus) {
    switch (status) {
        case ProcessStatus.COMPLETED:
            return 'info'
        case ProcessStatus.PENDING:
            return 'warning'
        case ProcessStatus.IN_PROGRESS:
            return 'success'
        case ProcessStatus.CANCELLED:
            return 'danger'
        default:
            return 'info'
    }
}
</script>
