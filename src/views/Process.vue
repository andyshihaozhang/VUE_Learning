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
                v-model="currentTopSelected"
                placeholder="请选择员工"
                class="search-input"
                clearable
                @change="handleTopSelected"
              >
                <el-option
                  v-for="item in employeeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.name"
                >
                  <span>{{ item.name }}</span>
                  <span class="option-code">工号：{{ item.code }}</span>
                </el-option>
              </el-select>
            </template>
            <template v-else>
              <span class="search-label">产品名：</span>
              <el-select
                v-model="currentTopSelected"
                placeholder="请选择产品"
                class="search-input"
                clearable
                @change="handleTopSelected"
              >
                <el-option
                  v-for="item in qryResultList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.name"
                >
                  <span>{{ item.name }}</span>
                  <span class="option-code">编号：{{ item.code }}</span>
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
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }"> 
                <ProcessStatusTag :status="row.status" />
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
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <ProcessStatusTag :status="row.status" />
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
import ProcessStatusTag from '@/components/Process/ProcessStatusTag.vue'
import ProcessPriceInput from '@/components/Process/ProcessPriceInput.vue'
// 分工方式
const divisionType = ref('employee')
const currentTopSelected = ref('')
const currentLeftSelected = ref('')

// 当前产品
interface Product {
  name: string
  code: string
  status: string
  processes: Process[]
}

interface Process {
  name: string
  price: number
  status: string
  employee: string
}

interface Employee {
  name: string
  code: string
  status: string
}

const currentProductList = ref<Product[]>([])
const currentEmployeeList = ref<Employee[]>([])
const currentProcessList = ref<Process[]>([])

// 员工列表数据
const employeeList = ref([
  { name: '张三', code: '001', status: '在岗' },
  { name: '李四', code: '002', status: '在岗' },
  { name: '王五', code: '003', status: '休假' },
  { name: '赵六', code: '004', status: '在岗' },
  { name: '钱七', code: '005', status: '在岗' },
  { name: '孙八', code: '006', status: '休假' },
  { name: '周九', code: '007', status: '在岗' },
  { name: '吴十', code: '008', status: '在岗' },
  { name: '郑十一', code: '009', status: '在岗' },
  { name: '王十二', code: '010', status: '休假' }
])

