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

      <div v-else class="table-container">
        <el-table
          :data="productList"
          style="width: 100%"
          @expand-change="handleExpandChange"
          height="calc(100vh - 270px)"
        >
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
                    :data="props.row.processDetails || []" 
                    border
                    class="process-table"
                    :header-cell-style="{
                      background: '#f5f7fa',
                      color: '#606266',
                      fontWeight: 'bold'
                    }"
                  >
                    <el-table-column label="工序ID" prop="processId" width="100" />
                    <el-table-column label="工序名称" prop="processName" width="150" />
                    <el-table-column label="工序描述" prop="processDescription" min-width="200" />
                    <el-table-column label="工序负责人" prop="employees" min-width="200">
                      <template #default="scope">
                        <div class="responser-display">
                          <el-tag
                            v-for="employee in scope.row.employees"
                            :key="employee.employeeId"
                            size="small"
                            class="responser-tag"
                          >
                            {{ employee.employeeId }}-{{ employee.employeeName }}
                          </el-tag>
                          <span v-if="!scope.row.employees.length" class="empty-text">暂无负责人</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="工序参考单价" prop="processPrice" width="120">
                      <template #default="scope">
                        <span class="price">¥{{ scope.row.processPrice.toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200" fixed="right">
                      <template #default="scope">
                        <el-button 
                          type="warning" 
                          size="small" 
                          class="process-action-btn"
                          @click="handleEditProcess(scope.row)"
                        >
                          <el-icon><Edit /></el-icon>
                          修改
                        </el-button>
                        <el-button 
                          type="danger" 
                          size="small" 
                          class="process-action-btn"
                          @click="handleDeleteProcess(scope.row)"
                        >
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
                      @click="handleAddProcess(props.row)"
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
          <el-table-column label="客户公司" prop="customerName" min-width="200" />
          <el-table-column label="产品状态" prop="productStatus" min-width="200" >
            <template #default="scope">
              <ProcessStatusTag :status="scope.row.productStatus" />
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

    <!-- 编辑工序对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="编辑工序"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="工序名称">
          <el-input v-model="editForm.name" placeholder="请输入工序名称" />
        </el-form-item>
        <el-form-item label="工序描述">
          <el-input
            v-model="editForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入工序描述"
          />
        </el-form-item>
        <el-form-item label="工序单价">
          <el-input-number
            v-model="editForm.price"
            :precision="2"
            :step="10"
            :min="0"
            placeholder="请输入工序单价"
          />
        </el-form-item>
        <el-form-item label="工序负责人">
          <el-select
            v-model="editForm.responser"
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="3"
            placeholder="请选择负责人"
          >
            <el-option
              v-for="item in employeeOptions"
              :key="item.employeeId"
              :label="`${item.employeeId}-${item.employeeName}`"
              :value="item.employeeId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSaveEdit">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 新增工序对话框 -->
    <el-dialog
      v-model="addDialogVisible"
      title="新增工序"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form :model="addForm" label-width="100px">
        <el-form-item label="工序名称">
          <el-input v-model="addForm.name" placeholder="请输入工序名称" />
        </el-form-item>
        <el-form-item label="工序描述">
          <el-input
            v-model="addForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入工序描述"
          />
        </el-form-item>
        <el-form-item label="工序单价">
          <el-input-number
            v-model="addForm.price"
            :precision="2"
            :step="10"
            :min="0"
            placeholder="请输入工序单价"
          />
        </el-form-item>
        <el-form-item label="工序负责人">
          <el-select
            v-model="addForm.responser"
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="3"
            placeholder="请选择负责人"
          >
            <el-option
              v-for="item in employeeOptions"
              :key="item.employeeId"
              :label="`${item.employeeId}-${item.employeeName}`"
              :value="item.employeeId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSaveAdd">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, Edit, Delete, List, Loading } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import type { Product } from '@/types/business/product'
import type { ProcessDetail } from '@/types/business/process'
import type { EmployeeDetail } from '@/types/business/employee'
import { ProductApi } from '@/api/productApi'
import { ProcessDetailApi } from '@/api/processApi'
import { EmployeeApi } from '@/api/employeeApi'
import ProcessStatusTag from "@/components/Process/ProcessStatusTag.vue"

// 扩展Product类型，增加工序明细及加载状态
interface ProductWithProcess extends Product {
  processDetails?: ProcessDetail[]
  processLoading?: boolean
}

const currentPage = ref(1)
const pageSize = ref(16)
const total = ref(0)
const isLoading = ref(false)

const productList = ref<ProductWithProcess[]>([])
const employeeOptions = ref<EmployeeDetail[]>([])

// 获取产品列表
const getProducts = async () => {
  isLoading.value = true
  try {
    const res = await ProductApi.getProducts({
      page: currentPage.value,
      pageSize: pageSize.value,
    })
    
    // 先设置基本产品信息并标记加载状态
    productList.value = res.data.data.items.map(item => ({
      ...item,
      processDetails: [],  // 初始化为空数组，而不是undefined
      processLoading: true // 标记为加载中
    }))
    total.value = res.data.data.total
    
    // 为每个产品预加载工序明细
    await loadAllProcessDetails()
  } catch (error) {
    ElMessage.error('获取产品列表失败')
  } finally {
    isLoading.value = false
  }
}

// 预加载所有产品的工序明细
const loadAllProcessDetails = async () => {
  try {
    // 使用Promise.all并行加载所有产品的工序明细
    await Promise.all(
      productList.value.map(async (product) => {
        try {
          const res = await ProcessDetailApi.getProcessDetailsByProductId({
            productId: product.productId,
            page: 1,
            pageSize: 100,
          })
          
          // 更新产品的工序明细
          product.processDetails = res.data.data.items
        } catch (error) {
          console.error(`加载产品 ${product.productId} 的工序明细失败:`, error)
          product.processDetails = [] // 发生错误时设置为空数组
        } finally {
          product.processLoading = false // 无论成功失败都标记为加载完成
        }
      })
    )
  } catch (error) {
    console.error('预加载工序明细失败:', error)
  }
}

// 获取员工列表
const getEmployees = async () => {
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

// 处理展开事件，无需再加载数据，因为已经预加载完成
const handleExpandChange = async (row: ProductWithProcess, expandedRows: any) => {
  // 无需加载数据，因为已经预加载完成
  // 如果数据仍在加载中，可以在模板中显示加载状态
}

// 添加编辑对话框数据
const editDialogVisible = ref(false)
const addDialogVisible = ref(false)
const currentProcessDetail = ref<ProcessDetail | null>(null)
interface EditFormType {
  name: string
  description: string
  price: number
  responser: number[] // 使用员工ID数组
}
const editForm = ref<EditFormType>({
  name: '',
  description: '',
  price: 0,
  responser: []
})
const addForm = ref<EditFormType>({
  name: '',
  description: '',
  price: 0,
  responser: []
})

// 处理新增产品
const handleAddProduct = () => {
  ElMessage.info('新增产品功能开发中...')
}

// 处理编辑产品
const handleEditProduct = async (row: Product) => {
  try {
    await ProductApi.updateProduct(row.productId, {
      productId: row.productId,
      productName: row.productName,
      productCode: row.productCode,
      productStatus: row.productStatus,
      customerName: row.customerName
    })
    ElMessage.success('产品信息已更新')
  } catch (error) {
    ElMessage.error('更新产品信息失败')
  }
}

// 处理删除产品
const handleDeleteProduct = async (row: Product) => {
  try {
    await ProductApi.deleteProduct(row.productId)
    ElMessage.success('产品已删除')
    // 删除成功后刷新列表
    getProducts()
  } catch (error) {
    ElMessage.error('删除产品失败')
  }
}

// 处理新增工序
const handleAddProcess = (row: ProductWithProcess) => {
  // 重置表单
  addForm.value = {
    name: '',
    description: '',
    price: 0,
    responser: []
  }
  // 保存当前产品ID到 ref 中以供保存时使用
  currentProcessDetail.value = {
    processId: 0,
    productId: row.productId,
    processName: '',
    processDescription: '',
    processPrice: 0,
    employees: [],
    createTime: new Date().toISOString()
  }
  addDialogVisible.value = true
}

// 处理保存新增
const handleSaveAdd = async () => {
  if (!currentProcessDetail.value) return
  
  try {
    // 将选中的员工ID转换为完整的员工对象
    const selectedEmployees = employeeOptions.value.filter(emp => 
      addForm.value.responser.includes(emp.employeeId)
    )
    
    // 创建新工序
    await ProcessDetailApi.createProcessDetail({
      productId: currentProcessDetail.value.productId,
      processName: addForm.value.name,
      processDescription: addForm.value.description,
      processPrice: addForm.value.price,
      employees: selectedEmployees
    })
    
    ElMessage.success('工序已添加')
    addDialogVisible.value = false
    
    // 找到所属产品并刷新其工序列表
    const product = productList.value.find(p => 
      p.productId === currentProcessDetail.value?.productId
    )
    
    if (product) {
      // 标记为加载中
      product.processLoading = true
      try {
        const res = await ProcessDetailApi.getProcessDetailsByProductId({
          productId: product.productId,
          page: 1,
          pageSize: 100,
        })
        product.processDetails = res.data.data.items
      } finally {
        product.processLoading = false
      }
    }
  } catch (error) {
    ElMessage.error('添加工序失败')
  }
}

// 处理编辑工序
const handleEditProcess = (process: ProcessDetail) => {
  currentProcessDetail.value = process
  editForm.value = {
    name: process.processName,
    description: process.processDescription,
    price: process.processPrice,
    responser: process.employees.map(emp => emp.employeeId)
  }
  editDialogVisible.value = true
}

// 处理保存编辑
const handleSaveEdit = async () => {
  if (!currentProcessDetail.value) return
  
  try {
    // 将选中的员工ID转换为完整的员工对象
    const selectedEmployees = employeeOptions.value.filter(emp => 
      editForm.value.responser.includes(emp.employeeId)
    )
    
    // 更新工序数据
    await ProcessDetailApi.updateProcessDetail(currentProcessDetail.value.processId, {
      processId: currentProcessDetail.value.processId,
      processName: editForm.value.name,
      processDescription: editForm.value.description,
      processPrice: editForm.value.price,
      employees: selectedEmployees
    })
    ElMessage.success('工序信息已更新')
    editDialogVisible.value = false
    
    // 找到所属产品并刷新其工序列表
    const product = productList.value.find(p => 
      p.processDetails?.some(pd => pd.processId === currentProcessDetail.value?.processId)
    )
    
    if (product) {
      // 标记为加载中
      product.processLoading = true
      try {
        const res = await ProcessDetailApi.getProcessDetailsByProductId({
          productId: product.productId,
          page: 1,
          pageSize: 100,
        })
        product.processDetails = res.data.data.items
      } finally {
        product.processLoading = false
      }
    }
  } catch (error) {
    ElMessage.error('更新工序信息失败')
  }
}

// 处理删除工序
const handleDeleteProcess = (process: ProcessDetail) => {
  ElMessageBox.confirm(
    `确定要删除工序"${process.processName}"吗？`,
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    await ProcessDetailApi.deleteProcessDetail(process.processId)
    ElMessage.success('工序已删除')
    
    // 找到所属产品并刷新其工序列表
    const product = productList.value.find(p => 
      p.processDetails?.some(pd => pd.processId === process.processId)
    )
    
    if (product) {
      // 标记为加载中
      product.processLoading = true
      try {
        const res = await ProcessDetailApi.getProcessDetailsByProductId({
          productId: product.productId,
          page: 1,
          pageSize: 100,
        })
        product.processDetails = res.data.data.items
      } finally {
        product.processLoading = false
      }
    }
  }).catch(() => {
    // 取消删除
    ElMessage.info('取消删除')
  })
}

// 处理页码变化
const handleCurrentChange = (page: number) => {
  currentPage.value = page
  getProducts()
}

// 处理每页条数变化
const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1 // 重置到第一页
  getProducts()
}

// 组件挂载时获取产品列表和员工列表
onMounted(() => {
  getProducts()
  getEmployees()
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
  