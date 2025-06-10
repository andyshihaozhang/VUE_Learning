<template>
    <el-tooltip 
    :content="props.content" 
    effect="customized"
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

<style>

.el-popper.is-customized {
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>
