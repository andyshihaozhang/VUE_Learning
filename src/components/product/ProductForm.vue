<template>
  <BaseForm 
      :title="title"
      :visible="props.visible"
      :close-on-click-modal="false"
      @cancel="handleCancel"
      @save="handleSave">
      <template #form-content>
        <el-form :model="formModel" label-width="100px" :rules="productRules">
          <el-form-item label="产品编号" prop="productCode">
            <el-input v-model="formModel.productCode" placeholder="请输入产品编号" />
          </el-form-item>
          <el-form-item label="产品名称" prop="productName">
            <el-input v-model="formModel.productName" placeholder="请输入产品名称" />
          </el-form-item>
          <el-form-item label="客户公司" prop="customerSource">
            <el-input v-model="formModel.customerSource" placeholder="请输入客户公司" />
          </el-form-item>
          <el-form-item label="产品状态" prop="productStatus">
            <el-select v-model="formModel.productStatus" placeholder="请选择产品状态">
              <el-option
                v-for="status in Object.values(ProcessStatus)"
                :key="status"
                :label="status"
                :value="status"
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
import { ProcessStatus } from '@/types/business/common'
import type { Product } from '@/types/business/product'
const title = computed(() => {
  return props.isEdit ? '编辑产品' : '新增产品'
})

const formModel = ref<Product>({
  productId: 0,
  productCode: '',
  productName: '',
  productStatus: ProcessStatus.IN_PROGRESS,
  customerSource: '',
  createTime: ''
})

const props = defineProps<{
  visible: boolean
  modelValue: Product
  isEdit: boolean
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'update:modelValue', value: Product): void
  (e: 'save', product: Product): void
}>()

// 监听 modelValue 变化
watch(
    () => props.modelValue,
  (newValue) => {
    formModel.value = { ...newValue }
  },
  { immediate: true }
)

// 处理保存
const handleSave = async () => {
  console.log(formModel.value)
  emit('save', formModel.value)
}

// 处理取消
const handleCancel = () => {
  emit('cancel')
}

// 校验
const productRules = {
  productCode: [
    { required: true, message: '请输入产品编号', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  productName: [
    { required: true, message: '请输入产品名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  customerSource: [
    { required: true, message: '请输入客户公司', trigger: 'blur' }
  ],
  productStatus: [
    { required: true, message: '请选择产品状态', trigger: 'change' }
  ]
}
</script>


