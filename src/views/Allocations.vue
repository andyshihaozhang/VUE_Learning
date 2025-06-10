<template>
    <div class="allocation-container">
      <!-- 顶部搜索区 -->
      <el-card class="product-card">
        <h3>产品</h3>
        <el-divider direction="vertical" />
        <el-select
        v-model="selectedProductId"
        placeholder="请选择产品"
        class="search-input"
        clearable
        @change="getProductAllocations">
            <el-option
                v-for="item in productStore.productList"
                :key="item.productId"
                :label="item.productName"
                :value="item.productId">
                <span>{{ item.productName }}</span>
                <span class="option-code">编号：{{ item.productCode }}</span>
            </el-option>
        </el-select>
      </el-card>
      <el-card class="process-card">
        <template #header>
            <h3>工序明细</h3>
            <el-button type="primary" @click="handleAddProcess(selectedProductId)">
            <el-icon><Plus /></el-icon>
            新增工序
          </el-button>
        </template>

        <el-table 
          :data="processAllocations || []" 
          class="process-table"
          v-loading="loadingData">
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

        <!-- 新增工序对话框 -->
        <ProcessDetailForm
          ref="addProcessFormRef"
          :is-edit="false"
          @formOver="handleSaveAddProcess"
        />
        
        <!-- 编辑工序对话框 -->
        <ProcessDetailForm
          ref="editProcessFormRef"
          :is-edit="true"
          @formOver="handleSaveEditProcess"
        />
      </el-card>
    </div>
</template>


<script setup lang="ts"> 
import { ref, onMounted } from 'vue';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { ProcessAllocation } from '@/types/business/process'
import type { EmployeeDetail } from '@/types/business/employee'
import { useProductStore } from '@/stores/business/productStore';
import { useEmployeeStore } from '@/stores/business/employeeStore';
import { useProcessStore } from '@/stores/business/processStore';
import ProcessDetailForm from '@/components/product/ProcessDetailForm.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const productStore = useProductStore();
const employeeStore = useEmployeeStore();
const processStore = useProcessStore();

const selectedProductId = ref(0);
const processAllocations = ref<ProcessAllocation[]>([]);
const addProcessFormRef = ref<InstanceType<typeof ProcessDetailForm>>();
const editProcessFormRef = ref<InstanceType<typeof ProcessDetailForm>>();

const loadingData = ref(false);

const getEmployeeName = (employeeId: number) => {
  // 获取员工名称
  const employee = employeeStore.employeeList.find((emp: EmployeeDetail) => emp.employeeId === employeeId)
  return employee ? `${employee.employeeName}` : `未知员工(${employeeId})`
}

const getProductAllocations = async () => {
  try {
    loadingData.value = true
    const res = await processStore.getProcessAllocationByProductId(selectedProductId.value)          
    processAllocations.value = res || []
  } catch (error) {
    console.error(`加载产品 ${selectedProductId.value} 的工序明细失败:`, error)
    processAllocations.value = []
  } finally {
    loadingData.value = false
  }
}

// 打开新增工序表单
const handleAddProcess = (productId: number) => {
  addProcessFormRef.value?.initForm(productId)
  addProcessFormRef.value?.openForm()
}

// 处理编辑工序
const handleEditProcess = (row: ProcessAllocation) => {
  editProcessFormRef.value?.initForm(row.productId, row)
  editProcessFormRef.value?.openForm()
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
  }).catch(() => {
    // 取消删除
    ElMessage.info('取消删除')
  })
}

// 处理保存新增工序
const handleSaveAddProcess = async () => {  
  try {
    console.log("handleSaveAddProcess")
    addProcessFormRef.value?.closeForm()
    getProductAllocations()
  } catch (error) {
    ElMessage.error('添加工序失败')
  }
}

// 处理保存编辑工序
const handleSaveEditProcess = async () => {  
  try {
    ElMessage.success('工序信息已更新')
    editProcessFormRef.value?.closeForm()
    getProductAllocations()
  } catch (error) {
    ElMessage.error('更新工序信息失败' + error)
  }
}

onMounted(() => {
  const productIdFromRoute = route.query.productId;
  if (productIdFromRoute && !Array.isArray(productIdFromRoute)) {
    selectedProductId.value = parseInt(productIdFromRoute, 10);
    getProductAllocations()
  }
})
</script>

<style scoped>

.allocation-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  width: 100%;
}

.product-card :deep(.el-card__body) {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.search-input {
  width: 240px;
}

.option-code {
  float: right;
  color: #999;
  font-size: 13px;
}

.process-card{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.process-card :deep(.el-card__header) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.process-card :deep(.el-card__body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
}

.process-table{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

:deep(.el-button--primary) {
  --el-button-bg-color: #1a1f36;
  --el-button-border-color: #1a1f36;
  --el-button-hover-bg-color: #2d3748;
  --el-button-hover-border-color: #2d3748;
}

:deep(.el-button .el-icon) {
  margin-right: 4px;
  vertical-align: middle;
}
</style>
