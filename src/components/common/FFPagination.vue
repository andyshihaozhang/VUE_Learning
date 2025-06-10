<template>
    <el-pagination
        background
        layout="prev, pager, next, jumper, ->, total"
        :total="props.total"
        @current-change="(page: number) => emit('current-change', page)"
        @size-change="(size: number) => emit('size-change', size)"
        :current-page="props.currentPage"
        :page-size="props.pageSize"/>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    total: number,
    currentPage: number,
    pageSize: number
}>()

const emit = defineEmits<{
  (e: 'current-change', page: number): void
  (e: 'size-change', size: number): void
}>()
</script>

<style scoped>

</style>