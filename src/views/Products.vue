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

      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template #default="props">
            <div class="process-detail">
              <div class="process-header">
                <div class="process-title">
                  <el-icon><List /></el-icon>
                  <span>工序明细</span>
                </div>
              </div>
              <el-table 
                :data="props.row.processes" 
                border
                class="process-table"
                :header-cell-style="{
                  background: '#f5f7fa',
                  color: '#606266',
                  fontWeight: 'bold'
                }"
              >
                <el-table-column label="工序ID" prop="id" width="100" />
                <el-table-column label="工序名称" prop="name" width="150" />
                <el-table-column label="工序描述" prop="description" min-width="200" />
                <el-table-column label="工序负责人" prop="responser" min-width="200">
                  <template #default="scope">
                    <div class="responser-display">
                      <el-tag
                        v-for="(value, index) in scope.row.responser"
                        :key="value"
                        size="small"
                        class="responser-tag"
                      >
                        {{ value }}
                      </el-tag>
                      <span v-if="!scope.row.responser.length" class="empty-text">暂无负责人</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="工序参考单价" prop="price" width="120">
                  <template #default="scope">
                    <span class="price">¥{{ scope.row.price.toFixed(2) }}</span>
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
          </template>
        </el-table-column>
        <el-table-column label="产品名称" prop="name" min-width="150" />
        <el-table-column label="产品编号" prop="code" width="120" />
        <el-table-column label="客户公司" prop="customer" min-width="200" />
        <el-table-column label="产品状态" prop="status" min-width="200" />
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
              v-for="item in responsers"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Edit, Delete, List } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

interface Process {
  id: string
  name: string
  description: string
  price: number
  responser: string[]
}

interface Product {
  id: string
  name: string
  code: string
  customer: string
  createTime: string
  processes: Process[]
}

// 负责人列表数据
const responsers = [
  { value: '张三', label: '张三' },
  { value: '李四', label: '李四' },
  { value: '王五', label: '王五' },
  { value: '赵六', label: '赵六' }
]

const tableData = ref<Product[]>([
  {
    id: 'P001',
    name: '高端定制西装',
    code: 'SUIT-001',
    customer: '非凡服饰有限公司',
    createTime: '2024-03-15 10:00:00',
    processes: [
      {
        id: 'PR001',
        name: '面料裁剪',
        description: '根据设计图纸进行面料裁剪，确保尺寸精确',
        price: 150.00,
        responser: []
      },
      {
        id: 'PR002',
        name: '面料预缩',
        description: '对面料进行预缩处理，防止后期变形',
        price: 80.00,
        responser: []
      },
      {
        id: 'PR003',
        name: '缝制',
        description: '专业缝制工艺，确保缝线均匀美观',
        price: 300.00,
        responser: []
      },
      {
        id: 'PR004',
        name: '内衬制作',
        description: '制作西装内衬，提升穿着舒适度',
        price: 200.00,
        responser: []
      },
      {
        id: 'PR005',
        name: '整烫',
        description: '专业整烫定型，确保版型挺括',
        price: 100.00,
        responser: []
      },
      {
        id: 'PR006',
        name: '纽扣安装',
        description: '安装定制纽扣，确保牢固美观',
        price: 120.00,
        responser: []
      },
      {
        id: 'PR007',
        name: '口袋制作',
        description: '制作内外部口袋，确保实用美观',
        price: 150.00,
        responser: []
      },
      {
        id: 'PR008',
        name: '袖口处理',
        description: '处理袖口细节，确保工艺精湛',
        price: 180.00,
        responser: []
      },
      {
        id: 'PR009',
        name: '领子制作',
        description: '制作西装领子，确保挺括有型',
        price: 250.00,
        responser: []
      },
      {
        id: 'PR010',
        name: '最终质检',
        description: '全面质量检查，确保产品完美',
        price: 100.00,
        responser: []
      }
    ]
  },
  {
    id: 'P002',
    name: '商务休闲裤',
    code: 'PANT-001',
    customer: '非凡服饰有限公司',
    createTime: '2024-03-14 14:30:00',
    processes: [
      {
        id: 'PR011',
        name: '面料裁剪',
        description: '根据设计图纸进行面料裁剪，确保尺寸精确',
        price: 80.00,
        responser: []
      },
      {
        id: 'PR012',
        name: '面料预缩',
        description: '对面料进行预缩处理，防止后期变形',
        price: 50.00,
        responser: []
      },
      {
        id: 'PR013',
        name: '缝制',
        description: '专业缝制工艺，确保缝线均匀美观',
        price: 150.00,
        responser: []
      },
      {
        id: 'PR014',
        name: '裤腰制作',
        description: '制作裤腰，确保穿着舒适',
        price: 100.00,
        responser: []
      },
      {
        id: 'PR015',
        name: '整烫',
        description: '专业整烫定型，确保版型挺括',
        price: 50.00,
        responser: []
      },
      {
        id: 'PR016',
        name: '拉链安装',
        description: '安装拉链，确保顺滑耐用',
        price: 60.00,
        responser: []
      },
      {
        id: 'PR017',
        name: '口袋制作',
        description: '制作前后口袋，确保实用美观',
        price: 80.00,
        responser: []
      },
      {
        id: 'PR018',
        name: '裤脚处理',
        description: '处理裤脚细节，确保工艺精湛',
        price: 70.00,
        responser: []
      },
      {
        id: 'PR019',
        name: '扣眼制作',
        description: '制作扣眼，确保美观实用',
        price: 40.00,
        responser: []
      },
      {
        id: 'PR020',
        name: '最终质检',
        description: '全面质量检查，确保产品完美',
        price: 50.00,
        responser: []
      }
    ]
  }
])

