<template #default="{ status }">
    <el-tag :type="progressStatusColorConverter(status)">
      {{ progressStatusConverter(status) }}
    </el-tag>
  </template>

<script setup lang="ts">
import { ProgressStatus } from '@/enums/businessEnum'
import { progressStatusConverter, progressStatusColorConverter } from '@/utils/converter'
defineProps<{
    status: ProgressStatus
}>()

</script>
