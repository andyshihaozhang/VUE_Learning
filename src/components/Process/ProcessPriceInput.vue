<template>
    <el-input-number
    :model-value="price"
    @update:model-value="$emit('update:price', $event as number)"
      :precision="2"
      :step="10"
      :min="0"
      :controls="false"
      class="price-input"
    >
      <template #prefix>¥</template>
    </el-input-number>
  </template>

<script setup lang="ts">
defineProps<{
    price: number
}>()

defineEmits<{
  'update:price': [value: number]
}>()
</script>

<style scoped>
:deep(.price-input) {
  width: 100%;
}
</style>