// 添加编辑对话框数据
const editDialogVisible = ref(false)
const currentProcess = ref<Process | null>(null)
const editForm = ref({
  name: '',
  description: '',
  price: 0,
  responser: [] as string[]
})

// 处理新增产品
const handleAddProduct = () => {
  ElMessage.info('新增产品功能开发中...')
}

// 处理编辑产品
const handleEditProduct = (row: Product) => {
  ElMessage.info(`编辑产品：${row.name}`)
}

// 处理删除产品
const handleDeleteProduct = (row: Product) => {
  ElMessage.info(`删除产品：${row.name}`)
}

// 处理新增工序
const handleAddProcess = (row: Product) => {
  ElMessage.info(`为产品 ${row.name} 添加工序`)
}

// 处理编辑工序
const handleEditProcess = (process: Process) => {
  currentProcess.value = process
  editForm.value = {
    name: process.name,
    description: process.description,
    price: process.price,
    responser: [...process.responser]
  }
  editDialogVisible.value = true
}

// 处理保存编辑
const handleSaveEdit = () => {
  if (!currentProcess.value) return
  
  // 更新工序数据
  currentProcess.value.name = editForm.value.name
  currentProcess.value.description = editForm.value.description
  currentProcess.value.price = editForm.value.price
  currentProcess.value.responser = [...editForm.value.responser]
  
  ElMessage.success('工序信息已更新')
  editDialogVisible.value = false
}

// 处理删除工序
const handleDeleteProcess = (process: Process) => {
  ElMessageBox.confirm(
    `确定要删除工序"${process.name}"吗？`,
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 找到当前工序所属的产品
    const product = tableData.value.find(p => 
      p.processes.some(proc => proc.id === process.id)
    )
    if (product) {
      // 从产品中移除该工序
      product.processes = product.processes.filter(p => p.id !== process.id)
      ElMessage.success('工序已删除')
    }
  }).catch(() => {
    // 取消删除
  })
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.process-detail {
  padding: 20px;
  background-color: #e6e8eb;
  border-radius: 4px;
  margin: 10px;
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

:deep(.el-table) {
  --el-table-border-color: #edf2f7;
  --el-table-header-bg-color: #f8fafc;
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
</style>
  