// 产品及工序列表数据
const qryResultList = ref([
  { 
    name: '高端定制西装', 
    code: 'SUIT-001', 
    status: '进行中', 
    processes: [
      { name: '面料裁剪', price: 150.00, status: '已完成', employee: '张三' },
      { name: '缝制', price: 200.00, status: '进行中', employee: '李四' },
      { name: '熨烫', price: 100.00, status: '待开始', employee: '王五' },
      { name: '纽扣安装', price: 80.00, status: '已完成', employee: '赵六' },
      { name: '口袋制作', price: 120.00, status: '进行中', employee: '钱七' }
    ]
  },
  { 
    name: '商务休闲裤', 
    code: 'PANT-001', 
    status: '待开始', 
    processes: [
      { name: '面料裁剪', price: 120.00, status: '待开始', employee: '张三' },
      { name: '缝制', price: 180.00, status: '待开始', employee: '李四' },
      { name: '熨烫', price: 80.00, status: '待开始', employee: '王五' },
      { name: '纽扣安装', price: 60.00, status: '待开始', employee: '赵六' },
      { name: '口袋制作', price: 100.00, status: '待开始', employee: '钱七' }
    ]
  },
  { 
    name: '真丝衬衫', 
    code: 'SHIRT-001', 
    status: '进行中', 
    processes: [
      { name: '面料裁剪', price: 130.00, status: '已完成', employee: '王五' },
      { name: '缝制', price: 190.00, status: '进行中', employee: '李四' },
      { name: '熨烫', price: 90.00, status: '待开始', employee: '张三' },
      { name: '纽扣安装', price: 70.00, status: '待开始', employee: '赵六' },
      { name: '领子制作', price: 140.00, status: '进行中', employee: '钱七' }
    ]
  },
  { 
    name: '羊毛大衣', 
    code: 'COAT-001', 
    status: '进行中', 
    processes: [
      { name: '面料裁剪', price: 180.00, status: '已完成', employee: '张三' },
      { name: '缝制', price: 250.00, status: '进行中', employee: '李四' },
      { name: '熨烫', price: 120.00, status: '待开始', employee: '王五' },
      { name: '纽扣安装', price: 90.00, status: '已完成', employee: '赵六' },
      { name: '口袋制作', price: 150.00, status: '进行中', employee: '钱七' }
    ]
  },
  { 
    name: '羊绒围巾', 
    code: 'SCARF-001', 
    status: '待开始', 
    processes: [
      { name: '面料裁剪', price: 80.00, status: '待开始', employee: '李四' },
      { name: '缝制', price: 120.00, status: '待开始', employee: '张三' },
      { name: '熨烫', price: 60.00, status: '待开始', employee: '王五' },
      { name: '流苏制作', price: 40.00, status: '待开始', employee: '张三' }
    ]
  },
  { 
    name: '真皮手套', 
    code: 'GLOVE-001', 
    status: '进行中', 
    processes: [
      { name: '皮革裁剪', price: 100.00, status: '已完成', employee: '王五' },
      { name: '缝制', price: 150.00, status: '进行中', employee: '李四' },
      { name: '内衬制作', price: 80.00, status: '待开始', employee: '张三' },
      { name: '装饰处理', price: 60.00, status: '已完成', employee: '赵六' }
    ]
  },
  { 
    name: '手工皮鞋', 
    code: 'SHOE-001', 
    status: '待开始', 
    processes: [
      { name: '皮革裁剪', price: 200.00, status: '待开始', employee: '赵六' },
      { name: '鞋底制作', price: 180.00, status: '待开始', employee: '张三' },
      { name: '缝制', price: 250.00, status: '待开始', employee: '李四' },
      { name: '鞋跟安装', price: 150.00, status: '待开始', employee: '王五' },
      { name: '鞋面装饰', price: 120.00, status: '待开始', employee: '张三' }
    ]
  },
  { 
    name: '定制领带', 
    code: 'TIE-001', 
    status: '进行中', 
    processes: [
      { name: '面料裁剪', price: 60.00, status: '已完成', employee: '钱七' },
      { name: '缝制', price: 80.00, status: '进行中', employee: '李四' },
      { name: '熨烫', price: 40.00, status: '待开始', employee: '张三' },
      { name: '装饰处理', price: 50.00, status: '已完成', employee: '赵六' }
    ]
  },
  { 
    name: '手工皮包', 
    code: 'BAG-001', 
    status: '待开始', 
    processes: [
      { name: '皮革裁剪', price: 150.00, status: '待开始', employee: '孙八' },
      { name: '缝制', price: 200.00, status: '待开始', employee: '李四' },
      { name: '内衬制作', price: 100.00, status: '待开始', employee: '张三' },
      { name: '五金安装', price: 80.00, status: '待开始', employee: '王五' },
      { name: '装饰处理', price: 120.00, status: '待开始', employee: '赵六' }
    ]
  },
  { 
    name: '真丝睡衣', 
    code: 'PYJAMA-001', 
    status: '进行中', 
    processes: [
      { name: '面料裁剪', price: 90.00, status: '已完成', employee: '周九' },
      { name: '缝制', price: 160.00, status: '进行中', employee: '李四' },
      { name: '熨烫', price: 70.00, status: '待开始', employee: '张三' },
      { name: '纽扣安装', price: 50.00, status: '已完成', employee: '赵六' },
      { name: '装饰处理', price: 80.00, status: '进行中', employee: '钱七' }
    ]
  },
  { 
    name: '羊毛背心', 
    code: 'VEST-001', 
    status: '待开始', 
    processes: [
      { name: '面料裁剪', price: 110.00, status: '待开始', employee: '吴十' },
      { name: '缝制', price: 180.00, status: '待开始', employee: '李四' },
      { name: '熨烫', price: 90.00, status: '待开始', employee: '张三' },
      { name: '纽扣安装', price: 60.00, status: '待开始', employee: '赵六' },
      { name: '口袋制作', price: 100.00, status: '待开始', employee: '张三' }
    ]
  },
  { 
    name: '真丝连衣裙', 
    code: 'DRESS-001', 
    status: '进行中', 
    processes: [
      { name: '面料裁剪', price: 140.00, status: '已完成', employee: '郑十一' },
      { name: '缝制', price: 220.00, status: '进行中', employee: '李四' },
      { name: '熨烫', price: 100.00, status: '待开始', employee: '张三' },
      { name: '纽扣安装', price: 70.00, status: '已完成', employee: '赵六' },
      { name: '装饰处理', price: 90.00, status: '进行中', employee: '钱七' }
    ]
  },
  { 
    name: '手工皮夹', 
    code: 'WALLET-001', 
    status: '待开始', 
    processes: [
      { name: '皮革裁剪', price: 80.00, status: '待开始', employee: '王十二' },
      { name: '缝制', price: 120.00, status: '待开始', employee: '张三' },
      { name: '内衬制作', price: 60.00, status: '待开始', employee: '李四' },
      { name: '五金安装', price: 40.00, status: '待开始', employee: '王五' },
      { name: '装饰处理', price: 50.00, status: '待开始', employee: '赵六' }
    ]
  },
  { 
    name: '定制帽子', 
    code: 'HAT-001', 
    status: '进行中', 
    processes: [
      { name: '面料裁剪', price: 70.00, status: '已完成', employee: '周九' },
      { name: '缝制', price: 110.00, status: '进行中', employee: '李四' },
      { name: '熨烫', price: 50.00, status: '待开始', employee: '张三' },
      { name: '装饰处理', price: 60.00, status: '已完成', employee: '赵六' }
    ]
  },
  { 
    name: '真丝丝巾', 
    code: 'SCARF-002', 
    status: '待开始', 
    processes: [
      { name: '面料裁剪', price: 60.00, status: '待开始', employee: '吴十' },
      { name: '缝制', price: 90.00, status: '待开始', employee: '李四' },
      { name: '熨烫', price: 40.00, status: '待开始', employee: '张三' },
      { name: '流苏制作', price: 30.00, status: '待开始', employee: '王五' }
    ]
  }
])

