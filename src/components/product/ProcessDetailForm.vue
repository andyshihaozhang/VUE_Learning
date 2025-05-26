<template>
    <BaseForm
        :title="title"
        :visible="visible"
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
                    v-model="formModel.processPrice"
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
import { computed, ref, watch } from 'vue'
import BaseForm from '@/components/common/BaseForm.vue'
import { useEmployeeStore } from '@/stores/employeeStore'
import type { ProcessDetail } from '@/types/business/process'

const employeeStore = useEmployeeStore()

const formModel = ref<ProcessDetail>({
    processId: 0,
    productId: 0,
    processName: '',
    processDescription: '',
    processPrice: 0,
    employees: [],
    createTime: ''
})

const title = computed(() => {
    return props.isEdit ? '编辑工序' : '新增工序'
})

const props = defineProps<{
    visible: boolean
    isEdit: boolean
    formModel: ProcessDetail
}>()

watch(
    () => props.formModel,
    (newValue) => {
        formModel.value = newValue
    },
    { immediate: true }
)

const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void
    (e: 'save', processData: ProcessDetail): void
}>()

const handleCancel = () => {
    emit('update:visible', false)
}

const handleSave = () => {
    emit('save', formModel.value)
}


</script>
