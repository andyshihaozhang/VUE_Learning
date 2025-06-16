<template #default="{ status }">
  <el-tag :type="employeeStatusColorConverter(status)">
    {{ employeeStatusConverter(status) }}
  </el-tag>
</template>

<script setup lang="ts">
import { ActiveStatus } from '@/enums/businessEnum'
import { employeeStatusConverter, employeeStatusColorConverter } from '@/utils/converter'
defineProps<{
  status: ActiveStatus
}>()

</script>
