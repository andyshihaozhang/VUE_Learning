<template>
  <BaseForm 
      ref="formRef"
      :title="title"
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
                v-for="status in getEnumValues(ProgressStatus)"
                :label="progressStatusConverter(status)"
                :value="status"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
  </BaseForm>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseForm from '@/components/global/BaseForm.vue'
import { ProgressStatus } from '@/types/business/common'
import type { Product } from '@/types/business/product'
import { ElMessage } from 'element-plus'
import { useProductStore } from '@/stores/business/productStore'
import { progressStatusConverter, getEnumValues } from '@/utils/converter'
// 属性
const productStore = useProductStore()
const formRef = ref<InstanceType<typeof BaseForm>>()
const title = computed(() => {
  return props.isEdit ? '编辑产品' : '新增产品'
})
const formModel = ref<Product>({
  productId: 0,
  productCode: '',
  productName: '',
  productStatus: ProgressStatus.IN_PROGRESS,
  customerSource: '',
  createTime: ''
})

// 交互
const props = defineProps<{
  isEdit: boolean
}>()
const emit = defineEmits<{
  (e: 'formOver'): void
}>()

// 方法
// 保存
const handleSave = async () => {
  try {
    if (props.isEdit) {
      await productStore.updateProduct(formModel.value.productId, {
        productId: formModel.value.productId,
        productCode: formModel.value.productCode,
        productName: formModel.value.productName,
        customerSource: formModel.value.customerSource,
        productStatus: formModel.value.productStatus
      })
      ElMessage.success('产品已更新')
    }
    else{
      await productStore.createProduct({
        productCode: formModel.value.productCode,
        productName: formModel.value.productName,
        customerSource: formModel.value.customerSource,
        productStatus: formModel.value.productStatus
      })
      ElMessage.success('产品已添加')
    }
    // 重置表单
    resetProductForm()
    emit('formOver')
    formRef.value?.closeForm()
    } catch (error) {
      ElMessage.error('产品操作失败')
    }
}

// 取消
const handleCancel = () => {
  resetProductForm()
  emit('formOver')
}

function resetProductForm() {
  formModel.value = {
    productId: 0,
    productCode: '',
    productName: '',
    productStatus: ProgressStatus.IN_PROGRESS,
    customerSource: '',
    createTime: ''
  }
}

// 暴露方法
defineExpose({
  initForm: (product: Product) => {
    formModel.value = {...product}
  },
  openForm: () => formRef.value?.openForm(),
  closeForm: () => formRef.value?.closeForm()
})

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


