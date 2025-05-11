<template #default="{ status }">
    <el-tag :type="getStatusColor(status)">
      {{ status }}
    </el-tag>
  </template>

<script setup lang="ts">
import { ProcessStatus } from '@/types/process'

defineProps<{
    status: ProcessStatus
}>()

function getStatusColor(status: ProcessStatus) {
    switch (status) {
        case ProcessStatus.COMPLETED:
            return 'success'
        case ProcessStatus.PENDING:
            return 'warning'
        case ProcessStatus.IN_PROGRESS:
            return 'info'
        default:
            return 'info'
    }
}
</script>
