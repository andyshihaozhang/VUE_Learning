<template>
  <div class="products">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h2>产品管理</h2>
          <el-button type="primary" @click="handleAddProduct">
            <el-icon><Plus /></el-icon>
            新增产品
          </el-button>
        </div>
      </template>

      <!-- 加载状态显示 -->
      <div v-if="isLoading" class="loading-container">
        <el-icon class="loading-icon"><Loading /></el-icon>
        <span>加载产品数据中...</span>
      </div>
      <!-- 产品列表 -->
      <div v-else class="table-container">
        <el-table
          :data="productList"
          style="width: 100%"
          height="calc(100vh - 270px)">
          <el-table-column type="expand">
            <template #default="props">
              <div class="process-detail">
                <div v-if="props.row.processLoading" style="text-align:center;padding:30px;">
                  <el-icon><Loading /></el-icon> 加载工序中...
                </div>
                <div v-else>
                  <div class="process-header">
                    <div class="process-title">
                      <el-icon><List /></el-icon>
                      <span>工序明细</span>
                    </div>
                  </div>
                  <el-table 
                    :data="props.row.processAllocations || []" 
                    border
                    class="process-table"
                    :header-cell-style="{
                      background: '#f5f7fa',
                      color: '#606266',
                      fontWeight: 'bold'
                    }">
                    <el-table-column label="工序ID" prop="processId" width="100" />
                    <el-table-column label="工序名称" prop="processName" width="150" />
                    <el-table-column label="工序描述" prop="processDescription" min-width="200" />
                    <el-table-column label="工序创建时间" prop="createTime" width="180" />
                    <el-table-column label="工序负责人" prop="employees" min-width="200">
                      <template #default="scope">
                        <div class="responser-display">
                          <el-tag
                            v-for="employeeId in scope.row.employees"
                            :key="employeeId"
                            size="small"
                            class="responser-tag">
                            {{ getEmployeeName(employeeId) }}
                          </el-tag>
                          <span v-if="!scope.row.employees.length" class="empty-text">暂无负责人</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="工序参考单价" prop="referencePrice" width="120">
                      <template #default="scope">
                        <span class="price">¥{{ scope.row.referencePrice.toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200" fixed="right">
                      <template #default="scope">
                        <el-button 
                          type="warning" 
                          size="small" 
                          class="process-action-btn"
                          @click="handleEditProcess(scope.row)">
                          <el-icon><Edit /></el-icon>
                          修改
                        </el-button>
                        <el-button 
                          type="danger" 
                          size="small" 
                          class="process-action-btn"
                          @click="handleDeleteProcess(scope.row)">
                          <el-icon><Delete /></el-icon>
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="process-footer">
                    <el-button 
                      type="success" 
                      class="add-process-btn"
                      @click="handleAddProcess(props.row.productId)"
                    >
                      <el-icon><Plus /></el-icon>
                      添加工序
                    </el-button>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
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
        <el-pagination
          class="pagination"
          background
          layout="prev, pager, next, jumper, ->, total"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="currentPage"
          :page-size="pageSize"
        />
      </div>
    </el-card>

    <!-- 新增工序对话框 -->
    <ProcessDetailForm
      ref="addProcessFormRef"
      :is-edit="false"
      @cancel="handleCancelAddProcess"
      @save="handleSaveAddProcess"
    />
    
    <!-- 编辑工序对话框 -->
    <ProcessDetailForm
      ref="editProcessFormRef"
      :is-edit="true"
      @cancel="handleCancelEditProcess"
      @save="handleSaveEditProcess"
    />

    <!-- 新增产品对话框 -->
    <ProductForm
      ref="addProductFormRef"
      :is-edit="false"
      @formOver="handleAddProductOver"
    />

    <!-- 编辑产品对话框 -->
    <ProductForm
      ref="editProductFormRef"
      :is-edit="true"
      @formOver="handleEditProductOver"
    />
  </div>
  </template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, Edit, Delete, List, Loading } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import type { Product } from '@/types/business/product'
import type { ProcessAllocation } from '@/types/business/process'
import type { EmployeeDetail } from '@/types/business/employee'
import { EmployeeApi } from '@/api/employeeApi'
import ProgressStatusTag from "@/components/common/ProgressStatusTag.vue"
import { useEmployeeStore } from '@/stores/employeeStore'
import { useProductStore } from '@/stores/productStore'
import { useProcessStore } from '@/stores/processStore'
import ProductForm from '@/components/product/ProductForm.vue'
import ProcessDetailForm from '@/components/product/ProcessDetailForm.vue'

// 扩展Product类型，增加工序明细及加载状态
interface ProductWithProcess extends Product {
  processAllocations?: ProcessAllocation[]
  processLoading?: boolean
}
// 分页配置
const currentPage = ref(1)
const pageSize = ref(16)
const total = ref(0)
const isLoading = ref(false)

// 实例配置
const productList = ref<ProductWithProcess[]>([])
const employeeOptions = ref<EmployeeDetail[]>([])
const employeeStore = useEmployeeStore()
const productStore = useProductStore()
const processStore = useProcessStore()
// 表单配置
const addProcessFormRef = ref<InstanceType<typeof ProcessDetailForm>>()
const editProcessFormRef = ref<InstanceType<typeof ProcessDetailForm>>()
const addProductFormRef = ref<InstanceType<typeof ProductForm>>()
const editProductFormRef = ref<InstanceType<typeof ProductForm>>()

// 获取当前页的产品列表
const loadProducts = async () => {
  try {
    console.log("loadProducts")
    await productStore.fetchProducts({
      page: currentPage.value,
      pageSize: pageSize.value,
    })
    
    // 为每个产品添加工序明细相关属性
    productList.value = productStore.productList.map(item => ({
      ...item,
      processAllocations: [],
      processLoading: true
    }))
    
    // 为每个产品预加载工序明细
    await loadProcessAllocations()
  } catch (error) {
    ElMessage.error('获取产品列表失败')
  }
}

// 预加载当前页产品的工序明细
const loadProcessAllocations = async () => {
  try {
    console.log("loadProcessAllocations")
    // 收集所有工序中涉及的员工ID
    const employeeIds = new Set<number>()
    
    await Promise.all(
      productList.value.map(async (product) => {
        try {
          const res = await processStore.getProcessAllocationByProductId(product.productId)          
          product.processAllocations = res || []
        } catch (error) {
          console.error(`加载产品 ${product.productId} 的工序明细失败:`, error)
          product.processAllocations = []
        } finally {
          product.processLoading = false
        }
      })
    )

    // 预加载所有相关员工信息
    if (employeeIds.size > 0) {
      await employeeStore.fetchEmployees({
        page: 1,
        pageSize: employeeIds.size
      })
    }
  } catch (error) {
    console.error('预加载工序明细失败:', error)
  }
}

// 预加载所有可分配的员工
const loadEmployees = async () => {
  try {
    const res = await EmployeeApi.getEmployees({
      page: 1,
      pageSize: 100, // 假设员工不会太多，一次性加载
    })
    employeeOptions.value = res.data.data.items
  } catch (error) {
    ElMessage.error('获取员工列表失败')
  }
}

const flushProcessesByProductId = async (productId: number) => {
  // 找到所属产品并刷新其工序列表
  const product = productList.value.find(p => 
      p.productId === productId
    )
    if (product) {
      // 标记为加载中
      product.processLoading = true
      try {
        const res = await processStore.getProcessAllocationByProductId(product.productId)
        product.processAllocations = res
      } finally {
        product.processLoading = false
      }
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

// 打开新增工序表单
const handleAddProcess = (productId: number) => {
  addProcessFormRef.value?.initForm(productId)
  addProcessFormRef.value?.openForm()
}

// 处理保存新增工序
const handleSaveAddProcess = async (processData: ProcessAllocation) => {  
  try {
    console.log("handleSaveAddProcess")
    addProcessFormRef.value?.closeForm()
    flushProcessesByProductId(processData.productId)
    console.log(productList)
  } catch (error) {
    ElMessage.error('添加工序失败')
  }
}

// 处理取消新增工序
const handleCancelAddProcess = () => {
  addProcessFormRef.value?.closeForm()
}

// 处理编辑工序
const handleEditProcess = (row: ProcessAllocation) => {
  editProcessFormRef.value?.initForm(row.productId, row)
  editProcessFormRef.value?.openForm()
}

// 处理保存编辑工序
const handleSaveEditProcess = async (processData: ProcessAllocation) => {  
  try {
    ElMessage.success('工序信息已更新')
    editProcessFormRef.value?.closeForm()
    flushProcessesByProductId(processData.productId)
  } catch (error) {
    ElMessage.error('更新工序信息失败' + error)
  }
}

// 处理取消编辑工序
const handleCancelEditProcess = () => {
  editProcessFormRef.value?.closeForm()
}

// 处理删除工序
const handleDeleteProcess = (row: ProcessAllocation) => {
  ElMessageBox.confirm(
    `确定要删除工序"${row.processName}"吗？`,
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    await processStore.deleteProcessAllocation(row.processId)
    ElMessage.success('工序已删除')
    flushProcessesByProductId(row.productId)
  }).catch(() => {
    // 取消删除
    ElMessage.info('取消删除')
  })
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

// 获取员工姓名的辅助函数
const getEmployeeName = (employeeId: number) => {
  const employee = employeeStore.employeeList.find((emp: EmployeeDetail) => emp.employeeId === employeeId)
  return employee ? `${employee.employeeName}` : `未知员工(${employeeId})`
}

// 组件挂载时初始化相关信息
onMounted(() => {
  loadProducts()
  loadEmployees()
})
  </script>

<style scoped>
.products {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.box-card {
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

:deep(.el-card__body) {
  height: calc(100% - 60px);
  padding: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

:deep(.el-table) {
  --el-table-border-color: #edf2f7;
  --el-table-header-bg-color: #f8fafc;
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

.process-detail {
  padding: 15px;
  background-color: #e6e8eb;
  border-radius: 4px;
  margin: 0;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
}

.process-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 4px;
}

.process-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: #606266;
}

.process-title .el-icon {
  margin-right: 8px;
  font-size: 18px;
  color: #606266;
}

.process-table {
  margin-bottom: 16px;
  border-radius: 4px;
  overflow: hidden;
}

.process-footer {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.add-process-btn {
  width: 100%;
  height: 40px;
  font-size: 14px;
  border-radius: 4px;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}

.add-process-btn:hover {
  background-color: #e1f3d8;
  border-color: #c2e7b0;
  color: #67c23a;
}

.price {
  color: #f56c6c;
  font-weight: 500;
}

:deep(.el-button .el-icon) {
  margin-right: 4px;
  vertical-align: middle;
}

:deep(.el-button--primary) {
  --el-button-bg-color: #1a1f36;
  --el-button-border-color: #1a1f36;
  --el-button-hover-bg-color: #2d3748;
  --el-button-hover-border-color: #2d3748;
}

:deep(.process-action-btn) {
  --el-button-hover-bg-color: var(--el-button-bg-color);
  --el-button-hover-border-color: var(--el-button-border-color);
  opacity: 0.9;
}

:deep(.process-action-btn:hover) {
  opacity: 1;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.el-table__expand-icon) {
  color: #1a1f36;
}

:deep(.el-table__expand-icon--expanded) {
  transform: rotate(90deg);
}

:deep(.el-table__expanded-cell) {
  background-color: #e6e8eb !important;
  padding: 10px 20px !important;
  max-height: 500px;
  overflow-y: auto;
}

:deep(.el-table__expanded-cell:hover) {
  background-color: #e6e8eb !important;
}

:deep(.el-table__expanded-cell .process-detail) {
  background-color: #e6e8eb;
}

:deep(.el-table__expanded-cell .process-detail:hover) {
  background-color: #e6e8eb;
}

:deep(.process-table) {
  --el-table-border-color: #e4e7ed;
  margin: 0;
  border-radius: 4px;
  overflow: hidden;
  background-color: #edf0f3;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  max-height: 400px;
}

:deep(.process-table .el-table__header) {
  background-color: #f5f7fa;
}

:deep(.process-table .el-table__cell) {
  border-bottom: 1px solid var(--el-table-border-color);
  background-color: #edf0f3;
}

:deep(.process-table .el-table__row:hover > td) {
  background-color: #edf0f3 !important;
}

:deep(.process-table .el-table__body-wrapper) {
  max-height: 350px;
  overflow-y: auto;
}

:deep(.el-select) {
  width: 100%;
}

:deep(.el-select .el-input__wrapper) {
  background-color: #edf0f3;
}

:deep(.el-select:hover .el-input__wrapper) {
  background-color: #e4e7ed;
}

:deep(.el-select-dropdown__item.selected) {
  color: #409eff;
  font-weight: bold;
}

:deep(.el-select-dropdown__item.selected::after) {
  content: '✓';
  position: absolute;
  right: 20px;
  color: #409eff;
  font-weight: bold;
}

:deep(.responser-display) {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}

:deep(.responser-tag) {
  background-color: #f0f2f5;
  border-color: #e4e7ed;
  color: #606266;
}

:deep(.empty-text) {
  color: #909399;
  font-size: 13px;
}

:deep(.el-dialog__body) {
  padding: 20px 30px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
}

:deep(.el-input-number) {
  width: 100%;
}

:deep(.dialog-footer) {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.pagination {
  padding: 15px 0;
  display: flex;
  justify-content: center;
  background-color: white;
  border-top: 1px solid #f0f0f0;
  z-index: 10;
}
</style>
  