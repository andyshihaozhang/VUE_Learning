<template>
  <div class="process-container">
    <!-- 顶部搜索区 -->
    <el-card class="search-card">
      <div class="search-header">
        <h2 class="page-title">录入对象</h2>
        <div class="search-content">
          <div class="search-item">
            <template v-if="divisionType === 'employee'">
              <span class="search-label">员工名：</span>
              <el-select
                v-model="currentTopEmployeeValue"
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
              <span class="search-label">产品名：</span>
              <el-select
                v-model="currentTopProductValue"
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
            style="width: 100%" 
            highlight-current-row
            @current-change="handleLeftSelected"
            v-if="currentProductList.length > 0">
            <el-table-column prop="name" label="产品名称" />
            <el-table-column prop="code" label="产品编号" width="120" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }"> 
                <ProcessStatusTag :status="row.status" />
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
          <el-table :data="currentProcessList" style="width: 100%" v-if="currentProcessList.length > 0">
            <el-table-column prop="name" label="工序名称" />
            <el-table-column prop="price" label="工序单价" width="180">
              <template #default="{ row }">
                <ProcessPriceInput v-model:price="row.price" />
              </template>
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
            <el-table-column prop="name" label="员工姓名" />
            <el-table-column prop="code" label="员工工号" width="120" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }"> 
                <ProcessStatusTag :status="row.status" />
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
          <el-table :data="currentProcessList" 
            style="width: 100%" 
            v-if="currentProcessList.length > 0">
            <el-table-column prop="name" label="工序名称" />
            <el-table-column prop="price" label="工序单价" width="180">
              <template #default="{ row }">
                <ProcessPriceInput v-model:price="row.price" />
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
import { ref, computed } from 'vue'
import ProcessStatusTag from '@/components/Process/ProcessStatusTag.vue'
import ProcessPriceInput from '@/components/Process/ProcessPriceInput.vue'
import type { Product } from '@/types/business/product'
import type { Process } from '@/types/business/process'
import { useProductStore } from '@/stores/productStore'
import { useEmployeeStore } from '@/stores/employeeStore'
import type { EmployeeDetail } from '@/types/business/employee'


const productStore = useProductStore()
const employeeStore = useEmployeeStore()

// 分工方式
const divisionType = ref('employee')

// 计算属性处理选择值
const currentTopEmployeeValue = computed({
  get: () => currentTopEmployeeSelected.value?.employeeId || '',
  set: (val) => {
    const employee = employeeStore.employeeList.find(e => e.employeeId === val)
    currentTopEmployeeSelected.value = employee || null
  }
})

const currentTopProductValue = computed({
  get: () => currentTopProductSelected.value?.productId || '',
  set: (val) => {
    const product = productStore.productList.find(p => p.productId === val)
    currentTopProductSelected.value = product || null
  }
})

// employee对应数据源
const currentTopEmployeeSelected = ref<EmployeeDetail | null>(null)
const currentLeftProductSelected = ref<Product | null>(null)
const currentProductList = ref<Product[]>([])

// product对应数据源
const currentTopProductSelected = ref<Product | null>(null)
const currentLeftEmployeeSelected = ref<EmployeeDetail | null>(null)
const currentEmployeeList = ref<EmployeeDetail[]>([])

const currentProcessList = ref<Process[]>([])

// 重置界面
const resetInterface = () => {
  currentTopProductSelected.value = null
  currentTopEmployeeSelected.value = null
  currentLeftProductSelected.value = null
  currentLeftEmployeeSelected.value = null
  currentProductList.value = []
  currentProcessList.value = []
}

// 分工方式切换处理
const handleDivisionTypeChange = () => {
  resetInterface()
}

// 顶部选择处理
const handleTopSelected = async (selection: Product | EmployeeDetail) => {
  console.log('顶部选择:', selection)
  if (divisionType.value === 'employee') {
    currentTopEmployeeSelected.value = selection as EmployeeDetail
    // 根据员工选择的产品列表
    currentProductList.value = (await employeeStore.getProductsByEmployeeId(currentTopEmployeeSelected.value.employeeId)).data.items
  } else {
    // 根据产品选择的产品列表
    currentTopProductSelected.value = selection as Product
    currentEmployeeList.value = (await productStore.getEmployeesByProductId(currentTopProductSelected.value.productId)).data.items
  }
  // 清空右侧工序列表
  currentProcessList.value = []
}

// 左侧选择处理
const handleLeftSelected = async (row: any) => {
  if (!row) return
  console.log('左侧选择:', row)
  if (divisionType.value === 'employee') {
    // 根据员工选择的产品列表
    currentLeftProductSelected.value = row as Product
      // api获取当前产品工序列表
      currentProcessList.value = (await productStore.getProcessesByProductId(currentLeftProductSelected.value.productId)).data.items
    }
  else {
    // 根据产品选择的产品列表
    currentLeftEmployeeSelected.value = row as EmployeeDetail
    // api获取当前产品工序列表
    currentProcessList.value = (await employeeStore.getProcessesByEmployeeId(currentLeftEmployeeSelected.value.employeeId)).data.items
  }
}
</script>

<style scoped>
.process-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-card {
  margin-bottom: 20px;
}

.search-header {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-title {
  margin: 0;
  font-size: 20px;
  color: #303133;
  font-weight: 500;
}

.search-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-label {
  white-space: nowrap;
  min-width: 60px;
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

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
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
