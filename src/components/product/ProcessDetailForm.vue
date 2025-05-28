<template>
    <BaseForm
        ref="formRef"
        :title="title"
        :close-on-click-modal="false"
        @cancel="handleCancel"
        @save="handleSave"
    >
        <template #form-content>
            <el-form :model="formModel" label-width="100px">
                <el-form-item label="工序名称">
                <el-input v-model="formModel.processName" placeholder="请输入工序名称" />
                </el-form-item>
                <el-form-item label="工序描述">
                <el-input
                    v-model="formModel.processDescription"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入工序描述"
                />
                </el-form-item>
                <el-form-item label="工序单价">
                <el-input-number
                    v-model="formModel.referencePrice"
                    :precision="2"
                    :step="10"
                    :min="0"
                    placeholder="请输入工序单价"
                />
                </el-form-item>
                <el-form-item label="工序负责人">
                <el-select
                    v-model="formModel.employees"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    :max-collapse-tags="3"
                    placeholder="请选择负责人"
                >
                    <el-option
                        v-for="item in employeeStore.employeeList"
                        :key="item.employeeId"
                        :label="`${item.employeeId}-${item.employeeName}`"
                        :value="item.employeeId"
                    />
                </el-select>
                </el-form-item>
            </el-form>
        </template>
    </BaseForm>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseForm from '@/components/common/BaseForm.vue'
import { useProcessStore } from '@/stores/processStore'
import { useEmployeeStore } from '@/stores/employeeStore'

import type { ProcessAllocation } from '@/types/business/process'
import { ElMessage } from 'element-plus'
const processStore = useProcessStore()
const employeeStore = useEmployeeStore()

const formModel = ref<ProcessAllocation>({
    processId: 0,
    productId: 0,
    processName: '',
    processDescription: '',
    referencePrice: 0,
    employees: [],
    createTime: ''
})
function resetProcessForm() {
  formModel.value = {
    processId: 0,
    productId: 0,
    processName: '',
    processDescription: '',
    referencePrice: 0,
    employees: [],
    createTime: ''
  }
}
const title = computed(() => {
    return props.isEdit ? '编辑工序' : '新增工序'
})

const props = defineProps<{
    isEdit: boolean
}>()

const emit = defineEmits<{
    (e: 'formOver', productId: number): void
}>()

const handleCancel = () => {
    resetProcessForm()
    emit('formOver', formModel.value.productId)
}

const handleSave = () => {
    if (props.isEdit) {
        processStore.updateProcessAllocation({
            processId: formModel.value.processId,
            processName: formModel.value.processName,
            processDescription: formModel.value.processDescription,
            referencePrice: formModel.value.referencePrice,
            employees: formModel.value.employees
        })
        ElMessage.success('工序已更新')
    } else {
        processStore.createProcessAllocation({
            productId: formModel.value.productId,
            processName: formModel.value.processName,
            processDescription: formModel.value.processDescription,
            referencePrice: formModel.value.referencePrice,
            employees: formModel.value.employees
        })
        ElMessage.success('工序已添加')
    }
    resetProcessForm()
    emit('formOver', formModel.value.productId)
}

// 暴露方法
const formRef = ref<InstanceType<typeof BaseForm>>()

defineExpose({
    initForm: (productId: number, process?: ProcessAllocation) => {
        if (process) {
            formModel.value = {...process}      
        } else {
            resetProcessForm()
        }
        formModel.value.productId = productId
    },
    openForm: () => formRef.value?.openForm(),
    closeForm: () => formRef.value?.closeForm()
})
</script>
