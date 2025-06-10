<template>
  <div class="process-container">
    <!-- 顶部搜索区 -->
    <el-card class="search-card">
      <div class="search-content">
        <div class="search-item">
          <h3 class="card-header">录入对象</h3>
          <el-divider direction="vertical" />
          <template v-if="divisionType === 'employee'">
            <el-select
              v-model="currentTopId"
              placeholder="请选择员工"
              class="search-input"
              clearable
              @change="handleTopSelected"
            >
              <el-option
                v-for="item in employeeStore.employeeList"
                :key="item.employeeId"
                :label="item.employeeName"
                :value="item.employeeId"
              >
                <span>{{ item.employeeName }}</span>
                <span class="option-code">工号：{{ item.employeeId }}</span>
              </el-option>
            </el-select>
          </template>
          <template v-else>
            <el-select
              v-model="currentTopId"
              placeholder="请选择产品"
              class="search-input"
              clearable
              @change="handleTopSelected"
            >
              <el-option
                v-for="item in productStore.productList"
                :key="item.productId"
                :label="item.productName"
                :value="item.productId"
              >
                <span>{{ item.productName }}</span>
                <span class="option-code">编号：{{ item.productCode }}</span>
              </el-option>
            </el-select>
          </template>
        </div>
        <div class="division-type">
          <el-radio-group v-model="divisionType" @change="handleDivisionTypeChange">
            <el-radio-button label="employee">按负责人记录</el-radio-button>
            <el-radio-button label="product">按产品记录</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </el-card>

    <!-- 分工区 -->
    <div class="division-container">
      <!-- 按员工分工时的布局 -->
      <template v-if="divisionType === 'employee'">
        <!-- 左侧产品列表 -->
        <el-card class="product-card">
          <template #header>
            <div class="card-header">
              <h3>负责产品</h3>
            </div>
          </template>
          <el-table :data="currentProductList" 
            style="width: 100%; height: 100%" 
            highlight-current-row
            @current-change="handleLeftSelected"
            v-if="currentProductList.length > 0">
            <el-table-column prop="productName" label="产品名称" />
            <el-table-column prop="productCode" label="产品编号" width="120" />
            <el-table-column prop="productStatus" label="状态" width="100">
              <template #default="{ row }"> 
                <ProgressStatusTag :status="row.productStatus" />
              </template>
            </el-table-column>
          </el-table>
          <el-empty v-else description="请先选择负责人" />
        </el-card>

        <!-- 右侧工序分工 -->
        <el-card class="process-card">
        <template #header>
        <div class="card-header">
              <h3>工序记录</h3>
        </div>
          </template>
          <el-table :data="currentAllocationList" style="width: 100%; height: 100%" v-if="currentAllocationList.length > 0">
            <el-table-column prop="processName" label="工序名称" />
            <el-table-column prop="referencePrice" label="参考单价" width="180"/>
            <el-table-column prop="actualPrice" label="实际单价" width="180">
              <template #default="{ row }">
                <ProcessPriceInput v-model:price="row.actualPrice" />
              </template>
            </el-table-column>
            <el-table-column label="个人产值" width="100">

            </el-table-column>
          </el-table>
          <el-empty v-else description="请先选择产品" />
        </el-card>
      </template>

      <!-- 按产品分工时的布局 -->
      <template v-else>
        <!-- 左侧员工列表 -->
        <el-card class="employee-card">
          <template #header>
            <div class="card-header">
              <h3>负责人列表</h3>
            </div>
                </template>
          <el-table :data="currentEmployeeList" 
            style="width: 100%" 
            highlight-current-row
            @row-click="handleLeftSelected"
            v-if="currentEmployeeList.length > 0">
            <el-table-column prop="employeeName" label="员工姓名" />
            <el-table-column prop="employeeId" label="员工工号" width="120" />
            <el-table-column prop="employeeStatus" label="状态" width="100">
              <template #default="{ row }"> 
                <ProgressStatusTag :status="row.employeeStatus" />
                </template>
            </el-table-column>
          </el-table>
          <el-empty v-else description="请先选择产品" />
        </el-card>

        <!-- 右侧工序分工 -->
        <el-card class="process-card">
          <template #header>
            <div class="card-header">
              <h3>工序记录</h3>
            </div>
          </template>
          <el-table :data="currentAllocationList" 
            style="width: 100%" 
            v-if="currentAllocationList.length > 0">
            <el-table-column prop="processName" label="工序名称" />
            <el-table-column prop="processDescription" label="工序描述" />
            <el-table-column prop="referencePrice" label="参考单价" width="180"/>
            <el-table-column prop="actualPrice" label="实际单价" width="180">
              <template #default="{ row }">
                <ProcessPriceInput v-model:price="row.actualPrice" />
                </template>
            </el-table-column>
          </el-table>
          <el-empty v-else description="请先选择负责人" />
    </el-card>
      </template>
    </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ProgressStatusTag from '@/components/common/ProgressStatusTag.vue'
