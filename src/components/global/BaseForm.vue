<template>
  <el-dialog 
    v-model="formVisible" 
    :title="props.title" 
    :close-on-click-modal="false" 
    :show-close="false">
    <slot name="form-content"></slot>
    <template #footer>
      <span slot="footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const formVisible = ref(false)

const props = defineProps<{
  title: string
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'save'): void
}>()

const handleCancel = () => {
  emit('cancel')
}

const handleSave = () => {
  emit('save')
}

defineExpose({
  openForm: () => formVisible.value = true,
  closeForm: () => formVisible.value = false
})

</script>

<style>
</style>