// 重置界面
const resetInterface = () => {
  currentTopSelected.value = ''
  currentLeftSelected.value = ''
  currentProductList.value = []
  currentProcessList.value = []
}

// 分工方式切换处理
const handleDivisionTypeChange = () => {
  resetInterface()
}

// 顶部选择处理
const handleTopSelected = (selection: any) => {
  console.log('顶部选择:', selection)
  currentTopSelected.value = selection
  if (divisionType.value === 'employee') {
    // 根据员工选择的产品列表
    currentProductList.value = qryResultList.value.filter(result => 
      result.processes.some(process => process.employee === selection)
    )
  } else {
    // 根据产品选择的产品列表
    const selectedProduct = qryResultList.value.find(result => result.name === selection)
    if (selectedProduct) {
      // 获取该产品所有工序的负责人
      const employees = selectedProduct.processes.map(process => process.employee)
      // 从员工列表中获取完整的员工信息
      currentEmployeeList.value = employeeList.value
        .filter(employee => employees.includes(employee.name))
    }
  }
  // 清空右侧工序列表
  currentProcessList.value = []
}

// 左侧选择处理
const handleLeftSelected = (row: any) => {
  if (!row) return
  console.log('左侧选择:', row)
  currentLeftSelected.value = row.name
  if (divisionType.value === 'employee') {
    // 根据员工选择的产品列表
    const selectedProduct = qryResultList.value.find(result => result.name === row.name)
    if (selectedProduct) {
      // 只显示当前员工负责的工序
      currentProcessList.value = selectedProduct.processes.filter(
        process => process.employee === currentTopSelected.value
      )
    }
  } else {
    // 根据产品选择的产品列表
    const selectedProduct = qryResultList.value.find(result => result.name === currentTopSelected.value)
    if (selectedProduct) {
      // 只显示当前员工负责的工序
      currentProcessList.value = selectedProduct.processes.filter(
        process => process.employee === row.name
      )
    }
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