import ProcessPriceInput from '@/components/Process/ProcessPriceInput.vue'
import type { Product } from '@/types/business/product'
import type { Allocation } from '@/types/business/process'
import { useProductStore } from '@/stores/business/productStore'
import { useEmployeeStore } from '@/stores/business/employeeStore'
import type { EmployeeDetail } from '@/types/business/employee'
import { useProcessStore } from '@/stores/business/processStore'
import { ElMessage } from 'element-plus'
const productStore = useProductStore()
const employeeStore = useEmployeeStore()
const processStore = useProcessStore()

// 分工方式
const divisionType = ref('employee')

const currentTopId = ref<number | null>(null)
const currentLeftId = ref<number | null>(null)
// employee对应数据源
const currentProductList = ref<Product[]>([])

// product对应数据源
const currentEmployeeList = ref<EmployeeDetail[]>([])

// process工序分配对应数据源
const currentAllocationList = ref<Allocation[]>([])

// process工序记录对应数据源


// 重置界面
const resetInterface = () => {
  currentTopId.value = null
  currentLeftId.value = null
  currentProductList.value = []
  currentEmployeeList.value = []
  currentAllocationList.value = []
}

// 分工方式切换处理
const handleDivisionTypeChange = () => {
  resetInterface()
}

// 顶部选择处理
const handleTopSelected = async (topId: number) => {
  if (divisionType.value === 'employee') {
    // 根据员工选择的产品列表
    currentProductList.value = (await employeeStore.getProductsByEmployeeId(topId)).data.items
    console.log("currentProductList", currentProductList.value)
  } else {
    // 根据产品选择的产品列表
    currentEmployeeList.value = (await productStore.getEmployeesByProductId(topId)).data.items
    console.log("currentEmployeeList", currentEmployeeList.value)
  }
  // 清空右侧工序列表
  currentAllocationList.value = []
}

// 左侧选择处理
const handleLeftSelected = async (row: any) => {
  if (currentTopId.value === null) {
    ElMessage.warning('请先选择负责人或产品')
    return
  }
  if (divisionType.value === 'employee') {
    var selectedProduct = row as Product
    currentLeftId.value = selectedProduct.productId
    // api获取当前产品工序列表
    currentAllocationList.value = (await processStore.getProcessAllocationByEmployeeIdAndProductId({
      employeeId: currentTopId.value,
      productId: selectedProduct.productId
    }))
    console.log("currentAllocationList", currentAllocationList.value)
  }
  else {
    // 根据产品选择的产品列表
    var selectedEmployee = row as EmployeeDetail
    currentLeftId.value = selectedEmployee.employeeId
    // api获取当前产品工序列表
    currentAllocationList.value = (await processStore.getProcessAllocationByEmployeeIdAndProductId({
      employeeId: selectedEmployee.employeeId,
      productId: currentTopId.value
    }))
    console.log("currentAllocationList", currentAllocationList.value)
  }
}
</script>

<style scoped>
.process-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 20px;
}

.search-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-input {
  width: 240px;
}

.division-type {
  display: flex;
  align-items: center;
  gap: 12px;
}

.division-container {
  display: flex;
  gap: 20px;
  height: calc(100vh - 200px);
}

.product-card,
.process-card,
.employee-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

:deep(.el-card__body) {
  flex: 1;
  overflow: auto;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #c0c4cc inset;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #409eff inset;
}

:deep(.el-input__icon) {
  cursor: pointer;
  color: #909399;
}

:deep(.el-input__icon:hover) {
  color: #409eff;
}

.my-autocomplete {
  li {
  line-height: normal;
  padding: 7px;

    .value {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .link {
      font-size: 12px;
      color: #b4b4b4;
    }
  }
}

:deep(.price-input .el-input__wrapper) {
  padding-left: 8px;
}

:deep(.price-input .el-input__prefix) {
  left: 8px;
  color: #909399;
}

.option-code {
  float: right;
  color: #999;
  font-size: 13px;
}

:deep(.el-select-dropdown__item) {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
