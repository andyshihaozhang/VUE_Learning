<template>
    <el-tooltip 
    :content="props.content" 
    effect="dark"
    placement="right-start">
        <el-icon>
            <QuestionFilled />
        </el-icon>
    </el-tooltip>
  </template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { QuestionFilled } from '@element-plus/icons-vue'

const props = defineProps<{
    content: string
}>()
</script>

<style scoped>

</style>
