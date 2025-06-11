<template>
  <el-card class="products">
    <template #header>
      <div class="card-header">
        <div class="card-header-left">
          <h2>产品信息</h2>
          <FFHelperToolTip content="单击产品行，可以查看产品详情；双击产品行，可以直接进入工序分配页面" />
        </div>
        <el-button type="primary" @click="handleAddProduct">
          <el-icon><Plus /></el-icon>
          新增产品
        </el-button>
      </div>
    </template>

    <!-- 产品列表 -->
    <el-table
      class="table-container"
      :loading="isLoadingProduct"
      :data="productList"
      @click="handleRowClick"
      @row-dblclick="handleRowDblClick">
      <el-table-column label="产品名称" prop="productName" min-width="150" />
      <el-table-column label="产品编号" prop="productCode" width="120" />
      <el-table-column label="客户公司" prop="customerSource" min-width="200" />
      <el-table-column label="产品状态" prop="productStatus" min-width="200" >
        <template #default="scope">
          <ProgressStatusTag :status="scope.row.productStatus" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="180" />
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEditProduct(scope.row)">
            <el-icon><Edit /></el-icon>
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDeleteProduct(scope.row)">
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页配置 -->
    <FFPagination
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="currentPage"
      :page-size="pageSize"/>
  
    <!-- 新增产品对话框 -->
    <ProductForm
      ref="addProductFormRef"
      :is-edit="false"
      @formOver="handleAddProductOver"/>

    <!-- 编辑产品对话框 -->
    <ProductForm
      ref="editProductFormRef"
      :is-edit="true"
      @formOver="handleEditProductOver"/>

    <ProductDetailDrawer
      :isVisible="isVisible"
      :title="`产品明细`"
      @close="handleCloseProductDetail"
    />
  </el-card>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import type { Product } from '@/types/business/product'
import { useProductStore } from '@/stores/business/productStore'
import ProgressStatusTag from "@/components/global/ProgressStatusTag.vue"
import ProductForm from '@/components/business/product/ProductForm.vue'
import ProductDetailDrawer from '@/components/business/product/ProductDetailDrawer.vue'
import FFHelperToolTip from '@/components/global/FFHelperToolTip.vue'
import FFPagination from '@/components/global/FFPagination.vue'
const router = useRouter()
// 分页配置
const currentPage = ref(1)
const pageSize = ref(16)
const total = ref(0)
const isLoadingProduct = ref(true)
// 实例配置
const productList = ref<Product[]>([])
const productStore = useProductStore()
// 表单配置
const addProductFormRef = ref<InstanceType<typeof ProductForm>>()
const editProductFormRef = ref<InstanceType<typeof ProductForm>>()
// 产品详情抽屉配置
const isVisible = ref(false)
// 获取当前页的产品列表
const loadProducts = async () => {
  try {
    isLoadingProduct.value = true
    await productStore.fetchProducts({
      page: currentPage.value,
      pageSize: pageSize.value,
    })
    
    productList.value = productStore.productList
    isLoadingProduct.value = false
  } catch (error) {
    ElMessage.error('获取产品列表失败')
    isLoadingProduct.value = false
  }
}

// 打开新增产品表单
const handleAddProduct = () => {
  addProductFormRef.value?.openForm()
}

const handleAddProductOver = () => {
  loadProducts()
  addProductFormRef.value?.closeForm()
}

// 打开编辑产品表单
const handleEditProduct = (row: Product) => {
  editProductFormRef.value?.initForm(row)
  editProductFormRef.value?.openForm()
}

const handleEditProductOver = () => {
  loadProducts()
  editProductFormRef.value?.closeForm()
}

// 处理删除产品
const handleDeleteProduct = async (row: Product) => {
  try {
    await productStore.deleteProduct(row.productId)
    ElMessage.success('产品已删除')
    // 删除成功后刷新列表
    loadProducts()
  } catch (error) {
    ElMessage.error('删除产品失败')
  }
}

// 处理页码变化
const handleCurrentChange = (page: number) => {
  currentPage.value = page
  loadProducts()
}

// 处理每页条数变化
const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1 // 重置到第一页
  loadProducts()
}

const handleRowDblClick = (row: Product) => {
  router.push({
    path: '/allocations',
    query: {
      productId: row.productId
    }
  })
}

const handleRowClick = (row: Product) => {
  isVisible.value = true
}

const handleCloseProductDetail = () => {
  isVisible.value = false
}

// 组件挂载时初始化相关信息
onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.products {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.table-container {
  flex: 1;
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
}

:deep(.el-card__body) {
  height: calc(100% - 60px);
  padding: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

:deep(.el-table__body-wrapper) {
  overflow-y: auto;
  overflow-x: hidden;
}

:deep(.el-table__header-wrapper) {
  overflow: hidden;
}

:deep(.el-scrollbar__bar.is-horizontal) {
  height: 8px;
}

:deep(.el-scrollbar__bar.is-vertical) {
  width: 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
  flex-direction: column;
  gap: 16px;
}

.loading-icon {
  font-size: 32px;
  color: #409eff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.price {
  color: #f56c6c;
  font-weight: 500;
}

:deep(.el-input-number) {
  width: 100%;
}
</style>
  